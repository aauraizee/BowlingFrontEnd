import React, { Fragment } from 'react';
import FrameCreateForm from '../FrameCreateForm/FrameCreateForm';

import { Grid } from '@material-ui/core';

const GameCreateForm = () => {
    return (
        <Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
                <Grid item xs={3}>
                    <FrameCreateForm />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default GameCreateForm;