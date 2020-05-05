import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { fetchShotsForFrameData } from '../../api'


const FrameCard = ({ data }) => {
    const [frameData, setFrameData] = useState(data);
    const [shotsData, setShotsData] = useState( [] );

    useEffect(() => {
        const fetchShotsForFrame = async () => {
            const response = await fetchShotsForFrameData(frameData.frameId);

            setShotsData(response);
        }

        fetchShotsForFrame();
    }, []);
     
    const renderShots = () => {
        let shotString = '';
        if (frameData.typeFlag === 0) {
            shotString = 'X';
        } else if (frameData.typeFlag === 1) {
            shotsData.map((shot, index) => {
                if (shot.pinsHit === 0) {
                    shotString = shotString + ' ' + '-'
                }
                if (shot.isSpareShot) {
                    shotString = shotString + ' ' + '/'
                } else {
                    shotString = shotString + ' ' + shot.pinsHit
                }
            })
        } else {
            shotsData.map((shot, index) => {
                if (shot.pinsHit === 0) {
                    shotString = shotString + ' ' + '-'
                } else {
                    shotString = shotString + ' ' + shot.pinsHit
                }
            })
        }
        return shotString;
    }

    const renderType = () => {
        switch (frameData.typeFlag) {
            case 0: return 'Strike';
            case 1: return 'Spare';
            case 2: return 'Open';
            case 3: return 'Tenth';
            default: return 'Error'
        }
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='overline' align='left'>Frame {frameData.frameId}</Typography>
                <Typography variant='h6' align='center'>{renderShots()}</Typography>
                <Typography align='center' gutterBottom>{renderType()}</Typography>
                <Typography align='center' color='error'>{frameData.scoreAtFrame}</Typography>

            </CardContent>
        </Card>
    )
}

export default FrameCard;