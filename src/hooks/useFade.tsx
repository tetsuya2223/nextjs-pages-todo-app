import { useEffect, useState } from "react";

export const useFade = (isOpen: boolean, fadeDuration: number = 250) => {
  const [display, setDisplay] = useState(isOpen);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDisplay(true);
      setIsFadingOut(false);
    } else {
      if (display) {
        setIsFadingOut(true);

        const timerId = setTimeout(() => {
          setDisplay(false);
        }, fadeDuration);
        return () => clearTimeout(timerId);
      }
    }
  }, [isOpen, fadeDuration]);

  return { display, isFadingOut };
};
