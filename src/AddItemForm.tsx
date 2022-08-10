import { Button } from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import cl from "./Toodolist.module.css";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
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


    return (
        <div>
            <input className={error ? cl.error : ''}
                   onKeyDown={onKeyDownHandler}
                   value={newTitle}
                   onChange={onChangeHandler}
            />
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button onClick={addTaskHandler} variant={"contained"} color={"primary"}>+</Button>
            {error && <div className={cl.errorMessage}>{error}</div>}
        </div>
    )
}

export default AddItemForm