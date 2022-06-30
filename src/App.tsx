import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "ReactJSX", isDone: false}
    ])
    const removeTask = (elid: number) => {
        tasks = tasks.filter((el) => el.id !== elid)
        setTasks(tasks)
        console.log(tasks)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
