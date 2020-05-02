import React, { useEffect } from 'react';

import { fetchGameData } from '../../api';

const GameViewer = () => {

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetchGameData();

            console.log(response);
        }

        fetchGames();
    }, []);


    return (
        <h1>GameViewer</h1>
    )
}

export default GameViewer;