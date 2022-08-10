import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import cl from "./Toodolist.module.css";
import {ControlPoint} from "@material-ui/icons";

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
            <TextField
                variant={'outlined'}
                label={'Type Value'}
                onKeyDown={onKeyDownHandler}
                value={newTitle}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}

export default AddItemForm