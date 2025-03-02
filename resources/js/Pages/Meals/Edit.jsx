import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {IoIosArrowBack} from "react-icons/io";

export default function Edit({meal}){
    const { data, setData, put, processing, errors } = useForm({
        calories: meal.calories,
        protein: meal.protein,
        fat: meal.fat,
        carbs: meal.carbs,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("meals.update", meal.id));
    };

    return (
        <AuthenticatedLayout>
            <div className='flex flex-col items-center'>
                <div className='w-full max-w-lg mb-8'>
                    <img
                        src={meal.image_path}
                        className='w-full aspect-square object-cover rounded-xl shadow-lg'
                        alt="Meal presentation"
                    />
                </div>
                <div className='flex flex-col -mt-20 p-3 rounded-3xl w-full max-w-lg bg-white shadow-md '>
                    <h2 className='text-2xl font-bold mb-2'>Meal Update</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-2">
                            <label className="block text-lg font-bold">Calories</label>
                            <input
                                type="number"
                                value={data.calories}
                                onChange={(e) => setData("calories", e.target.value)}
                                className="w-full border bg-yellow-300 rounded-lg p-3"
                            />
                            {errors.calories && <p className="text-red-500">{errors.calories}</p>}
                        </div>

                        <div className="mb-2">
                            <label className="block text-lg font-bold">Protein</label>
                            <input
                                type="number"
                                value={data.protein}
                                onChange={(e) => setData("protein", e.target.value)}
                                className="w-full border bg-purple-300 rounded-lg p-3"
                            />
                            {errors.protein && <p className="text-red-500">{errors.protein}</p>}
                        </div>

                        <div className="mb-2">
                            <label className="block text-lg font-bold">Fat</label>
                            <input
                                type="number"
                                value={data.fat}
                                onChange={(e) => setData("fat", e.target.value)}
                                className="w-full border bg-orange-300 rounded-lg p-3"
                            />
                            {errors.fat && <p className="text-red-500">{errors.fat}</p>}
                        </div>

                        <div className="mb-2">
                            <label className="block text-lg font-bold">Carbs</label>
                            <input
                                type="number"
                                value={data.carbs}
                                onChange={(e) => setData("carbs", e.target.value)}
                                className="w-full border bg-green-300 rounded-lg p-3"
                            />
                            {errors.carbs && <p className="text-red-500">{errors.carbs}</p>}
                        </div>
                        <div className="flex justify-center m-4">
                            <button type='submit' className='bg-blue-400 py-2 px-4 rounded-lg hover:bg-blue-500'>
                                Update Meal Info
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <Link href={route('meals.index')} className='absolute top-20 left-5 p-2 bg-gray-300 rounded-full'>
                <IoIosArrowBack className='text-2xl'/>
            </Link>
        </AuthenticatedLayout>
    )
}
