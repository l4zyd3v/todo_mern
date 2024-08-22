import ReactDOM from "react-dom";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import { NavToggleContext } from "../../context/NavToggleContext.tsx";
import { UserLoggedInContext } from "../../context/UserLoggedInContext";
import { DataContext } from "../../context/DataContext";
import s from "./home.module.scss";
import axios from "axios";
// importanime, { AnimeInstance } from "animejs";
import {
  TodoCardInterface,
  CategoriesInterface,
  TasksInterface,
} from "../../types";
import {
  TodoCard,
  NewTaskBtn,
  CategoriesCard,
  Header,
  Nav,
} from "../../components";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import TaskCreateModal from "../../modals/formModal/TaskCreateModal/TaskCreateModal";
import TaskConfigureModal from "../../modals/formModal/TaskConfigureModal/TaskConfigureModal";
import CategoryModal from "../../modals/formModal/categoryModal/CategoryModal.tsx";
import SwiperTasksSlides from "../../components/SwiperTasksSLides/SwiperTasksSlides.tsx";

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

export default function Home() {
  const [user, setUser] = useState<UserProfile[]>([]);
  const [modalVisibility, setModalVisibility] = useState<null | boolean>(null);
  const [taskConfigureVisibility, setTaskConfigureVisibility] = useState<
    null | boolean
  >(null);
  const { categories, setCategories, tasks, setTasks, selectedTask } =
    useContext(DataContext);
  const { toggleNav, setToggleNav } = useContext(NavToggleContext);
  const { userLoggedIn, setUserLoggedIn, setUserId } =
    useContext(UserLoggedInContext);

  const navigate = useNavigate();

  // console.log("!!!!!!!!! selectedTask, completed: ", selectedTask?.completed);

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
        } else {
          setUserLoggedIn(true);
          setUserId(response.data.userId);
        }
      } catch (error) {
        setUserLoggedIn(false);
        navigate("/login");
        console.error(error);
      }
    };

    checkUserLoggedIn();
  }, [navigate]);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
      return;
    }

    fetchIt("users", setUser);
    fetchIt<TasksInterface>("tasks", setTasks);
    fetchIt<CategoriesInterface>("categories", setCategories);
  }, [userLoggedIn]);

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
      setState(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // const animation = useRef<AnimeInstance | null>(null);

  // function startAnimation() {
  //   animation.current = anime({
  //     targets: "#createNewTodoBox",
  //     top: "25vh",
  //     borderRadius: "0%",
  //     width: "90vw",
  //   });
  // }

  // **This is for deleting a task**
  // const handleDelete = (taskId: string) => {
  //   setTasks(tasks.filter((task) => task._id !== taskId));
  // };

  function getMainClassName(toggleNav: boolean) {
    return `${s.main} ${toggleNav ? s.mainNavOpen : ""}`;
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

  function renderCategories() {
    return categories.map((category) => {
      const { _id, name, color, userId } = category;
      const taskAmountOfCategory = getTaskAmountRelatedToCategory(category._id);
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
    });
  }

  // function getTaskColorRelatedToCategory(
  //   taskCategoryId: string | undefined,
  //   categories: CategoriesInterface[],
  // ) {
  //   for (let category of categories) {
  //     if (category._id === taskCategoryId) {
  //       return category.color;
  //     }
  //   }
  // }

  // function renderTasks() {
  //   return [...tasks].reverse().map((task) => {
  //     const { _id, title, description, categoryId, completed } = task;
  //
  //     const categoryColor = getTaskColorRelatedToCategory(
  //       categoryId,
  //       categories,
  //     );
  //
  //     return (
  //       <SwiperSlide key={task._id} className={s.cardWrapper__swiperSlide}>
  //         <TodoCard
  //           _id={_id}
  //           title={title}
  //           description={description}
  //           color={categoryColor}
  //           completed={completed}
  //           setTaskConfigureVisibility={setTaskConfigureVisibility}
  //           taskConfigureVisibility={taskConfigureVisibility}
  //         />
  //       </SwiperSlide>
  //     );
  //   });
  // }

  return (
    <>
      <main
        className={getMainClassName(toggleNav)}
        onClick={() => {
          toggleNav && setToggleNav(false);
        }}
      >
        <Header />
        <h1 className={s.main__heading1}>What's up, {user[0]?.username} </h1>
        <div className={s.categoriesWrapper}>
          <h2 className={s.categoriesWrapper__Heading}>categories</h2>
          <div className={s.categoriesWrapper__ScrollWrapper}>
            {renderCategories()}
          </div>
        </div>

        <div className={s.cardWrapper}>
          <h2 className={s.cardWrapper__heading}>today's tasks</h2>
          <SwiperTasksSlides
            setTaskConfigureVisibility={setTaskConfigureVisibility}
            taskConfigureVisibility={taskConfigureVisibility}
            s={s}
          />
        </div>

        <NewTaskBtn setModal={setModalVisibility} />

        <TaskCreateModal
          visibility={modalVisibility}
          setVisibility={setModalVisibility}
        />

        <TaskConfigureModal
          visibility={taskConfigureVisibility}
          setVisibility={setTaskConfigureVisibility}
        />

        {(modalVisibility || taskConfigureVisibility) && (
          <div
            onClick={() => {
              setModalVisibility(false);
              setTaskConfigureVisibility(false);
            }}
            className={s.main__modalBackground}
          ></div>
        )}
      </main>

      <Nav
        firstname={user[0]?.credentials.firstName}
        lastname={user[0]?.credentials.lastName}
      />
    </>
  );
}
