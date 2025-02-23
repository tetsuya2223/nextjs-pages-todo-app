import buttonStyles from "./button.module.css";
type Props = {
  buttonType: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary"; //?: 使用しなくても良い
  text: string;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  buttonType,
  variant = "tertiary", // 指定しなければ"tertiary"
  text,
  onClick,
}) => {
  return (
    <button
      type={buttonType}
      className={`${buttonStyles.button} ${buttonStyles[`button-${variant}`]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
