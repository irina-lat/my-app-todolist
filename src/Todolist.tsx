import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import cl from "./Toodolist.module.css"
import AddItemForm from "./AddItemForm";

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
    changeStatus: (newId: string, value: boolean, todolistId: string) => void
    removeTodolist: (todolistID: string) => void
    // addTask: (title: string)=> void
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

    function onChangeHandlerInput(newId: string, checkboxValue: boolean) {
        props.changeStatus(newId, checkboxValue, props.id)
    }

    let addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {
                        const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
                            onChangeHandlerInput(t.id, event.currentTarget.checked)
                        return (
                            <li key={t.id} className={t.isDone ? cl.isDone : ''}>
                                <input onChange={onChangeInput} type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => removeTaskHandler(t.id)}>x</button>
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

