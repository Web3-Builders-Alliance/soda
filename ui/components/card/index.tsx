import { FC, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"

export const Card: FC<any> = ({ name, onClick, filter}) => {
  const [showDelete, setShowDelete] = useState(false)
  

  return (
    <div
      className="flex h-12 min-h-[3rem] items-center justify-between px-4 text-[#D6BA4D] rounded-xl bg-[#102042] border border-[#D9D9D9] cursor-pointer"
      onClick={onClick}
      onMouseOver={()=>{setShowDelete(true)}}
      onMouseOut={()=>{setShowDelete(false)}}
    >
      <p className="overflow-hidden break-words">{name}</p>
      {
        showDelete &&
        <TrashIcon
          onClick={filter}
          className="text-white w-4 h-4"
        />
      }
    </div>
  )
};