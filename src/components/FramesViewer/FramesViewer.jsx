import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { fetchFrameData } from '../../api';
import FrameCard from '../FrameCard/FrameCard';

const FramesViewer = ({ data }) => {
    const location = useLocation();

    const [gameInfo, setGameInfo] = useState(location.state);
    const [frames, setFrames] = useState( [] );

    useEffect(() => {
        const fetchFrames = async () => {
            const response = await fetchFrameData(gameInfo.data.gameId);

            setFrames(response);
        }

        fetchFrames();
    }, []);

    if (frames.length === 0) {
        return "Loading..."
    }
    return(
        <Fragment>
            <Grid container spacing={2} justify="center">
            {frames.map((frame, index) => (
                <Grid item xs={3}>
                    <FrameCard key={frame.frameId} data={frame} />
                </Grid>
            ))}
            </Grid>
        </Fragment>
        
        
    )
}

export default FramesViewer;