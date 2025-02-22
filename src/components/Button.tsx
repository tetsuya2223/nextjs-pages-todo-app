type Props = {
  type: "primary" | "secondary" | "tertiary";
  text: string;
};

export const Button: React.FC<Props> = ({ type, text }) => {
  return <button className={`button-${type}`}>{text}</button>;
};
