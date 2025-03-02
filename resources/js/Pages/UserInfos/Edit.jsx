import {Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Edit({userInfo}){
    const {data, setData, put, processing, errors} = useForm({
        age: userInfo.age || "",
        gender: userInfo.gender || "",
        weight: userInfo.weight || "",
        height: userInfo.height || "",
        activity_level: userInfo.activity_level || "",
        goal: userInfo.goal || "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('userinfo.update', userInfo.id), {
            preserveScroll: true,
            onSuccess: () => console.log("User info updated successfully!"),
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="mt-4 p-4 flex flex-col max-w-xl rounded-xl bg-white m-auto">
                <h1 className="text-2xl mb-8 font-bold self-start">Edit User Information</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-6 text-lg bg-gray-100 p-4 rounded-xl">
                        <div className="flex justify-between">
                            <label>Age</label>
                            <input
                                type="number"
                                value={data.age}
                                onChange={(e) => setData("age", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none w-20"
                                min="9"
                                max="100"
                            />
                        </div>
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

                        <div className="flex justify-between">
                            <label>Weight</label>
                            <input
                                type="number"
                                value={data.weight}
                                onChange={(e) => setData("weight", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none w-20"
                                min="20"
                                max="200"
                            />
                        </div>
                        {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}

                        <div className="flex justify-between">
                            <label>Height</label>
                            <input
                                type="number"
                                value={data.height}
                                onChange={(e) => setData("height", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none w-20"
                                min="80"
                                max="270"
                            />
                        </div>
                        {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}

                        <div className="flex justify-between">
                            <label>Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData("gender", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    <div className="flex flex-col gap-6 text-lg bg-gray-100 p-4 rounded-xl">
                        <div className="flex justify-between">
                            <label>Goal</label>
                            <select
                                value={data.goal}
                                onChange={(e) => setData("goal", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="lose_weight">Lose Weight</option>
                                <option value="maintain_weight">Maintain Weight</option>
                                <option value="gain_weight">Gain Weight</option>
                            </select>
                        </div>
                        {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}

                        <div className="flex justify-between">
                            <label>Activity Level</label>
                            <select
                                value={data.activity_level}
                                onChange={(e) => setData("activity_level", e.target.value)}
                                className="text-right bg-transparent border-b border-gray-400 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="lightly_active">Lightly Active</option>
                                <option value="moderately_active">Moderately Active</option>
                                <option value="very_active">Very Active</option>
                            </select>
                        </div>
                        {errors.activity_level && (
                            <p className="text-red-500 text-sm">{errors.activity_level}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {processing ? "Saving..." : "Update"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
