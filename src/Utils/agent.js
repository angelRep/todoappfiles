const URL = "http://localhost:3001";

function jsonDataOrThrowError(res) {
    if (!res.ok) {
        throw new Error("Something went wrong")
    }
    return res.json();
}

const TODOS = {
    getAllTodos: () => fetch(`${URL}/todos`).then(jsonDataOrThrowError),
    getTodoByID: (todoID) => fetch(`${URL}/todos/${todoID}`).then(jsonDataOrThrowError),
    createNewTodo:  (text, isDone) => fetch(`${URL}/todos`, {
        method: "POST",
        body: JSON.stringify({  text, isDone }),
        headers:{
            "Content-Type": "application/json"
        }
    }
    ).then(jsonDataOrThrowError),
    updateTodo:  (todoID, text, isDone) => fetch(`http://localhost:3001/todos/${todoID}`, {
        method: "PUT",
        body: JSON.stringify({  text, isDone }),
        headers:{
            "Content-Type": "application/json"
        }
    }
    ).then(jsonDataOrThrowError),
    deleteTodo: (todoID) => fetch(`${URL}/todos/${todoID}`, { method: "DELETE" }).then(jsonDataOrThrowError)
}

export default {
    TODOS
}