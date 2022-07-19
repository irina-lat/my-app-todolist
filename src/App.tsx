import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

// type TodolistsType ={
//     id: number
//     title: number
//     filter: FilterValuesType
// }

function App() {

    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    );


    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeIsDone = (newId: string, value: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone: value} : el))
    }

    const [value, setValue] = useState(false)
    const change = () => {
        setValue(!value)
    }

    // let todolists: Array<TodolistsType> =[
    //     {id: v1(), title: "Whats to learn", filter: "active"},
    //     {id: v1(), title: "What to buy", filter: "completed"}
    // ]

    return (
        <div className="App">
            <Todolist
                filter={filter}
                changeIsDone={changeIsDone}
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />


        </div>
    );
}

export default App;
