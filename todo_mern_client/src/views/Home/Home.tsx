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

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// just for dev purposes:
import hostUrl from "../../hostvar.ts";

export default function Home() {
  const [tasks, setTasks] = useState<todoCardInterface[]>([]);
  const [user, setUser] = useState<UserProfile[]>([]);
  const [categories, setCategories] = useState<categoryCardInterface[]>([]);

  const [touchMoved, setTouchMoved] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(null);
  const { toggleNav } = useContext(NavToggleContext);

  // console.log("hello from home.tsx");

  type UserProfile = {
    _id?: string;
    username: string;
    password: string;
    profilePicture?: string;
    credentials: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };

  async function fetchIt<T>(
    endpoint: string,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
  ) {
    try {
      const res = await axios.get(`http://${hostUrl}:3000/${endpoint}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setState(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchIt("users", setUser);
    fetchIt("tasks", setTasks);
  }, []);

  // useEffect(() => {
  //   async function getCategories() {
  //     try {
  //       const res = await axios.get(`http://${hostUrl}:3000/categories`);
  //       console.log(res.data);
  //       setCategories(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   getCategories();
  // }, []);

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

  // console.log(user[0].username);

  return (
    <>
      <div
        className={`${s.mainWrapper} ${toggleNav ? s.mainWrapperNavOpen : ""}`}
      >
        <Header />
        <h1 className={s.heading1}>What's up, {user[0]?.username} </h1>
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
          <Swiper
            slidesPerView={5}
            spaceBetween={3}
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={s.swiper}
          >
            {tasks.map((task) => {
              return (
                <SwiperSlide key={task._id} className={s.swiperSlide}>
                  <TodoCard
                    _id={task._id}
                    title={task.title}
                    description={task.description}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
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
