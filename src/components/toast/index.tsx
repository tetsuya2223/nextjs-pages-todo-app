import { useState, useEffect } from "react";
import toastStyles from "../styles/toast.module.css";

type Props = {
  isOpen: boolean;
  type: "success" | "error";
};

export const Toast: React.FC<Props> = ({ isOpen, type }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer); // 不要なタイマーが残らないようにクリーンアップ。
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`${toastStyles.toast} ${
        type === "success" ? toastStyles.toastSuccess : toastStyles.toastError
      }`}
    >
      <p>{type === "success" ? "成功しました！" : "失敗しました"}</p>
    </div>
  );
};
