import './App.css';
import React from 'react';
import TodosCard from './Components/TodosCard';
import {ClipLoader} from "react-spinners";
import agent from './Utils/agent';
import { useQuery } from 'react-query';
import CreateTodoFormik from './Components/CreateTodoFormik';

function App() {
  const todosFetch = useQuery("todos" ,agent.TODOS.getAllTodos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODOS APP</h1>
      </header>
      <CreateTodoFormik />
      <div>
        {todosFetch.isFetching &&(
          <ClipLoader />
        )}

        {todosFetch.isLoading ? (
          <ClipLoader/>
        ) : todosFetch.isError ? (
          <p>{todosFetch.error}</p>
          ) : todosFetch.data.map((todo) => (
          <TodosCard key={todo._id} text={todo.text} isDone={todo.isDone} todoID={todo._id}/>
        ))}
      </div>
    </div>
  );
}

export default App;
