import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import ButtonsShowcase from './components/Buttons';
import ToastsShowcase from './components/Toasts';
import Sidebar from "./components/Sidebar";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>
    },
    {
        path: "/bubblegum",
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>
    },
    {
        path: "/shoelaces",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
]

const App: React.FC = () => {
    return (
        <Router>
            <Sidebar routes={routes}/>

            <div className="main">

                <div >
                    <Switch>
                        <Route exact path="/">
                            <Container className="p-3">
                                <Jumbotron>
                                    <h1 className="header">
                                        Welcome To React-Bootstrap TypeScript Example
                                    </h1>
                                </Jumbotron>
                                <h2>Buttons</h2>
                                <ButtonsShowcase/>
                                <h2>Toasts</h2>
                                <ToastsShowcase/>
                            </Container>
                        </Route>
                        <Route path="/bubblegum">
                            <Container >

                            <h2>Bubblegum</h2>
                            f
                            fdsa
                            f
                            dsaf
                            dsafdsaf
                            </Container>
                        </Route>
                        <Route path="/shoelaces">
                            <Container >
                                <h2>shoelaces</h2>
                                f
                                fdsa
                                f
                                dsaf
                                dsafdsaf
                            </Container>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

export default App;
