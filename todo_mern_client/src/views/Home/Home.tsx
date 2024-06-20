import { useEffect, useState, useRef, useContext } from "react";
import { NavToggleContext } from "../../context/NavToggleContext.tsx";
import s from "./home.module.css";
import axios from "axios";
import anime, { AnimeInstance } from "animejs";
import { todoCardInterface, categoryCardInterface } from "../../types";
import {
  TodoCard,
  NewTodoBtn,
  TodoModal,
  CategoriesCard,
  Header,
  Nav,
} from "../../components";

// just for dev purposes:
import hostUrl from "../../hostvar.ts";

export default function Home() {
  const [todos, setTodos] = useState<todoCardInterface[]>([]);
  const [categories, setCategories] = useState<categoryCardInterface[]>([]);

  const [touchMoved, setTouchMoved] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(null);
  const { toggleNav } = useContext(NavToggleContext);

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get(`http://${hostUrl}:3000/todos`);
        console.log(res.data);
        setTodos(res.data);

        // Send data back to the server
        const response = await axios.post(`http://${hostUrl}:3000/log`, {
          message: "Home.tsx requested todos todos route",
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get(`http://${hostUrl}:3000/categories`);
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
    <>
      <div
        className={`${s.mainWrapper} ${toggleNav ? s.mainWrapperNavOpen : ""}`}
      >
        <Header />
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
        <NewTodoBtn setModal={setModalVisibility} />
        <TodoModal
          visibility={modalVisibility}
          setVisibility={setModalVisibility}
        />
      </div>
      <Nav />
    </>
  );
}
