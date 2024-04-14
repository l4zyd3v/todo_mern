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

export { handleTouchStart, handleTouchMove, handleTouchEnd };
