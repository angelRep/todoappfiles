import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import agent from "../Utils/agent";
import styles from "./Components.module.css";

export default function EditTodoForm({ todoID, initialText, initialIsDone, onFinish}) {
    const [text, setText] = useState(initialText);
    const [isDone, setIsDone] = useState(initialIsDone);

    const queryClient = useQueryClient();
    const {mutate, isLoading} = useMutation((values) => 
    agent.TODOS.updateTodo(values.todoID, values.text, values.isDone), {
        onSuccess: (res) => {
            onFinish();
            queryClient.invalidateQueries("todos");
        }
    });

    function formSubmit(ev){
        ev.preventDefault();
        if(!isLoading) {
            mutate({ todoID, text, isDone });
        }
    }

    return (
        <form className={styles.form} onSubmit={formSubmit}>
            <label htmlFor="text">Text</label>
            <input name="text" value={text} onChange={(ev) => setText(ev.target.value)} />
            <label htmlFor="isDone">Done</label>
            <input type="checkbox" name="isDone" checked={isDone} onChange={(ev) => setIsDone(ev.target.checked)} />
            <button type="submit">
                {isLoading ? (
                    <ClipLoader size="0.5rem"/>
                ) : "Save"}
            </button>
            <button type="button" onClick={onFinish}>Cancel</button>
        </form>
    )
}