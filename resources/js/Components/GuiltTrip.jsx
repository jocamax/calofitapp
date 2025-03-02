export default function GuiltTrip({caloriesEaten}){

    return(
        <div className={`p-2 m-2 ${caloriesEaten < -100 ? 'bg-orange-300': 'bg-green-400'} rounded-lg`}>
        {caloriesEaten < -100 ?
            <div className='flex items-center'>
                <img src="https://emap-moon-prod.s3.eu-west-1.amazonaws.com/wp-content/uploads/sites/3/2010/07/obesity_man.jpg" className='w-28 rounded-lg' alt="fat people"/>
                <h2 className='font-medium text-xl p-2'>Keep going, and you're gonna end up like this!</h2>
            </div>:
            <div className='flex items-center'>
                <img
                    src="https://emap-moon-prod.s3.eu-west-1.amazonaws.com/wp-content/uploads/sites/3/2010/07/obesity_man.jpg"
                    className='w-28 rounded-lg' alt="fat people"/>
                <h2 className='font-medium text-xl p-2'>Good job so far!</h2>
            </div>
        }
        </div>
    )
}
