import React, { useState, useEffect, Fragment } from 'react';
import FrameCreateForm from '../FrameCreateForm/FrameCreateForm';

const GameCreateForm = () => {

    const [frameInfo, setFrameInfo] = useState([]);
    const [shotInfo, setShotInfo] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    // useEffect(() => {
    //     for (let i = 1; i <= 10; i++) {
    //         let nextFrame = { num: i, type: '' }
    //         setFrameInfo(frameInfo => [...frameInfo, nextFrame])
    //     }
    // }, []);

    const buildStepContent = () => {
        switch(activeStep) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return (<FrameCreateForm number={activeStep} onNext={handleNext} onBack={handleBack} />)    
        }
    }

    const handleNext = (data) => {
        if(frameInfo.some(frame => frame.num === data.num))
            return true
        else {
            setFrameInfo([...frameInfo, data])
            return true
        }
            
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