<?php

namespace App\Http\Controllers;

use App\Models\UserStatistics;
use Illuminate\Http\Request;

class UserStatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('UserInfos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'age' => 'required|integer|min:9|max:100',
            'gender' => 'required|in:male,female',
            'weight' => 'required|numeric|min:20|max:200',
            'height' => 'required|numeric|min:80|max:270',
            'activity_level' => 'required|in:sedentary,lightly_active,moderately_active,very_active',
            'goal' => 'required|in:lose_weight,maintain_weight,gain_weight',
        ]);

        $userStats = UserStatistics::updateOrCreate(
            ['user_id' => auth()->id()],
            $request->all()
        );

        return response()->json([
            'message' => 'User statistics saved',
            'userStats' => $userStats
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserStatistics $userStatistics)
    {
        return inertia('UserInfos/Show', [
            'userStatistics' => $userStatistics
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserStatistics $userStatistics)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserStatistics $userStatistics)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserStatistics $userStatistics)
    {
        //
    }
}
