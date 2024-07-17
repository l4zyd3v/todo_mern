import React, { useState } from "react";
import axios from "axios";
import s from "./todocard.module.css";
import { TodoCardInterface } from "../../types";
import TodoIcon from "./components/Icon/TodoIcon";

const TodoCard: React.FC<TodoCardInterface> = ({
  _id,
  title,
  description,
  color,
  completed,
}) => {
  const [startTouchPosition, setStartTouchPosition] = useState(0);
  const [currentTouchPosition, setCurrentTouchPosition] = useState(0);
  const [deletionThresholdReached, setDeletionThressHoldReached] =
    useState(false);
  const [deleteAnimationActive, setDeletionAnimationActive] = useState(false);
  const [isRemoveAfterAnimation, setIsRemoveAfterAnimation] = useState(false);

  const trashIcon = "\u{1F5D1}";

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDifference = e.touches[0].clientX - startTouchPosition;
    const isOutOfBounds = touchDifference > 80 || touchDifference < 0;
    const isDeletionBound = touchDifference > 65;

    setCurrentTouchPosition(touchDifference);

    if (isOutOfBounds) {
      return;
    }

    setDeletionThressHoldReached(isDeletionBound);

    if (isDeletionBound) {
      deleteTodoCard();
    }
  };

  const handleTouchEnd = () => {
    if (deletionThresholdReached) {
      setDeletionAnimationActive(true);
    }
  };

  const handleAnimationEnd = () => {
    setIsRemoveAfterAnimation(true);
  };

  const deleteTodoCard = () => {
    // Implement deletion logic here
  };

  return (
    <div
      className={`${s.card} ${deleteAnimationActive ? s.animateCardAway : ""} ${isRemoveAfterAnimation ? s.removeCardAfterAnim : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onAnimationEnd={handleAnimationEnd}
      style={{ marginLeft: `${currentTouchPosition}px` }}
    >
      <TodoIcon color={color} />
      {deletionThresholdReached && (
        <span
          className={`${s.trash_icon} ${deleteAnimationActive ? s.remove_trash_icon : ""}`}
        >
          {trashIcon}
        </span>
      )}
      {title}
    </div>
  );
};

export default TodoCard;
