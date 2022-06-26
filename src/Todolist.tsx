import React from "react";

type todolistType = {
    title: string,
    tasks1: tasks1Type[],
    // tasks2?: tasks2Type[]
}

type tasks1Type = {
    id: number,
    title: string,
    isDone: boolean
}

// type tasks2Type = {
//     id: number,
//     title: string,
//     isDone: boolean
// }

export function Todolist(props: todolistType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                {props.tasks1.map((tasks1Array) => {
                    return (
                        <li key={tasks1Array.id} ><input type="checkbox" checked={tasks1Array.isDone}/><span>{tasks1Array.title}</span></li>
                    )
                })}

                {/*<li><input type="checkbox" checked={true}/><span>Html&Css</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/><span>Js</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/><span>React</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complited</button>
            </div>
        </div>
    );
}