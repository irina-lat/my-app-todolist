import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import cl from "./Toodolist.module.css"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (newId: string, value: boolean) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')
    console.log(newTitle)

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    // const allChangeFilter=()=>{
    //     props.changeFilter("all")
    // }
    //
    // const activeChangeFilter=()=>{
    //     props.changeFilter("active")
    // }
    //
    // const completedChangeFilter=()=>{
    //     props.changeFilter("completed")
    // }
    const tsarChangeFilter = (valueFilter: FilterValuesType) => {
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    function onChangeHandlerInput(newId: string, checkboxValue: boolean) {
        props.changeIsDone(newId, checkboxValue )
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? cl.error : ''}
                       onKeyDown={onKeyDownHandler}
                       value={newTitle}
                       onChange={onChangeHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={cl.errorMessage}>{error}</div>}
            </div>

            <ul>
                {props.tasks.map(t => {
                        // function onChangeHandlerInput(event: ChangeEvent<HTMLInputElement>) {
                        //     props.changeIsDone(t.id, event.currentTarget.checked)
                        // }

                        return (
                            <li key={t.id}>
                                <input onChange={(event: ChangeEvent<HTMLInputElement>)=>onChangeHandlerInput(t.id, event.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => removeTaskHandler(t.id)}>x</button>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <button className={props.filter==='all' ? cl.activeFilter : ''} onClick={() => tsarChangeFilter('all')}>All</button>
                <button className={props.filter==='active' ? cl.activeFilter : ''} onClick={() => tsarChangeFilter('active')}>Active</button>
                <button className={props.filter==='completed' ? cl.activeFilter : ''} onClick={() => tsarChangeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
