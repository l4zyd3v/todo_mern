import { useEffect, useState, useRef, useContext } from "react";
import { NavToggleContext } from "../../context/NavToggleContext.tsx";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import s from "./home.module.css";
import axios from "axios";
// importanime, { AnimeInstance } from "animejs";
import { TodoCardInterface, CategoryCardInterface } from "../../types";
import {
  TodoCard,
  NewTodoBtn,
  TodoModal,
  CategoriesCard,
  Header,
  Nav,
} from "../../components";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Home() {
  const [tasks, setTasks] = useState<TodoCardInterface[]>([]);
  const [user, setUser] = useState<UserProfile[]>([]);
  const [categories, setCategories] = useState<CategoryCardInterface[]>([]);
  const [modalVisibility, setModalVisibility] = useState<null | boolean>(null);
  const { toggleNav, setToggleNav } = useContext(NavToggleContext);
  const { userLoggedIn, setUserLoggedIn } = useContext(UserLoggedInContext);
  const navigate = useNavigate();

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
      const res = await axios.get(
        `http://${import.meta.env.VITE_HOSTURL}:3000/${endpoint}`,
        {
          withCredentials: true,
        },
      );
      console.log(endpoint, res.data);
      setState(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_HOSTURL}:3000/auth/logincheck`,
          {
            withCredentials: true,
          },
        );
        if (!response.data.loggedIn) {
          setUserLoggedIn(false);
          navigate("/login");
        }
      } catch (error) {
        setUserLoggedIn(false);
        console.error(error);
      }
    };

    checkUserLoggedIn();
  }, [navigate]);

  useEffect(() => {
    console.log("userloggedin: ", userLoggedIn);
    if (!userLoggedIn) return;
    fetchIt("users", setUser);
    fetchIt("tasks", setTasks);
    fetchIt("categories", setCategories);
  }, [userLoggedIn]);

  // const animation = useRef<AnimeInstance | null>(null);

  // function startAnimation() {
  //   animation.current = anime({
  //     targets: "#createNewTodoBox",
  //     top: "25vh",
  //     borderRadius: "0%",
  //     width: "90vw",
  //   });
  // }

  function getTaskColorRelatedToCategory(
    taskCategoryId: string | undefined,
    categories: CategoryCardInterface[],
  ) {
    for (let category of categories) {
      if (category._id === taskCategoryId) {
        return category.color;
      }
    }
  }

  function getTaskAmountRelatedToCategory(categoryId: string) {
    let taskAmount = [];
    for (let i = 0; i < tasks.length; i++) {
      const taskCategoryId = tasks[i].categoryId;

      if (taskCategoryId === categoryId) {
        taskAmount.push(taskCategoryId);
      }
    }

    return taskAmount.length;
  }

  // **This is for deleting a task**
  // const handleDelete = (taskId: string) => {
  //   setTasks(tasks.filter((task) => task._id !== taskId));
  // };

  function handleIsCompleteSingleTask(
    changedTaskId: string,
    changedTaskCompletion: boolean,
  ) {
    setTasks(
      tasks.map((task) =>
        task._id === changedTaskId
          ? { ...task, completed: changedTaskCompletion }
          : task,
      ),
    );
  }

  return (
    <>
      <div
        className={`${s.mainWrapper} ${toggleNav ? s.mainWrapperNavOpen : s.mainWrapperNavClosed}`}
        onClick={() => {
          toggleNav && setToggleNav(false);
        }}
      >
        <Header />
        <h1 className={s.heading1}>What's up, {user[0]?.username} </h1>
        <div className={s.categoriesWrapper}>
          <h2 className={s.categoriesHeading}>categories</h2>
          <div className={s.categoriesScrollWrapper}>
            {categories.map((category) => {
              const { _id, name, color, userId } = category;

              const taskAmountOfCategory = getTaskAmountRelatedToCategory(
                category._id,
              );

              return (
                <CategoriesCard
                  key={_id}
                  _id={_id}
                  name={name}
                  color={color}
                  userId={userId}
                  taskAmountOfCategory={taskAmountOfCategory}
                  tasks={tasks}
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
              const { _id, title, description, categoryId, completed } = task;

              const categoryColor = getTaskColorRelatedToCategory(
                categoryId,
                categories,
              );
              return (
                <SwiperSlide key={task._id} className={s.swiperSlide}>
                  <TodoCard
                    _id={task._id}
                    title={task.title}
                    description={task.description}
                    color={categoryColor}
                    completed={completed}
                    // **This is for deleting a task**
                    // onDelete={handleDelete}
                    onComplete={handleIsCompleteSingleTask}
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
          categories={categories}
        />
        {modalVisibility && (
          <div
            onClick={() => setModalVisibility(false)}
            className={s.modalBackground}
          ></div>
        )}
      </div>
      <Nav
        firstname={user[0]?.credentials.firstName}
        lastname={user[0]?.credentials.lastName}
      />
    </>
  );
}
