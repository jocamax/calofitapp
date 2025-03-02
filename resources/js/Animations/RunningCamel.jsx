import { useState } from "react";
import Lottie from 'react-lottie';
import animationData from '/public/storage/animations/running_camel.json'

export default function RunningCamel(){
    const [showAnimation, setShowAnimation] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg'
    }
    return (
        <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            eventListeners={[
                {
                    eventName: "complete",
                    callback: () => setShowAnimation(false),
                },
            ]}
        />
    )
}
