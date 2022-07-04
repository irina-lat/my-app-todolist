import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')
    console.log(newTitle)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }


    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyDownHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if (event.key === 'Enter'){
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

    const tsarChangeFilter=(valueFilter:FilterValuesType)=>{
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler=(tID:string)=>{
        props.removeTask(tID)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input  onKeyDown={onKeyDownHandler} value={newTitle} onChange={onChangeHandler}/>
            {/*<input onChange={(event)=>setNewTitle(event.currentTarget.value)}/>*/}
            <button onClick={addTaskHandler}>+</button>
            {/*<button onClick={(event)=>props.addTask()}>+</button>*/}
        </div>
        <ul>
            {props.tasks.map(t => {
                // const removeTaskHandler=()=>{props.removeTask(t.id)}
                return(<li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=>removeTaskHandler(t.id)}>x</button>
                </li>)}
            )}
        </ul>

        {/*<ul>*/}
        {/*    {props.tasks.map(t => <li key={t.id}>*/}
        {/*        <input type="checkbox" checked={t.isDone}/>*/}
        {/*        <span>{t.title}</span>*/}
        {/*        <button onClick={() => {props.removeTask(t.id)}}>x</button>*/}
        {/*    </li>)}*/}
        {/*</ul>*/}


        <div>
            <button onClick={()=>tsarChangeFilter('all')}>All</button>
            <button onClick={()=>tsarChangeFilter('active')}>Active</button>
            <button onClick={()=>tsarChangeFilter('completed')}>Completed</button>
        </div>
    </div>
}
