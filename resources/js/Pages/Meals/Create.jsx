import {Link, useForm} from "@inertiajs/react";
import {useRef, useState} from "react";
import { IoIosArrowBack } from "react-icons/io";
import RunningCamel from "@/Animations/RunningCamel.jsx";
import {Overlay} from "@mantine/core";
import Webcam from 'react-webcam';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        image: null, // Image file
    });

    const webcamRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [mealInfo, setMealInfo] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
            setData('image', file);
            setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', data.image);

        post(route('meals.store'), {
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onSuccess: ({ props }) => {
                setMealInfo(props.meal);
            },
        });
    };
    return (

            <div className="flex flex-col items-center justify-center h-screen  bg-gray-100 text-black">
                {processing && (
                    <Overlay blur={4} className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
                        <RunningCamel />
                        <h2 className='m-auto text-2xl'>Loading...</h2>
                    </Overlay>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-col gap-6 items-center w-full flex-grow justify-center bg-gray-200">
                        <label
                            className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>Upload Image</span>
                            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange}
                                   className="hidden"/>
                        </label>

                        {preview && <img src={preview} alt="Meal Preview"
                                         className="w-64 h-64 object-cover rounded-xl shadow-lg"/>}
                    </div>
                    <div className="w-full p-4 text-center shadow-lg flex flex-col items-center">
                        <h2 className='text-2xl font-bold m-3'>Effortless calorie tracking</h2>
                        <p className='p-4 max-w-lg'>Take a picture of your meal, and we will handle the rest - calorie
                            tracking and more!</p>
                        <button type="submit" disabled={processing}
                                className="bg-blue-500 text-white  py-2 rounded w-full">
                            {processing ? 'Analyzing...' : 'Analyze Meal'}
                        </button>
                    </div>
                </form>
                <Link href={route('daily_info.showLatest')} className='absolute top-5 left-5 p-2 bg-gray-300 rounded-full'>
                    <IoIosArrowBack className='text-2xl'/>
                </Link>
            </div>
    );
}

