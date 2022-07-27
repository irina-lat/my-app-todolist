import React, {ChangeEvent, useState} from "react";
import cl from "./Toodolist.module.css"

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string)=> void
}

function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle]= useState('')

    const activateEditMode = ()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        editMode
            ? <input value={title} onChange={onChangeTitleHandler} type="text" onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan