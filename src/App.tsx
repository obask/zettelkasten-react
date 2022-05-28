import React from 'react';
import Container from 'react-bootstrap/Container';
import Sidebar from "./components/Sidebar";

import {Route, BrowserRouter, Routes} from "react-router-dom";
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
        path: "bubblegum",
        icon: "bi-kanban",
        pageName: "Instapaper",
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>
    },
    {
        path: "homeView",
        icon: "bi-kanban",
        pageName: "HomeView",
        sidebar: () => <div>homeView!</div>,
        main: () => <h2>homeView TMP</h2>
    },
    {
        path: "shoelaces",
        icon: "bi-kanban",
        pageName: "Shoelaces",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
]

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Sidebar routes={routes}/>
            <div style={{marginLeft: '160px', paddingTop: '10px'}}>
                    <Routes>
                        <Route path="/" element={<Container>
                            <SlateView/>
                        </Container>}/>
                        <Route path="bubblegum" element={<Container>
                            <InstapaperView/>
                        </Container>}/>
                        <Route path="homeView" element={<Container>
                            <HomeView/>
                        </Container>}/>
                        <Route path="shoelaces" element={<Container>
                            <h3>Not implemented...</h3>
                        </Container>} />
                    </Routes>
            </div>
        </BrowserRouter>
    )
};

export default App;
