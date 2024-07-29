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

  const { categories, setCategories, tasks, setTasks } =
    useContext(DataContext);
  const { toggleNav, setToggleNav } = useContext(NavToggleContext);
  const { userLoggedIn, setUserLoggedIn, setUserId } =
    useContext(UserLoggedInContext);

  const navigate = useNavigate();

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
      console.log("Home.tsx - fetchIt: ", endpoint, res.data);
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

  function getTaskColorRelatedToCategory(
    taskCategoryId: string | undefined,
    categories: CategoriesInterface[],
  ) {
    for (let category of categories) {
      if (category._id === taskCategoryId) {
        return category.color;
      }
    }
  }

  function renderTasks() {
    return [...tasks].reverse().map((task) => {
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
            onComplete={handleIsCompleteSingleTask}
          />
        </SwiperSlide>
      );
    });
  }

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
          <Swiper
            slidesPerView={5}
            spaceBetween={3}
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={s.cardWrapper__swiper}
          >
            {renderTasks()}
          </Swiper>
        </div>

        <NewTodoBtn setModal={setModalVisibility} />
        <TodoModal
          visibility={modalVisibility}
          setVisibility={setModalVisibility}
        />
        {modalVisibility && (
          <div
            onClick={() => setModalVisibility(false)}
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
