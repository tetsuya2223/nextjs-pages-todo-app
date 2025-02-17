import toastStyles from "../styles/toast.module.css";

type Props = {
  isOpen: boolean;
  message: string;
};

export const Toast: React.FC<Props> = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className={toastStyles.toastContainer}>
      <p>{message}</p>
    </div>
  );
};
