import React, { useState, useEffect, Fragment } from 'react';

import GameEntry from './GameEntry';

import { fetchGameData, fetchFrameData } from '../../api';

const GameViewer = () => {

    const [gameData, setGameData] = useState( [] );
    

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetchFrameData();

            setGameData(response);
        }

        fetchGames();
    }, []);

    if (gameData.length === 0) {
        return "Loading...";
    }
    return (
        <Fragment>
            <h1>GameViewer</h1>
            {gameData.map(game => (
                <GameEntry key={game.frameId} data={game} />
            ))}
        </Fragment> 
    )
}

export default GameViewer;