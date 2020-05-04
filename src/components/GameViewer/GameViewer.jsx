import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';

import { fetchGameData } from '../../api';

const GameViewer = () => {

    const history = useHistory();

    const [gameData, setGameData] = useState( [] );
    
    const handleRowClick = (event, rowData) => {
        history.push('/game', { data: rowData })
    }

    const handleDeleteGame = (event, rowData) => {
        console.log("you want to delete this row?")
    }

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
                    onRowClick={handleRowClick}
                    localization={{
                        header : {
                            actions: ''
                        }
                    }}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete Game',
                            onClick: handleDeleteGame
                        }
                    ]}
                    options={{
                        search: false,
                        emptyRowsWhenPaging: false,
                        actionsColumnIndex: -1,
                        actionsCellStyle: { color: '#d42700' },
                        headerStyle: { backgroundColor: '#d42700', color: 'white' }
                    }}
                    />
            </div>
        </Fragment> 
    )
}

export default GameViewer;