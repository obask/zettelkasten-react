import React from 'react';
import Container from 'react-bootstrap/Container';
import Sidebar from "./components/Sidebar";

import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import InstapaperView from "./pages/InstapaperView";
import NotionView from "./pages/NotionView";
import SlateView from "./pages/SlateView";
import HomeView from "./pages/HomeView";

const routes = [
    {
        path: "/",
        exact: true,
        icon: "bi-kanban",
        pageName: "SlateView",
        sidebar: () => <div>SlateView!</div>,
        main: () => <h2>SlateView TMP</h2>
    },
    {
        path: "/bubblegum",
        icon: "bi-kanban",
        pageName: "Instapaper",
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>
    },
    {
        path: "/homeView",
        icon: "bi-kanban",
        pageName: "HomeView",
        sidebar: () => <div>homeView!</div>,
        main: () => <h2>homeView TMP</h2>
    },
    {
        path: "/shoelaces",
        icon: "bi-kanban",
        pageName: "Shoelaces",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
]

const App: React.FC = () => {
    return (
        <Router>
            <Sidebar routes={routes}/>
            <div className="main">
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Container>
                                <SlateView />
                            </Container>
                        </Route>
                        <Route path="/bubblegum">
                            <Container>
                                <InstapaperView />
                            </Container>
                        </Route>
                        <Route path="/homeView">
                            <Container>
                                <HomeView />
                            </Container>
                        </Route>
                        <Route path="/shoelaces">
                            <Container>
                                <NotionView/>
                            </Container>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

export default App;
