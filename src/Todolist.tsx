import React, {useState} from "react";


type todolistType = {
    title: string,
    tasks: tasks1Type[],
    removeTask: (elid: number) => void,
}

type tasks1Type = {
    id: number,
    title: string,
    isDone: boolean
}

export function Todolist(props: todolistType) {

    const [filterValue, setFilterValue] = useState('all')

    let filtredTasks = props.tasks

    if (filterValue === 'Active') {
        filtredTasks = props.tasks.filter(el => el.isDone)
    }

    if (filterValue === 'Complited') {
        filtredTasks = props.tasks.filter(el => !el.isDone)
    }

    const changeTasksFilter = (buttonName: string) => {
        setFilterValue(buttonName)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                {filtredTasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>x</button>
                            {/*<button onClick={()=>(props.removeTask())} >x</button>*/}
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeTasksFilter('All')}>All</button>
                <button onClick={() => changeTasksFilter('Active')}>Active</button>
                <button onClick={() => changeTasksFilter('Complited')}>Complited</button>
            </div>
        </div>
    );
}