import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {
    return (
        <div className="App">
            <Todolist/>
            <Todolist/>
            <Todolist/>
            <input type="checkbox"/>
            <input type="date"/>
            <input placeholder={'IT-incubator'} />
        </div>
    );
}

export default App;
