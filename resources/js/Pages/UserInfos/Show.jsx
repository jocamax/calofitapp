import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Link} from "@inertiajs/react";
import {CiEdit} from "react-icons/ci";

export default function Index({userInfo}){
    console.log(userInfo)
    return (
        <AuthenticatedLayout>
            <div className='mt-4 p-4 flex flex-col max-w-xl rounded-xl bg-white m-auto'>
                <h1 className='text-2xl mb-8 font-bold self-start'>User Information</h1>

                <div className='flex flex-col mb-4 gap-6 text-lg bg-gray-100 p-4 rounded-xl'>
                    <div className='flex justify-between '>
                        <div>Age</div>
                        <div>{userInfo.age}</div>
                    </div>
                    <div className='flex justify-between '>
                        <div>Weight</div>
                        <div>{userInfo.weight}kg</div>
                    </div>
                    <div className='flex justify-between '>
                        <div>Height</div>
                        <div>{userInfo.height}cm</div>
                    </div>
                    <div className='flex justify-between '>
                        <div>Gender</div>
                        <div>{userInfo.gender}</div>
                    </div>
                </div>

                <div className='flex flex-col gap-6 text-lg bg-gray-100 p-4 rounded-xl'>
                    <div className='flex justify-between '>
                    <div>Goal</div>
                        <div>{userInfo.goal}</div>
                    </div>
                    <div className='flex justify-between '>
                        <div>Daily calorie goal</div>
                        <div>{parseInt(userInfo.calorie_needed)}kcal</div>
                    </div>
                    <div className='flex justify-between '>
                        <div>Height</div>
                        <div>{userInfo.height}cm</div>
                    </div>
                </div>
            </div>
            <Link href={route('userinfo.edit')} className='absolute mt-2 top-20 right-2 p-2 bg-gray-300 bg-opacity-60 rounded-full'>
                <CiEdit className='text-3xl '/>
            </Link>
        </AuthenticatedLayout>
    )
}
