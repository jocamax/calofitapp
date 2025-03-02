import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {GiSlicedBread} from "react-icons/gi";
import {LuDumbbell} from "react-icons/lu";
import {TbHealthRecognition} from "react-icons/tb";
import {Progress} from "@mantine/core";
import {Link} from "@inertiajs/react";
import {IoIosArrowBack} from "react-icons/io";
import { CiEdit } from "react-icons/ci";

export default function Show({meal}){
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
                    <div className='flex justify-between'>
                        <div className='p-2 m-2 rounded-xl w-full  flex flex-col bg-purple-300'>
                            <div className='self-end bg-purple-400 text-xl p-2 rounded-full'><LuDumbbell/></div>
                            <div className='self-center'>
                                <span className='text-3xl font-bold'>{meal.protein}</span>
                                <span className='font-light text-sm text-gray-600'>grams</span>
                            </div>
                            <div className='font-bold ml-5 text-gray-500'>Protein</div>
                        </div>
                        <div className='p-2 m-2 rounded-xl w-full  flex flex-col bg-green-300'>
                            <div className='self-end bg-green-400 text-xl p-2 rounded-full'><GiSlicedBread/></div>
                            <div className='self-center'>
                                <span className='text-3xl font-bold'>{meal.carbs}</span>
                                <span className='font-light text-sm text-gray-400'>grams</span>
                            </div>
                            <div className='font-bold ml-5 text-gray-500'>Carbs</div>
                        </div>
                        <div className='p-2 m-2 rounded-xl w-full flex flex-col bg-orange-300'>
                            <div className='self-end'>Fat</div>
                            <div className='self-center'>
                                <span className='text-3xl font-bold'>{meal.fat}</span>
                                <span className='font-light text-sm text-gray-600'>grams</span>
                            </div>
                            <div className='font-bold ml-5 text-gray-500'>Fat</div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='p-3 m-2 w-1/3 rounded-xl flex flex-col bg-yellow-300'>
                            <div className='self-end text-yellow-300'>Calories</div>
                            <div className='self-center'>
                                <span className='text-3xl font-bold'>{meal.calories}</span>
                                <span className='font-light text-sm text-gray-600'>kcal</span>
                            </div>
                            <div className='font-bold ml-5 text-gray-500'>Calories</div>
                        </div>
                        <div
                            className='p-4 m-2 flex-2 rounded-xl w-full  flex flex-col text-white justify-between bg-gray-800'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='p-1 bg-gray-700 rounded-full'>
                                    <TbHealthRecognition className='text-2xl'/>
                                </div>
                                <div className='self-end font-bold'>Health Score</div>
                            </div>
                            <div className='mb-2'>

                                <Progress.Root size={30} radius="xl">
                                    <Progress.Section color="lime" value={meal.health_score * 10}>
                                        <Progress.Label>{meal.health_score * 10}%</Progress.Label>
                                    </Progress.Section>
                                </Progress.Root>
                            </div>
                        </div>
                    </div>
                    <div className='p-2'>
                        <h2 className='text-xl font-bold'>Meal description</h2>
                        <p>{meal.description}</p>
                    </div>
                </div>
            </div>
            <Link href={route('meals.index')} className='absolute top-20 left-5 p-2 bg-gray-300 rounded-full'>
                <IoIosArrowBack className='text-2xl'/>
            </Link>
            <Link href={route('meals.edit', meal.id)} className='absolute top-20 right-5 p-2 bg-gray-300 bg-opacity-60 rounded-full'>
                <CiEdit className='text-3xl '/>
            </Link>
        </AuthenticatedLayout>
    )
}
