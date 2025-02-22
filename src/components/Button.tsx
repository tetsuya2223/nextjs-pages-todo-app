import buttonStyles from "../styles/Home.module.css";

type Props = {
  type: "primary" | "secondary" | "tertiary";
  text: string;
};

export const Button: React.FC<Props> = ({ type, text }) => {
  return (
    <button
      className={`${buttonStyles.button} ${buttonStyles[`button-${type}`]}`}
    >
      {text}
    </button>
  );
};
