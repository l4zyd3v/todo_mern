import { useEffect, useState, useRef } from "react";
import s from "./app.module.css";
import TodoCard from "./components/TodoCart/TodoCard";
import axios from "axios";
import anime, { AnimeInstance } from "animejs";
import { Todo } from "./types/todo";

const host = "192.168.1.207";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [touchStartY, setTouchStartY] = useState(0);
  const [animCreationThreshold, setAnimCreationThreshold] = useState(0);
  const [createNewTodo, setCreateNewTodo] = useState(false);

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

  // useEffect(() => {
  // animation.current = anime({
  //   targets: "#createNewTodoBox",
  //   translateY: -440,
  // });
  // }, []);
  const animation = useRef<AnimeInstance | null>(null);

  function startAnimation() {
    animation.current = anime({
      targets: "#createNewTodoBox",
      top: "25vh",
      borderRadius: "0%",
      width: "90vw",
    });
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchMoved(e.touches[0].clientY);
    setAnimCreationThreshold(-(touchStartY - e.touches[0].clientY));

    setCreateNewTodo(false);
  };

  const handleTouchEnd = () => {
    setCreateNewTodo(false);
    if (animCreationThreshold < -110) {
      startAnimation();
      console.log("hello");
      setCreateNewTodo(true);
    }

    setCreateNewTodo(false);
    if (animCreationThreshold > -110) {
      setAnimCreationThreshold(0);
    }
  };
  console.log(touchMoved);

  const creationAnimationStyle = {
    bottom: `-${animCreationThreshold + 440}px`,
    // width: `125vw`,
    borderTopLeftRadius: `${touchMoved / -10}%`,

    borderTopRightRadius: `${touchMoved / -10}%`,
  };

  return (
    <div className={s.outerWrapper}>
      <div className={s.wrapper}>
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
      <div
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={s.swipeCreateArea}
      >
        {createNewTodo ? (
          <span className={s.createNewTodoMsg}>Create new</span>
        ) : null}
      </div>
    </div>
  );
}

export default App;
