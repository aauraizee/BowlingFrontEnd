import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameViewer from './components/GameViewer/GameViewer';
import FramesViewer from './components/FramesViewer/FramesViewer';
import GameCreateForm from './components/GameCreateForm/GameCreateForm';

// import { fetchData } from './api';

class App extends React.Component {
    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={GameViewer} />
                    <Route path="/game" exact render={(props) => <FramesViewer {...props} />} />
                    <Route path="/add" exact component={GameCreateForm} />
                </Switch>
            </BrowserRouter>
        )
    }
}


export default App;