import { useEffect, useState, useRef } from "react";
import s from "./app.module.css";
import TodoCard from "./components/TodoCart/TodoCard";
import axios from "axios";
import anime, { AnimeInstance } from "animejs";
import { Todo } from "./types/todo";
import TodoButton from "./components/TodoButton/TodoButton";

const host = "192.168.1.207";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [touchMoved, setTouchMoved] = useState(0);

  useEffect(() => {
    async function getAll() {
      try {
        const res = await axios.get(`http://${host}:3000/todos`);
        console.log(res.data);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAll();
  }, []);

  const animation = useRef<AnimeInstance | null>(null);

  function startAnimation() {
    animation.current = anime({
      targets: "#createNewTodoBox",
      top: "25vh",
      borderRadius: "0%",
      width: "90vw",
    });
  }

  return (
    <div className={s.mainWrapper}>
      <div className={s.cardWrapper}>
        {todos.map((todo) => {
          return (
            <TodoCard
              key={todo._id}
              _id={todo._id}
              description={todo.description}
            />
          );
        })}
      </div>
      <TodoButton />
    </div>
  );
}

export default App;
