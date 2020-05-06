import React, { useState, useEffect, Fragment } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, TextField, MenuItem, Grid } from '@material-ui/core';

import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'

const FrameCreateForm = (props) => {

    const { number } = props;

    const [activeStep, setActiveStep] = useState(number)
    const [frameType, setFrameType] = useState('')
    const [frameData, setFrameData] = useState({ num: activeStep+1, type: frameType })

    useEffect(() => {
        if (frameType === 0) {
            setFrameData({ num: activeStep+1, type: frameType, shot1: 10 })
        } else if (frameType === 1 || frameType === 2) {
            setFrameData({ num: activeStep+1, type: frameType, shot1: 0, shot2: 0, spareType: '' })
        } else if (frameType === 3) {
            setFrameData({ num: activeStep+1, type: frameType, shot1: 0, shot2: 0, shot3: 0 })
        }
        console.log('rerender')
    }, [frameType]);

    const handleSelectChange = (e) => {
        setFrameType(e.target.value);
    }

    const handleChange = (e) => {
        setFrameData({
            ...frameData,
            [e.target.name]: e.target.value
        })
    }

    const handleNext = () => {
        const frameAdded = props.onNext(frameData)
        if(frameAdded) {
            setActiveStep((activeStep) => activeStep + 1)
        }  
    }

    const handleBack = () => {
        setActiveStep((activeStep) => activeStep - 1)
    }

    const buildTextFields = (frameType) => {
        switch (frameType) {
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
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6' align='center'>/</Typography>
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField id='spare-type' label="Enter Spare Type" margin='dense' name='spareType' onChange={handleChange} />
                        </Grid>   
                    </Fragment>
                )
            case 2:
                return (
                    <Fragment>
                        <Grid item xs={6}>
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' onChange={handleChange}  />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="shot-2" label="Shot 2" variant='outlined' margin='dense' name='shot2' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='spareType' label="Enter Spare Type" margin='dense' name='spareType' onChange={handleChange}>/</TextField>
                        </Grid> 
                    </Fragment>
                )
            case 3:
                return (
                    <Fragment>
                        <Grid item xs={4}>
                            <TextField id="shot-1" label="Shot 1" variant='outlined' margin='dense' name='shot1' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="shot-2" label="Shot 2" variant='outlined' margin='dense' name='shot2' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="shot-3" label="Shot 3" variant='outlined' margin='dense' name='shot3' onChange={handleChange} />
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
                        <FormControl fullWidth margin='dense'>
                            <InputLabel id="shot-type-select-label">Frame Type</InputLabel>
                            <Select 
                                labelId="shot-type-select-label" 
                                id="shot-type-select"
                                value={frameType}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={0}>Strike</MenuItem>
                                <MenuItem value={1}>Spare</MenuItem>
                                <MenuItem value={2}>Open</MenuItem>
                                <MenuItem value={3}>Tenth</MenuItem>
                            </Select>
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
    </Fragment>
    )
       
    
}

export default FrameCreateForm;