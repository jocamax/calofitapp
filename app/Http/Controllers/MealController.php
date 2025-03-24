<?php

namespace App\Http\Controllers;

use App\Models\DailyInfo;
use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenAI\Laravel\Facades\OpenAI;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Meals/Index', [
            'meals' => Meal::where('user_id', auth()->id())->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Meals/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:4096',
        ]);

        //store image
        $image = $request->file('image');
        $path = $image->store('meals', 's3', 'public');

        $imageUrl = Storage::disk('s3')->url($path);

        //dd($path, $imageUrl);

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => <<<EOT
        You are a highly accurate nutrition assistant. You analyze meal images and return precise nutritional information in consistent JSON format.

        Instructions:

        - Provide a brief description of the meal. Maximum 254chars length
        -if the meal consists of individual items (e.g., "2 eggs and a sausage"), return them **exactly as they appear**
        - If the meal is a known dish (e.g., "goulash"), estimate the total grams and return it as `"400g goulash"`,
        -Based on your calculations of a portion, accurately determine the calories, protein, fat, and carbs in the meal.
        - Rate the meal's health score on a scale of 1 to 10 (1 = unhealthy, 10 = very healthy).
        - ALWAYS return the response **strictly in this JSON format**:
        - Be prepared to encounter serbian meals like Musaka, becarac etc.

        ```
        {
            "calories": (integer) Total estimated calories,
            "protein": (integer) Total protein in grams,
            "fat": (integer) Total fat in grams,
            "carbs": (integer) Total carbohydrates in grams,
            "description": (string) Detailed meal description (max 300 words)
            "ingredients": (string) List of ingredients OR total grams of a meal
            "health_score": (integer) Health score between 1 and 10
        }
        ```

        **Example Response:**
        ```
        {
            "calories": 520.5,
            "protein": 35,
            "fat": 18,
            "carbs": 55,
            "description": "Grilled salmon with quinoa and steamed broccoli.",
            "ingredients": 200g salmon, 100g quinoa, 100g broccoli,
            "health_score": 9
        }
        ```
        NEVER return anything outside this format.
        EOT],
                [
                    'role' => 'user',
                    'content' => [
                        ['type' => 'text', 'text' => 'Analyze this meal and provide its nutritional breakdown.'],
                        ['type' => 'image_url', 'image_url' => ['url' => $imageUrl]],
                    ],
                ],
            ],
            'response_format' => ['type' => 'json_object'],
        ])->choices[0]->message->content;

        $mealData = json_decode($response, true);

        if(!$mealData){
            return response()->json(['error' => 'failed to analyze the image']);
        }

        $meal = Meal::create([
            'user_id' => auth()->id(),
            'calories' => $mealData['calories'] ?? 0,
            'protein' => $mealData['protein'] ?? 0,
            'fat' => $mealData['fat'] ?? 0,
            'carbs' => $mealData['carbs'] ?? 0,
            'description' => $mealData['description'] ?? 'No description available',
            'ingredients' => $mealData['ingredients'] ?? 'Unknown ingredients',
            'health_score' => $mealData['health_score'] ?? 0,
            'image_path' => $imageUrl,
            'date' => now()->toDateString()

        ]);

        return to_route('meals.show', $meal->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return inertia('Meals/Show', ['meal' => $meal]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meal $meal)
    {
        return inertia('Meals/Edit', ['meal' => $meal]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meal $meal)
    {
        $request->validate([
            'calories' => 'required|integer|min:0',
            'protein' => 'required|integer|min:0',
            'fat' => 'required|integer|min:0',
            'carbs' => 'required|integer|min:0',
        ]);

        $meal->update([
            'calories' => $request->calories,
            'protein' => $request->protein,
            'fat' => $request->fat,
            'carbs' => $request->carbs,
        ]);

        return to_route('meals.show', $meal);
    }

    public function statistics(Request $request){
        $dailyInfos = DailyInfo::where('user_id', auth()->id())->get();

        $calories = $dailyInfos->map(fn ($info) => [
            'date' => $info->created_at->toDateString(),
            'total_calories' => $info->total_calories,
        ]);

        $totalMeals = Meal::where('user_id', auth()->id())->count();

        $mealsPerDay = Meal::where('user_id', auth()->id())
            ->selectRaw('date, COUNT(*) as meal_count')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return inertia('Meals/Statistics', [
            'calories' => $calories,
            'totalMeals' => $totalMeals,
            'mealsPerDay' => $mealsPerDay
        ]);

    }

    public function recalculate(Request $request, Meal $meal){
        $request->validate([
            'ingredients' => 'required|string|max:255',
        ]);

        $changedIngredients = $request->input('ingredients');

        $previousData = [
            'calories' => $meal->calories,
            'protein' => $meal->protein,
            'fat' => $meal->fat,
            'carbs' => $meal->carbs,
            'health_score' => $meal->health_score,
            'original_ingredients' => $meal->ingredients,
        ];

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => <<<EOT
        You are a highly accurate nutrition assistant. Given a list of ingredients and previous nutrition data, **adjust the nutrition values** accordingly.
           **Instructions:**
        - Consider both the **original ingredients** and the **new ingredients**.
        - If some ingredients remain unchanged, retain their nutritional values.
        - If ingredients are removed or changed, **update the values accordingly**.
        - Provide a new estimation for calories, protein, fat, and carbs.
        - Keep the response in **strict JSON format**.
            Format the response in **strict JSON**:
            ```json
        {
            "calories": (integer),
            "protein": (integer),
            "fat": (integer),
            "carbs": (integer),
            "health_score": (integer) 1-10
        }
        EOT],
                [
                    'role' => 'user',
                    'content' => "Recalculate based on these details:
                - Old Ingredients: {$previousData['original_ingredients']}
                - Old Nutrition Values: Calories: {$previousData['calories']}, Protein: {$previousData['protein']}g, Fat: {$previousData['fat']}g, Carbs: {$previousData['carbs']}g.
                - New Ingredients:** {$changedIngredients}"
                ],
            ],
            'response_format' => ['type' => 'json_object'],
        ])->choices[0]->message->content;

        $updatedData = json_decode($response, true);

        if(!$updatedData){
            return response()->json(['error' => 'failed to analyze the image']);
        }

        $meal->update([
            'ingredients' => $changedIngredients,
            'calories' => $updatedData['calories'],
            'protein' => $updatedData['protein'],
            'fat' => $updatedData['fat'],
            'carbs' => $updatedData['carbs'],
            'health_score' => $updatedData['health_score'],
        ]);

        return to_route('meals.show', $meal);
    }

    public function recalculateShow(Meal $meal)
    {
        return inertia('Meals/EditIngredients', ['meal' => $meal]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        //
    }
}
