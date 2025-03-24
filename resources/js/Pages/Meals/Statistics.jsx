import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { AreaChart } from '@mantine/charts';

export default function Statistics({calories, mealsPerDay, totalMeals}){
console.log(mealsPerDay)
    return (
        <AuthenticatedLayout>
            <div className='m-auto max-w-2xl'>
                <div className='mt-6 p-2'>
                    <h2 className='p-4 text-2xl font-bold'>Total calories per day</h2>
                    <AreaChart
                        h={250}
                        data={calories}
                        dataKey="date"
                        series={[
                            {name: 'total_calories', color: 'indigo.6'},

                        ]}
                        curveType="linear"
                        tickLine="x"
                        gridAxis="xy"
                    />
                </div>
                <div className='mt-6 p-2'>
                    <h2 className='p-4 text-2xl font-bold'>Number of meals per day</h2>
                    <AreaChart
                        h={250}
                        data={mealsPerDay}
                        dataKey="date"
                        series={[
                            {name: 'meal_count', color: 'teal.6'},

                        ]}
                        curveType="linear"
                        tickLine="x"
                        gridAxis="xy"
                    />
                </div>
                <div className='mt-6 p-2'>
                    <h2 className='p-4 text-2xl font-bold'>Total meals in our record</h2>
                    <div className='p-4 shadow-lg rounded-lg w-32 flex flex-col'>
                        <p>Meal count</p>
                        <h3 className='font-bold text-3xl'>{totalMeals}</h3>
                    </div>
                </div>
                </div>
        </AuthenticatedLayout>
    )
}
