import { useEffect, useState } from "react";

export const useFade = (isVisible: boolean, fadeDuration: number = 250) => {
  const [display, setDisplay] = useState(isVisible);

  useEffect(() => {
    /** 表示時の処理 */
    if (isVisible) {
      setDisplay(isVisible);
      console.log("isVisibleがtrue:", isVisible);
      return;
    }

    /** 非表示時の処理、アニメーション実行後dom破棄 */
    const time = fadeDuration ?? 250;
    const timer = window.setTimeout(() => setDisplay(isVisible), time);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return { display };
};
