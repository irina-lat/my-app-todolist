import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Whats to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [taskObj, setTask] = useState<TasksStateType>({
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


    const removeTodolist = (todolistId: string)=> {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete taskObj[todolistId]
        setTask({...taskObj})
    }


    function removeTask(id: string, todolistId: string) {
        let tasks = taskObj[todolistId]
        let filteredTasks = taskObj[todolistId].filter((t: any) => t.id != id)
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

    function addTodolist (title: string) {
        let todolist: TodolistType = {id: todolistId1, title: "Whats to learn", filter: "all"}
        setTodolists([todolist, ...todolists])
        setTask({ ...taskObj, [todolist.id] : [] })
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist} />


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
                        removeTodolist={removeTodolist}
                    />)
            })}

        </div>
    )
}

export default App;
