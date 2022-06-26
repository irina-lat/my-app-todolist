import React from "react";

export function Todolist() {
    return (
        <div>
            <h3>What to learn</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                <li><input type="checkbox" checked={true}/><span>Html&Css</span></li>
                <li><input type="checkbox" checked={true}/><span>Js</span></li>
                <li><input type="checkbox" checked={false}/><span>React</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complited</button>
            </div>
        </div>
    );
}