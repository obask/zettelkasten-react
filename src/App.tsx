import React from 'react';
import Container from 'react-bootstrap/Container';
import Sidebar from "./components/Sidebar";

import {Route, BrowserRouter, Routes} from "react-router-dom";
import InstapaperView from "./pages/InstapaperView";
import NotionView from "./pages/NotionView";
import SlateView from "./pages/SlateView";
import HomeView from "./pages/HomeView";
import CheckLists from "./pages/CheckLists";
import LexicalEditorView from "./pages/LexicalEditorView";
import RtfEditor from "./lexi/RtfEditor";

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
        path: "checkLists",
        icon: "bi-kanban",
        pageName: "CheckLists",
        sidebar: () => <div>CheckLists!</div>,
        main: () => <h2>CheckLists</h2>
    },
    {
        path: "lexicalEditor",
        icon: "bi-kanban",
        pageName: "LexicalEditor",
        sidebar: () => <div>LexicalEditor!</div>,
        main: () => <h2>LexicalEditor</h2>
    },
    {
        path: "rtfEditor",
        icon: "bi-kanban",
        pageName: "RtfEditor",
        sidebar: () => <div>RtfEditor!</div>,
        main: () => <h2>RtfEditor</h2>
    },
]

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Sidebar routes={routes}/>
            <div style={{marginLeft: '160px', paddingTop: '10px'}}>
                <Routes>
                    <Route path="xuz" element={<Container>
                        <SlateView/>
                    </Container>}/>
                    <Route path="bubblegum" element={<Container>
                        <InstapaperView/>
                    </Container>}/>
                    <Route path="homeView" element={<Container>
                        <HomeView/>
                    </Container>}/>
                    <Route path="checkLists" element={<Container>
                        <CheckLists/>
                    </Container>}/>
                    <Route path="lexicalEditor" element={<Container>
                        <LexicalEditorView/>
                    </Container>}/>
                    <Route index element={<Container>
                        <RtfEditor/>
                    </Container>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
};

export default App;
