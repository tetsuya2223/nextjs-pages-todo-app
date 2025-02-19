import toastStyles from "../styles/toast.module.css";

type Props = {
  isOpen: boolean;
  type: "success" | "error";
};

export const Toast: React.FC<Props> = ({ isOpen, type }) => {
  if (!isOpen) return null;

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
