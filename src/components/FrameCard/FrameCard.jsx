import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';



const FrameCard = ({ data }) => {
    const [frameData, setFrameData] = useState(data);

    return (
        <Card>
            <CardContent>
                <Typography>
                    Frame {frameData.frameId}
                </Typography>
                <Typography>
                    Pins Hit: {frameData.value}
                </Typography>
                <Typography>
                {(() => {
                    switch (frameData.typeFlag) {
                    case 0:   return 'Strike';
                    case 1:   return 'Spare';
                    case 2:   return 'Open';
                    case 3:   return 'Tenth';
                }
                })()}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default FrameCard;