import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function EditIngredients({meal}) {
    const { data, setData, put, processing, errors } = useForm({
        ingredients: meal.ingredients
    });
    console.log(meal)


    const recalculate = (e) => {
        e.preventDefault()
        put(route("meals.recalculate", meal.id))
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Edit Meal</h2>
            <textarea
                value={data.ingredients}
                onChange={(e) => setData("ingredients", e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
            />
            <button
                onClick={recalculate}
                disabled={processing}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {processing ? "Updating..." : "Recalculate Nutrition"}
            </button>
        </div>
    );
}
