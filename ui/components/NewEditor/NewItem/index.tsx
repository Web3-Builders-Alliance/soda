import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/solid"

export const NewItem: FC<any> = ({ name, onClick }) => (
  <div
    className=" bg-[#102042] rounded-xl py-4 px-6 self-end text-white cursor-pointer"
    onClick={onClick}
  >
    <input
      className="bg-inputs"
      type="text" name="" id="" placeholder={`add ${name} name`}
    />
    <PlusIcon 
      
    />
  </div>
);
