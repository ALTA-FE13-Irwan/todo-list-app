import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-teal-600 to-teal-700 dark:bg-slate-800">
      <div className=" bg-gradient-to-r from-teal-600 to-teal-700 dark:bg-slate-800">
        {props.children}
      </div>
    </div>
  );
};
