import { useEffect, useState, useRef } from "react";
import s from "./app.module.css";
import TodoCard from "./components/TodoCard/TodoCard";
import axios from "axios";
import anime, { AnimeInstance } from "animejs";
import { todoCardInterface } from "./types/todoCardInterface.ts";
import { categoryCardInterface } from "./types/categoryCardInterface.ts";
import TodoButton from "./components/TodoButton/TodoButton";
import TodoModal from "./components/TodoModal/TodoModal";
import CategoriesCard from "./components/CategoriesCard/CategoriesCard.tsx";

const host = "192.168.1.207";

function App() {
  const [todos, setTodos] = useState<todoCardInterface[]>([]);
  const [categories, setCategories] = useState<categoryCardInterface[]>([]);

  const [touchMoved, setTouchMoved] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(null);

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get(`http://${host}:3000/todos`);
        console.log(res.data);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get(`http://${host}:3000/categories`);
        console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  function userGreetings() {
    const greetings = ["What's up, ", "What's up"];
  }

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
      <h1 className={s.heading1}>What's up, Morten</h1>
      <div className={s.categoriesWrapper}>
        <h2 className={s.categoriesHeading}>categories</h2>
        <div className={s.categoriesScrollWrapper}>
          {categories.map((category) => {
            return (
              <CategoriesCard
                key={category._id}
                _id={category._id}
                description={category.description}
              />
            );
          })}
        </div>
      </div>

      <div className={s.cardWrapper}>
        <h2 className={s.cardsHeading}>today's tasks</h2>
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
      <TodoButton setModal={setModalVisibility} />
      <TodoModal
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
      />
    </div>
  );
}

export default App;
