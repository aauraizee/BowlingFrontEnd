import React, { useState, useEffect, Fragment } from 'react';
import FrameCreateForm from '../FrameCreateForm/FrameCreateForm';

import {FrameObject} from '../FrameCreateForm/FrameObject';

const GameCreateForm = () => {

    const [frameInfo, setFrameInfo] = useState([FrameObject]);
    const [shotInfo, setShotInfo] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    const [currentFrame, setCurrentFrame] = useState()


    // useEffect(() => {
    //     for (let i = 1; i <= 10; i++) {
    //         let nextFrame = { num: i, type: '' }
    //         setFrameInfo(frameInfo => [...frameInfo, nextFrame])
    //     }
    // }, []);

    const buildStepContent = () => {
         return (<FrameCreateForm key={activeStep} frameInfoObject={frameInfo} number={activeStep} onNext={handleNext} onBack={handleBack} />)    
        
    }

    const handleNext = (data) => {
        // if(frameInfo.some(frame => frame.num === data.num))
        //     return true
        // else {
        //     setFrameInfo([...frameInfo, data])
        //     return true
        // }
        
            
    }

    const handleBack = (data) => {
        console.log('parent received:' + JSON.stringify(data))
    }


    return (
        <Fragment>
            <form>
                {buildStepContent()}
            </form>
        </Fragment>
    )
}



export default GameCreateForm;