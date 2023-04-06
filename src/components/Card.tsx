import { Button } from "./Button";
import { FC } from "react";

interface Props {
  content: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClick2: React.MouseEventHandler<HTMLButtonElement>;
}
export const Card: FC<Props> = (props) => {
  const { content, onClick, onClick2 } = props;
  return (
    <div className="w-full bg-teal-900 shadow-sm hover:shadow-lg hover:shadow-white shadow-slate-50 hover:-translate-y-0.5 duration-200">
      <figure className=" py-5 bg-teal-400 text-slate-50 flex justify-center">
        <h2 className="card-title font-bold text-3xl text-white ">TASK</h2>
      </figure>
      <div className="p-5 items-center text-center">
        <div className=" text-slate-50 rounded-sm text-center items-center h-20 md:h-24 w-full flex align-middle justify-center">
          <h2 className="card-title">{content}</h2>
        </div>
        <div className=" grid grid-cols-2 gap-2 mt-5">
          <Button
            label="Detail"
            className=" py-2 text-sm rounded-md bg-blue-500  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold mt-1 mb-1 p-1  "
            onClick={onClick}
          />

          <Button
            label="Delete"
            className="py-2 text-sm rounded-md bg-rose-700  hover:-translate-y-0.5 hover:scale-105 hover:drop-shadow-md duration-300  text-slate-50 uppercase font-bold mt-1 mb-1 p-1  "
            onClick={onClick2}
          />
        </div>
      </div>
    </div>
  );
};
