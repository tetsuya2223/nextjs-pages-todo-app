import { ComponentProps } from "react";
import buttonStyles from "./style.module.css";

type ButtonProps = {
  /** @default "tertiary" */
  variant?: "primary" | "secondary" | "tertiary";
  /** @default "button" */
  type?: ComponentProps<"button">["type"];
} & Omit<ComponentProps<"button">, "type" | "className">;

export const Button: React.FC<ButtonProps> = ({
  variant = "tertiary",
  type = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`${buttonStyles.button} ${buttonStyles[variant]}`}
    >
      {props.children}
    </button>
  );
};
