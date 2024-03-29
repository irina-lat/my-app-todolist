import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
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

    const changeStatus = (id: string, value: boolean, todolistId: string) => {
        const tasks = taskObj[todolistId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = value
        }
        setTask({...taskObj})
    }

    function changeTasksTitle(id: string, newTitle: string, todolistId: string) {
        const tasks = taskObj[todolistId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.title = newTitle
        }
        setTask({...taskObj})
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist (todolistId: string) {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete taskObj[todolistId]
        setTask({...taskObj})
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const todolist = todolists.find(f => f.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
        }
        setTodolists([...todolists])
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: todolistId1, title: title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTask({...taskObj, [todolist.id]: []})
    }


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForTodolist = taskObj[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
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
                                        changeTasksTitle={changeTasksTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    )
}

export default App;
