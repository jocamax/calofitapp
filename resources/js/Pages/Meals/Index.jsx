import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import MealListItem from "@/Components/MealListItem.jsx";

export default function Index({meals}){
    console.log(meals)
    return (
        <AuthenticatedLayout>
        <div className='flex flex-col m-auto max-w-xl p-2'>
            <h2 className='text-2xl font-bold mt-2 mb-6'>Your Meals</h2>
            <div>
            <ul>
                {meals.map(meal => (
                    <MealListItem meal={meal}/>
                ))}
            </ul>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}
