import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Button, CardImg} from "reactstrap";
import UrlShortTextEdit from "./components/searchComponent/UrlShortTextEdit";
import Search from "./components/searchComponent/UrlShortTextEdit";

const root = ReactDOM.createRoot(document.getElementById('reactElement'));
root.render(
    <React.StrictMode>
        <UrlShortTextEdit/>
    </React.StrictMode>
);