import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import DailyInfo from "@/Components/DailyInfo.jsx";

export default function Index({daily_infos, userInfo}){
    console.log(daily_infos)
    return (
        <AuthenticatedLayout>
            <div className='flex flex-col m-auto max-w-xl p-2'>
                <h2 className='text-2xl font-bold mt-2 mb-6'>Daily infos</h2>
                <div>
                    <ul>
                        {daily_infos.map(daily_info => (
                            <DailyInfo dailyInfo={daily_info} userInfo={userInfo}/>
                        ))}
                    </ul>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
