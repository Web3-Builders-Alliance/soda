import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"

export const Card: FC<any> = ({name, onClick, deleteItem}) => (
    <div
      className="relative flex p-5 pt-7 m-5 border w-32 h-48 rounded-lg border-border bg-inputs justify-center text-yellow font-thin hover:bg-backg hover:text-green hover:border-green cursor-pointer"
      onClick={onClick}
    >
      <TrashIcon onClick={deleteItem} className="absolute text-chok top-2 right-2 w-4 h-4 hover:text-red" />
      <p className="overflow-hidden text-justify mt-2 break-words">{name}</p>
    </div>
  );