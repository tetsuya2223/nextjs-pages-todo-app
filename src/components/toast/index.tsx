import { useToastContext } from "./provider";
import toastStyles from "./style.module.css";

export const Toast: React.FC = () => {
  const { isToastOpen, toastType } = useToastContext();

  if (!isToastOpen) return null;

  return (
    <div className={toastStyles.toastContainer}>
      <div className={`${toastStyles.toast} ${toastStyles[toastType]} `}>
        {toastType === "success" ? "成功しました！" : "エラーが発生しました"}
      </div>
    </div>
  );
};
