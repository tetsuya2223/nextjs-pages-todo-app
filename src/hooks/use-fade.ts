import { useState, useEffect } from "react";

/**
 * 1回のアニメーション周期が完了するまでの所要時間よりもアンマウント時間は短く設定する
 * @example
 * - animation-duration : 250s
 * - unMountTime : 240s
 */
export const useFade = (isVisible: boolean, unMountTime?: number) => {
  const [display, setDisplay] = useState(isVisible);

  useEffect(() => {
    /** 表示時の処理 */
    if (isVisible) {
      setDisplay(isVisible);
      return;
    }

    /** 非表示時の処理、アニメーション実行後dom破棄 */
    const time = unMountTime ?? 250;
    const timer = window.setTimeout(() => setDisplay(isVisible), time);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return { display };
};
