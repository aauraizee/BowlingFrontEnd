import React, { useState, useEffect, Fragment } from 'react';
import MaterialTable from 'material-table';

import { fetchGameData, fetchFrameData } from '../../api';

const GameViewer = () => {

    const [gameData, setGameData] = useState( [] );
    

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetchGameData();

            setGameData(response);
        }

        fetchGames();
    }, []);

    if (gameData.length === 0) {
        return "Loading...";
    }
    return (
        <Fragment>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    columns={[
                        { title: 'Game Number', field: 'gameId' },
                        { title: 'Game Score', field: 'totalScore' },
                        { title: 'Player Number', field: 'playerId' }
                    ]}
                    data={gameData}
                    title="Your Games"
                    options={{
                        emptyRowsWhenPaging: false
                    }}
                    />
            </div>
        </Fragment> 
    )
}

export default GameViewer;