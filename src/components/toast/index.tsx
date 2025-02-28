import { useFade } from "@/hooks/use-fade";
import { useToastContext } from "./provider";
import toastStyles from "./style.module.css";

export const Toast: React.FC = () => {
  const { isToastOpen, toastType } = useToastContext();

  const { display } = useFade(isToastOpen);

  if (!display) return null;

  return (
    <div
      className={`${toastStyles.toast} ${toastStyles[toastType]} ${
        isToastOpen ? toastStyles.show : toastStyles.close
      }`}
    >
      {/** TODO: Toastの中身のテキストを関数経由で変更できるようにする */}
      {toastType === "success" ? "成功しました！" : "エラーが発生しました"}
    </div>
  );
};
