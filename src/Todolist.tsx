import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import cl from "./Toodolist.module.css"
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
                <button onClick={removeTodolist}>x</button>
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
                                <input onChange={onChangeStatusHandler} type="checkbox" checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <button className={props.filter === 'all' ? cl.activeFilter : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? cl.activeFilter : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? cl.activeFilter : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

