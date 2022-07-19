import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Whats to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [taskObj, setTask] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Dress", isDone: true}
        ]
    })


    function removeTask(id: string, todolistId: string) {
        let tasks = taskObj[todolistId]
        let filteredTasks = taskObj[todolistId].filter((t: any) => t.id != id)
        // let filteredTasks = taskObj.filter(t => t.id != id)
        taskObj[todolistId] = filteredTasks
        setTask({...taskObj})
    }

    const addTask = (newTitle: string, todolistId: string) => {
        let task = {id: v1(), title: newTitle, isDone: false}
        let tasks = taskObj[todolistId]
        let newTask = [task, ...tasks]
        taskObj[todolistId] = newTask
        setTask({...taskObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (newId: string, value: boolean, todolistId: string) => {
        const tasks = taskObj[todolistId]
        let task = tasks.find(task => task.id === newId)
        if (task) {
            task.isDone = value
        }
        setTask({...taskObj})
    }

    const [value, setValue] = useState(false)
    const change = () => {
        setValue(!value)
    }


    return (
        <div className="App">

            {todolists.map(tl => {

                let tasksForTodolist = taskObj[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        changeStatus={changeStatus}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                    />)
            })}

        </div>
    )
}

export default App;
