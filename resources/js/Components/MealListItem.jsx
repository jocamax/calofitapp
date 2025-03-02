import {Link} from "@inertiajs/react";
import {Spoiler} from "@mantine/core";

export default function MealListItem({meal}) {

    return (
        <Link href={route('meals.show', meal.id)} key={meal.id}
              className='bg-gray-100 mb-4 flex rounded-2xl shadow-sm relative'>
            <img src={meal.image_path} className='w-36 h-36 object-cover rounded-2xl' alt=""/>
            <div className='flex flex-col justify-between'>
                <Spoiler maxHeight={22} className='p-2 text-lg mt-5'>{meal.description}</Spoiler>
                <div className='flex gap-2 mb-3 m-2 text-sm'>
                    <div className='px-1 py-2 bg-yellow-400 rounded-lg'>
                        <span className='text-lg font-bold'>{meal.calories}</span> calories
                    </div>
                    <div className='px-1 py-2  bg-orange-400 rounded-lg '>
                        <span className='text-lg font-bold'>{meal.fat}</span>g fat
                    </div>
                    <div className='px-1 py-2 bg-purple-400 rounded-lg'>
                        <span className='text-lg font-bold'>{meal.protein}</span>g protein
                    </div>
                </div>

            </div>

            <div className='absolute top-2 right-2'>
                {meal.date}
            </div>

        </Link>
    )
}
