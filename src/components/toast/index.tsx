import { useToastContext } from "./provider";
import { useFade } from "../../hooks/useFade";
import toastStyles from "./style.module.css";
import { useEffect } from "react";

export const Toast: React.FC = () => {
  const { isToastOpen, toastType, closeToast } = useToastContext();
  const { display, isFadingOut } = useFade(isToastOpen, 2000);

  useEffect(() => {
    if (!isToastOpen) return;

    const timerId = window.setTimeout(() => {
      closeToast();
    }, 3000);

    return () => clearTimeout(timerId);
  }, [isToastOpen, closeToast]);

  if (!display) return null;

  return (
    <div className={toastStyles.toastContainer}>
      <div
        className={`${toastStyles.toast} ${toastStyles[toastType]}
        ${display ? toastStyles.show : ""} 
        ${isFadingOut ? toastStyles.hidden : ""} 
        `}
      >
        {toastType === "success" ? "成功しました！" : "エラーが発生しました"}
      </div>
    </div>
  );
};
