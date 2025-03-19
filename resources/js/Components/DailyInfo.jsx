import {Progress, RingProgress, SemiCircleProgress} from "@mantine/core";
import {TbHealthRecognition} from "react-icons/tb";

export default function DailyInfo({dailyInfo, userInfo}){
    console.log(userInfo)
    return (
        <div className='flex bg-white p-2 pt-7 items-center relative gap-4 mb-4 rounded-xl shadow-md'>
            <div>
                <SemiCircleProgress
                    fillDirection="left-to-right"
                    orientation="up"
                    filledSegmentColor="violet.4"
                    emptySegmentColor="gray.5"
                    size={140}
                    thickness={15}
                    value={(dailyInfo.total_calories / userInfo[0].calorie_needed) * 100}
                    label={
                        <div className='text-md'>
                                    <span
                                        className='font-bold'>{parseInt(userInfo[0].calorie_needed - dailyInfo.total_calories)}</span>kcal
                        </div>
                    }/>
            </div>
            <div className='flex flex-col w-full p-2'>
                <div className='flex gap-2 px-2'>
                    <div className='bg-gray-100 p-2 rounded-lg bg-purple-300'>{dailyInfo.total_protein}g <span
                        className='text-sm font-bold'>protein</span></div>
                    <div className='bg-gray-100 p-2 rounded-lg bg-green-300'>{dailyInfo.total_carbs}g <span
                        className='text-sm font-bold'>carbs</span></div>
                    <div className='bg-gray-100 p-2 rounded-lg bg-orange-300'>{dailyInfo.total_fat}g <span
                        className='text-sm font-bold'>fat</span></div>

                </div>
                <div>
                    <div className='p-2 m-2 rounded-xl w-full  flex flex-col text-white justify-between bg-gray-800'>
                    <div className='flex justify-between items-center'>
                            <div className='p-1 bg-gray-700 rounded-full'>
                                <TbHealthRecognition className='text-2xl'/>
                            </div>
                            <div className='self-end font-bold text-sm mb-1'>Health Score</div>
                        </div>
                        <div className='mb-1'>

                            <Progress.Root size={24} radius="xl">
                                <Progress.Section color="lime" value={dailyInfo.average_health_score * 10}>
                                    <Progress.Label>{parseInt(dailyInfo.average_health_score * 10)}%</Progress.Label>
                                </Progress.Section>
                            </Progress.Root>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute top-1 right-2'>{dailyInfo.date}</div>
        </div>
    )
}
