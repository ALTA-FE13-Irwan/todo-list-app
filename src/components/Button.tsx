import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  clasName: string;
}
export const Button: FC<Partial<Props>> = (props) => {
  const { label, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {" "}
      {label}
    </button>
  );
};
