import React from "react";
import agent from "../Utils/agent";
import { useMutation, useQueryClient } from "react-query";
import { FaTrashAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function DeleteTodoButton({ todoID }) {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation((value) => agent.TODOS.deleteTodo(value), {
        onSuccess: () => {
            let todos = queryClient.getQueryData("todos");
            queryClient.setQueryData("todos",
            todos.filter((item) => item._id !== todoID)
            );
        },
    });

    function deleteTodoCard() {
        console.log("delete");
        if (!isLoading){
            mutate(todoID);
        }
    }

    return (
        <button type="button" onClick={deleteTodoCard}>
            {isLoading ? <ClipLoader size="1rem"/> : <FaTrashAlt color="red" />}
        </button>
    );
}