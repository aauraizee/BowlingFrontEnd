import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const FramesViewer = ({ data }) => {
    const location = useLocation();

    const [gameInfo, setGameInfo] = useState(location.state);

    return(
    <h1>FramesViewer for Game {gameInfo.data.gameId}</h1>
    )
}

export default FramesViewer;