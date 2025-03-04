import {useForm} from "@inertiajs/react";
import {useState} from "react";
export default function InitialStore(){
    const { data, setData, post, processing, errors } = useForm({
        age: "",
        gender: "",
        weight: "",
        height: "",
        activity_level: "",
        goal: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('userinfo.initial'), {
            preserveScroll: true,
            onSuccess: () => alert("User info saved successfully!"),
        });
    };

    return (

                <div className="mx-auto p-6 bg-white shadow-md rounded">
                    <h2 className="text-2xl font-semibold text-center mb-4">Set Up Your Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Age</label>
                            <input
                                type="number"
                                value={data.age}
                                onChange={(e) => setData("age", e.target.value)}
                                className="w-full p-2 border rounded"
                                min="9"
                                max="100"
                            />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData("gender", e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Weight (kg)</label>
                            <input
                                type="number"
                                value={data.weight}
                                onChange={(e) => setData("weight", e.target.value)}
                                className="w-full p-2 border rounded"
                                min="20"
                                max="200"
                            />
                            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Height (cm)</label>
                            <input
                                type="number"
                                value={data.height}
                                onChange={(e) => setData("height", e.target.value)}
                                className="w-full p-2 border rounded"
                                min="80"
                                max="270"
                            />
                            {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Activity Level</label>
                            <select
                                value={data.activity_level}
                                onChange={(e) => setData("activity_level", e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="lightly_active">Lightly Active</option>
                                <option value="moderately_active">Moderately Active</option>
                                <option value="very_active">Very Active</option>
                            </select>
                            {errors.activity_level && <p className="text-red-500 text-sm">{errors.activity_level}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Goal</label>
                            <select
                                value={data.goal}
                                onChange={(e) => setData("goal", e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="lose_weight">Lose Weight</option>
                                <option value="maintain_weight">Maintain Weight</option>
                                <option value="gain_weight">Gain Weight</option>
                            </select>
                            {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
    )
}
