import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import styles from "./Components.module.css";
import DeleteTodoButton from "./DeleteTodoButton";
import EditTodoForm from "./EditTodoForm";

export default function TodosCard({text, isDone, todoID}) {   
    const [showEdit, setShowEdit] = useState(false);
    return (
        <div className={styles.todoCard}>
            <button type="button" onClick={() => setShowEdit(!showEdit)}>
                Edit <FaPencilAlt />
            </button>
            <DeleteTodoButton todoID={todoID}/>
            {showEdit ? (
                <EditTodoForm 
                    onFinish={() => setShowEdit(false)}
                    todoID={todoID} initialText= {text} initialIsDone={isDone}/>
            ): (
                <div>
                    <h4>{text}</h4>
                    <p>{isDone ? "Done" : "Ongoing"}</p>
                </div>
            )}
        </div>
    );
}