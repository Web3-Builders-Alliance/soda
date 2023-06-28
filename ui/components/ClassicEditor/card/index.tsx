import { FC } from "react";

export const Card: FC<any> = ({name, onClick}) => (
    <div
      className="flex p-5 m-5 border w-32 h-48 rounded-md border-neutral-700 border-b-2 border-r-2 bg-neutral-900 justify-center text-yellow-400 font-thin hover:border-r-4 hover:border-b-4 hover:bg-black hover:text-green-200 hover:border-green-200 cursor-pointer"
      onClick={onClick}
    >
      <p className="overflow-hidden break-words">{name}</p>
    </div>
  );