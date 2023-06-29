import { FC } from "react";

export const NewItem: FC<any> = ({ onClick }) => (
  <div
    className="flex p-5 m-5 w-32 h-48 rounded-md bg-inputs justify-center items-center text-green font-bold text-4xl hover:ring-2 ring-border hover:bg-backg hover:text-green hover:text-6xl cursor-pointer"
    onClick={onClick}
  >
    +
  </div>
);
