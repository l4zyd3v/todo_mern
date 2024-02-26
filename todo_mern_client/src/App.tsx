import { useEffect, useState, useRef } from "react";
import s from "./app.module.css";
import TodoCard from "./components/TodoCart.tsx/TodoCard";
import axios from "axios";
import anime, { AnimeInstance } from "animejs";
import { Todo } from "./types/todo";

const host = "192.168.1.207";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [touchStartY, setTouchStartY] = useState(0);
  const [animCreation, setAnimCreation] = useState(0);
  const [createNewTodo, setCreateNewTodo] = useState(false);

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
  useEffect(() => {
    animation.current = anime({
      targets: "#createNewTodoBox",
      easing: "easeOutExpo",
      autoplay: false,
    });
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setAnimCreation(-(touchStartY - e.touches[0].clientY));

    setCreateNewTodo(false);
    if (animCreation < -110) {
      console.log("hello");
      setCreateNewTodo(true);
    }
  };

  const handleTouchEnd = () => {
    setCreateNewTodo(false);

    setCreateNewTodo(false);
    if (animCreation > -110) {
      setAnimCreation(0);
    }
  };

  const creationAnimationStyle = {
    bottom: `-${animCreation + 440}px`,
    width: `125vw`,
    boxShadow: `0 2px 30px 3px white`,
    // left: "0",
    // right: "0",
    // margin: "auto",
  };

  return (
    <div className={s.outerWrapper}>
      <div
        className={s.wrapper}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
      <div
        style={creationAnimationStyle}
        className={s.creationAnimation}
        id="createNewTodoBox"
      />
      {createNewTodo ? (
        <span className={s.createNewTodoMsg}>Create new</span>
      ) : null}
    </div>
  );
}

export default App;
