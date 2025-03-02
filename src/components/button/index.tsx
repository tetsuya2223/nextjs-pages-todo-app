import { ComponentProps, ReactNode } from "react";
import buttonStyles from "./style.module.css";

type ButtonProps = {
  /** @default "tertiary" */
  variant?: "primary" | "secondary" | "tertiary";
  /** @default "button" */
  type?: ComponentProps<"button">["type"];
  children: ReactNode;
} & Omit<ComponentProps<"button">, "type" | "className" | "children">;

export const Button: React.FC<ButtonProps> = ({
  variant = "tertiary",
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`${buttonStyles.button} ${buttonStyles[variant]}`}
    >
      {children}
    </button>
  );
};
