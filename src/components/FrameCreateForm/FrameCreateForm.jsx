import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardContent, Typography, FormControl, FormHelperText, InputLabel, Select, TextField, MenuItem, Grid } from '@material-ui/core';

import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'

import { FrameObject } from '../FrameCreateForm/FrameObject';
import { FrameErrorObject } from '../FrameCreateForm/FrameErrorObject';

const FrameCreateForm = (props) => {

    const spareTypeRegex = RegExp('\b[0-9]+(\-[0-9]+)*(?!\-)\b')

    const [activeStep, setActiveStep] = useState(0)
    const [frameType, setFrameType] = useState('')
    const [frameData, setFrameData] = useState([Object.assign({}, FrameObject)])
    const [frameErrorData, setFrameErrorData] = useState([Object.assign({}, FrameErrorObject)])
    

    const handleChange = (e) => {
        var fd = frameData;
        var fde = frameErrorData;
        if(e.target.name === "type" && activeStep === 9) { return }

        if(e.target.name === "type") {
            if (activeStep === 9) { return }
            setFrameType(e.target.value)

            fd[activeStep] = Object.assign({}, {
                num: activeStep + 1,
                type: e.target.value,
                shot1: 0,
                shot2: 0,
                shot3: 0,
                spareType: ""
            })
            fde[activeStep] = Object.assign({}, FrameErrorObject)
            setFrameData([...frameData])
            setFrameErrorData([...frameErrorData])
        } else {
            fd[activeStep][e.target.name] = e.target.value;
        }

        
        setFrameData([...frameData])

        // if(e.target.name === "type") {
        //     if (activeStep === 9) { return }
        //     setFrameType(e.target.value)
        // }

        var fdErrors = frameErrorData;
        switch (e.target.name) {
            case "shot1":
            case "shot2":
            case "shot3":
                fdErrors[activeStep][e.target.name] =
                    Number(e.target.value) > 10 || Number(e.target.value) < 0 && e.target.value.length > 0
                    ? "Shot value must be between 0 and 10"
                    : ""
                break
            case "type":
                fdErrors[activeStep][e.target.name] =
                    e.target.value === 3 && activeStep !== 9
                    ? "Only the 10th frame can be type Tenth"
                    : ""
                break   
        }
        setFrameErrorData([...frameErrorData])

    }

    const saveToLocal = () =>{
        
    }

    const restoreFromLocal = () =>{

    }
    
    const handleNext = () => {
        const currentFrameObject = frameData[activeStep]

       if(currentFrameObject.type !== '') {
            setActiveStep((activeStep) => activeStep + 1)

            var alreadyCreated = (activeStep + 1) < frameData.length
            if(!alreadyCreated) {
                if(activeStep + 2 === 10) {
                    setFrameData([...frameData, Object.assign({}, {
                        num: activeStep + 2,
                        type: 3,
                        shot1: 0,
                        shot2: 0,
                        shot3: 0,
                        spareType: ""
                    })])
                    setFrameType(3)
                    setFrameErrorData([...frameErrorData, Object.assign({}, FrameErrorObject)]) 
                } else {
                    setFrameData([...frameData, Object.assign({}, {
                        num: activeStep + 2,
                        type: '',
                        shot1: 0,
                        shot2: 0,
                        shot3: 0,
                        spareType: ""
                    })])
                    setFrameType('')
                    setFrameErrorData([...frameErrorData, Object.assign({}, FrameErrorObject)])  
                }
            } else {
                setFrameType(frameData[activeStep+1].type)
            }            
       }  
    }

    const handleBack = () => {
        setActiveStep((activeStep) => activeStep - 1)
        const currentFrameObject = frameData[activeStep-1]
        const typeOfFrame = currentFrameObject.type
        setFrameType(typeOfFrame)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let isValid = validate()
       

    }

    const validate = () => {
        let isValid = true
        frameErrorData.map(frame => {
            let errors = Object.keys(frame)
            for (var i = 0; i < errors.length; i++) {
                if (frame[errors[i]].length > 0) {
                    isValid = false;
                    break
                }
            }
        })
        return isValid
    }

    const buildTextFields = (frameType) => {
        const currentFrameObject = frameData[activeStep]
        const currentErrorObject = frameErrorData[activeStep]
        switch (currentFrameObject.type) {
            case 0:
                return (
                    <Grid item xs={12}>
                        <Typography variant='h6' align='center'>X</Typography>
                    </Grid>  
                )
            case 1:
                return (
                    <Fragment>
                        <Grid item xs={6}>
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' value={currentFrameObject.shot1} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot1']} error={currentErrorObject['shot1'].length > 0} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' align='center'>/</Typography>
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField id='spare-type' label="Enter Spare Type" margin='dense' name='spareType' value={currentFrameObject.spareType} onChange={handleChange} />
                        </Grid>   
                    </Fragment>
                )
            case 2:
                return (
                    <Fragment>
                        <Grid item xs={6}>
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' value={currentFrameObject.shot1} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot1']} error={currentErrorObject['shot1'].length > 0}  />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="shot-2" label="Shot 2" variant='outlined' margin='dense' name='shot2' value={currentFrameObject.shot2} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot2']} error={currentErrorObject['shot2'].length > 0} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='spareType' label="Enter Spare Type" margin='dense' name='spareType' value={currentFrameObject.spareType} onChange={handleChange}>/</TextField>
                        </Grid> 
                    </Fragment>
                )
            case 3:
                return (
                    <Fragment>
                        <Grid item xs={4}>
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' value={currentFrameObject.shot1} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot1']} error={currentErrorObject['shot1'].length > 0} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="shot-2" label="Shot 2" variant='outlined' margin='dense' name='shot2' value={currentFrameObject.shot2} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot2']} error={currentErrorObject['shot2'].length > 0} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="shot-3" label="Shot 3" variant='outlined' margin='dense' name='shot3' value={currentFrameObject.shot3} type='number' 
                                       onChange={handleChange} helperText={currentErrorObject['shot3']} error={currentErrorObject['shot3'].length > 0} />
                        </Grid>
                    </Fragment>
                )
            default:
                return (
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' align='center'>Select a frame type</Typography>
                    </Grid> 
                )
        }
    }

    return (
        <Fragment>
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='overline' align='left'>Frame {activeStep+1}</Typography>
                <Grid container spacing={2} justify='center'>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin='dense' error={frameErrorData[activeStep]['type'].length > 0}>
                            <InputLabel id="shot-type-select-label">Frame Type</InputLabel>
                            <Select 
                                labelId="shot-type-select-label" 
                                id="shot-type-select"
                                name="type"
                                value={frameType}
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Strike</MenuItem>
                                <MenuItem value={1}>Spare</MenuItem>
                                <MenuItem value={2}>Open</MenuItem>
                                <MenuItem value={3}>Tenth</MenuItem>
                            </Select>
                            <FormHelperText>{frameErrorData[activeStep]['type']}</FormHelperText>
                        </FormControl>
                    </Grid>
                    {buildTextFields(frameType)}
                </Grid>
            </CardContent>
        </Card>
        <MobileStepper
        variant="progress"
        steps={10}
        position="static"
        activeStep={activeStep}
        nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
            Next
            <KeyboardArrowRight />
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
            </Button>
        }
        />
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Fragment>
    )
       
    
}

export default FrameCreateForm;