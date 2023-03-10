import { FC } from "react";

export const Card: FC<any> = ({name, onClick}) => (
    <div
      className="flex p-5 m-5 border w-32 h-48 border-yellow-700 border-b-2 border-r-2 bg-yellow-300 justify-center text-yellow-700 font-bold hover:border-r-4 hover:border-b-4 hover:bg-yellow-700 hover:text-yellow-300 cursor-pointer"
      onClick={onClick}
    >
      <p className="overflow-hidden break-words">{name}</p>
    </div>
  );