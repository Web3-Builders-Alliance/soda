import { FC } from "react";

export const NewItem: FC<any> = ({ onClick }) => (
  <div
    className="flex p-5 m-5 border w-32 h-48 rounded-md border-neutral-700 border-b-2 border-r-2 bg-neutral-900 justify-center items-center text-green-400 font-bold text-4xl hover:border-r-4 hover:border-b-4 hover:bg-green-600 hover:text-green-200 hover:text-6xl cursor-pointer"
    onClick={onClick}
  >
    +
  </div>
);
