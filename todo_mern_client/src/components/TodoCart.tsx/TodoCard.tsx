import s from "./todocart.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface TodoCardProps {
  id: string; // This is a string because it is coming from the database(mongoDB)
  desc: string;
}

export default function TodoCard({ id, desc }: TodoCardProps) {
  const [touchstart, setTouchstart] = useState(0);
  const [touchmove, setTouchmove] = useState(0);
  const [touchmoveX, setTouchMoveX] = useState(0);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    async function deleteSelected() {
      try {
        const res = await axios.delete(`http://localhost:3000/todos/${todoId}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    deleteSelected();
  }, [todoId]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchstart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("TouchMove", e.touches[0].clientX);
    setTouchmove(e.touches[0].clientX);
    setTouchMoveX(touchmove - touchstart);
  };

  return (
    <div
      className={s.wrapper}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ left: `${touchmoveX}px` }}
    >
      {desc}
    </div>
  );
}
