import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import cl from "./Toodolist.module.css"
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete } from '@material-ui/icons';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeStatus: (id: string, value: boolean, todolistId: string) => void
    removeTodolist: (todolistID: string) => void
    changeTasksTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    let addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {

                        const onClickHandler = () => removeTaskHandler(t.id)

                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, event.currentTarget.checked, props.id)
                        }

                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTasksTitle(t.id, newTitle, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? cl.isDone : ''}>
                                {/*<input onChange={onChangeStatusHandler} type="checkbox" checked={t.isDone}/>*/}
                                <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>
                            </li>
                        )}
                )}
            </ul>

            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

