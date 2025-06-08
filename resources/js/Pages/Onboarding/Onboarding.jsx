import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import InitialStore from "@/Pages/UserInfos/InitialStore.jsx";

export default function Onboarding({ user }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { post } = useForm();
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const completeOnboarding = () => {
        if(isSubmitted){
            post(route('onboarding.complete'), {
                onSuccess: () => {
                    router.visit(route('daily_info.index'));
                },
            });
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 p-2">
        <div className="max-w-2xl mx-auto flex flex-col min-h-screen justify-between text-center p-6">
            <div>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="" description="">
                    <div className='mt-20'>
                        <ApplicationLogo className='h-32 m-auto mb-10'/>
                        <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
                        <p className='text-gray-600'>Track your meals effortlessly with AI-powered calorie tracking. Simply take a photo of your food, and we'll handle the rest!</p>
                    </div>

                </Stepper.Step>
                <Stepper.Step label="" description="">
                    <div className='mt-16 flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold mb-4">How to Scan Your Food</h1>
                        <p className="text-gray-600 mb-6">
                            Follow these simple steps to get accurate calorie and nutrition tracking:
                        </p>
                        <div className="flex flex-col  gap-6">
                            <div className="flex items-center gap-4">
                                <div className="min-w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    1
                                </div>
                                <p className="text-gray-700">Place your food on a well-lit surface.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="min-w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    2
                                </div>
                                <p className="text-gray-700">Take a clear photo of your food.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="min-w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    3
                                </div>
                                <p className="text-gray-700">Wait for AI to analyze your meal!</p>
                            </div>
                        </div>
                    </div>
                </Stepper.Step>
                <Stepper.Step label="" description="">
                    <InitialStore onSuccess={() => setIsSubmitted(true)} />
                </Stepper.Step>
                <Stepper.Completed>
                    <h1 className='text-2xl font-bold'>Click Get Started <span className='text-red-600'>only if you saved your personal info</span></h1>
                    <button
                        onClick={completeOnboarding}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Get Started
                    </button>
                </Stepper.Completed>
            </Stepper>
            </div>

            <div className='flex gap-4 mb-10 self-center'>
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
            </div>

        </div>
        </div>
    );
}
