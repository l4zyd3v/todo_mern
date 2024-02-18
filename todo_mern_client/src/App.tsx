import React, { useEffect, useState } from "react";
import s from "./app.module.css";
import TodoCard from "./components/TodoCart.tsx/TodoCard";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getAll() {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        console.log(res.data);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAll();
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        {todos.map((todo: any) => {
          return (
            <TodoCard key={todo._id} id={todo._id} desc={todo.description} />
          );
        })}
      </div>
    </>
  );
}

export default App;
