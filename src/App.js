import React from 'react';

import GameViewer from './components/GameViewer/GameViewer';

// import { fetchData } from './api';

class App extends React.Component {
    
    render() {
        return (
            <div>
                <GameViewer />
            </div>
        )
    }
}


export default App;