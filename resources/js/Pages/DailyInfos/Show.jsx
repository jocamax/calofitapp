import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { LiaFireAltSolid } from "react-icons/lia";
import { SemiCircleProgress, Progress } from '@mantine/core';
import {Link} from "@inertiajs/react";
import { TbHealthRecognition } from "react-icons/tb";
import { GiSlicedBread } from "react-icons/gi";
import { LuDumbbell } from "react-icons/lu";
import { GiMeal } from "react-icons/gi";
import { FaAngleDoubleRight } from "react-icons/fa";
import MealListItem from "@/Components/MealListItem.jsx";
import GuiltTrip from "@/Components/GuiltTrip.jsx";

export default function Index({dailyInfo, userInfo, recentMeals}){
    console.log(recentMeals)
    return (
        <AuthenticatedLayout>
            <div className='m-auto max-w-2xl'>
                <div className='flex justify-between'>
                    <h2 className='m-2 px-4 py-2 text-xl text-center'>Today</h2>
                    <Link href={route('meals.create')} className='m-2 px-4 py-2 bg-blue-400 rounded-xl'>+ Add new
                        meal</Link>
                </div>
                <Link href={route('daily_info.index')} className={`p-4 m-2 flex flex-col bg-yellow-300 ${parseInt(userInfo[0].calorie_needed - dailyInfo.total_calories) < -100 && 'bg-red-400'} rounded-xl hover:bg-yellow-400 transition`}>
                    <div className='flex justify-between'>
                        <div className='font-bold'>Calories left</div>
                        <div className='bg-yellow-400 text-2xl p-2 rounded-full'><LiaFireAltSolid/></div>
                    </div>
                    <div className='self-center'>
                        <SemiCircleProgress
                            fillDirection="left-to-right"
                            orientation="up"
                            filledSegmentColor="violet.4"
                            emptySegmentColor="gray.5"
                            size={250}
                            thickness={16}
                            value={(dailyInfo.total_calories / userInfo[0].calorie_needed) * 100}
                            label={
                                <div className='text-xl'>
                                    <span
                                        className='text-5xl'>{parseInt(userInfo[0].calorie_needed - dailyInfo.total_calories)}</span>kcal
                                </div>
                            }/>
                    </div>
                </Link>
                <div className='flex'>
                    <div className='p-4 m-2 rounded-xl w-full flex flex-col bg-purple-300'>
                        <div className='self-end bg-purple-400 text-2xl p-2 rounded-full'><LuDumbbell/></div>
                        <div className='self-center'>
                            <span className='text-4xl font-bold'>{dailyInfo.total_protein}</span>
                            <span className='font-light text-gray-600'>grams</span>
                        </div>
                        <div className='font-bold ml-5 text-gray-500'>Protein</div>
                    </div>
                    <div className='p-4 m-2 rounded-xl w-full  flex flex-col bg-green-300'>
                        <div className='self-end bg-green-400 text-2xl p-2 rounded-full'><GiSlicedBread/></div>
                        <div className='self-center'>
                            <span className='text-4xl font-bold'>{dailyInfo.total_carbs}</span>
                            <span className='font-light text-gray-400'>grams</span>
                        </div>
                        <div className='font-bold ml-5 text-gray-500'>Carbs</div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='p-4 m-2 rounded-xl w-full flex flex-col bg-orange-300'>
                        <div className='self-end'>Fat</div>
                        <div className='self-center'>
                            <span className='text-4xl font-bold'>{dailyInfo.total_fat}</span>
                            <span className='font-light text-gray-600'>grams</span>
                        </div>
                        <div className='font-bold ml-5 text-gray-500'>Fat</div>
                    </div>
                    <div className='p-4 m-2 rounded-xl w-full  flex flex-col text-white justify-between bg-gray-800'>
                        <div className='flex justify-between items-center mb-2'>
                            <div className='p-1 bg-gray-700 rounded-full'>
                                <TbHealthRecognition className='text-2xl'/>
                            </div>
                            <div className='self-end font-bold'>Health Score</div>
                        </div>
                        <div className='mb-2'>

                            <Progress.Root size={30} radius="xl">
                                <Progress.Section color="lime" value={dailyInfo.average_health_score * 10}>
                                    <Progress.Label>{parseInt(dailyInfo.average_health_score * 10)}%</Progress.Label>
                                </Progress.Section>
                            </Progress.Root>
                        </div>
                    </div>
                </div>

                <div className='p-4 m-2 flex flex-col  bg-blue-300 rounded-xl'>
                    <Link href={route('meals.index')} className='flex justify-between items-center'>
                        <div className='text-4xl ml-2 flex gap-2 items-center'>
                            <GiMeal/>
                            <h2 className='text-2xl'>View your meals</h2>
                        </div>
                        <div className='bg-blue-400 text-2xl p-2 rounded-full'><FaAngleDoubleRight/>
                        </div>
                    </Link>
                </div>
                {
                    parseInt(userInfo[0].calorie_needed - dailyInfo.total_calories) < -100 ?
                        <GuiltTrip caloriesEaten={parseInt(userInfo[0].calorie_needed - dailyInfo.total_calories)}/>:
                        <></>
                    //add smthing later for

                }


                <div className='bg-yellow-300 p-4 m-2 mt-4 flex flex-col rounded-xl items-center'>
                    <p className='text-lg mb-2'>Today's calories</p>
                    <h2 className='text-3xl font-bold'>
                        {dailyInfo.total_calories}
                        <span className='text-xl font-light m-2'>out of</span>
                        {parseInt(userInfo[0].calorie_needed)}kcal
                    </h2>

                </div>
                <div className='m-3 mt-4'>
                    <h2 className='text-3xl mb-6 font-bold'>Recent meals</h2>
                    {recentMeals.map(meal => (
                        <MealListItem key={meal.id} meal={meal}/>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
