import buttonStyles from "./button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "tertiary";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "tertiary",
  type = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${buttonStyles.button} ${buttonStyles[variant]}`}
    >
      {props.children}
    </button>
  );
};
