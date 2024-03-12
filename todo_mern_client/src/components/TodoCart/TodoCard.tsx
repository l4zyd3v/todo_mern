import s from "./todocart.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../../types/todo.ts";

export default function TodoCard({ _id, description }: Todo) {
  const [touchstart, setTouchstart] = useState(0);
  const [touchmove, setTouchmove] = useState(0);
  const [touchmoveX, setTouchMoveX] = useState(0);
  const [todoId, setTodoId] = useState("");

  // useEffect(() => {
  //    console.log("useeffect");
  //    async function deleteSelected() {
  //      try {
  //        const res = await axios.delete(`http://localhost:3000/todos/${todoId}`);
  //        console.log(res.data);
  //      } catch (error) {
  //        console.log(error);
  //      }
  //    }
  //
  //    deleteSelected();
  //  }, [todoId]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchstart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // console.log("TouchMove", e.touches[0].clientX);
    setTouchMoveX(e.touches[0].clientX - touchstart);

    console.log(touchmoveX);

    if (touchmoveX > 120 || touchmoveX < -120) {
      deleteTodoCard();
    }
  };

  function deleteTodoCard() {
    console.log("Delete");
  }

  return (
    <div
      className={s.wrapper}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ left: `${touchmoveX}px` }}
    >
      {description}
    </div>
  );
}
