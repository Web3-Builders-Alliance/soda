import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";

export const Card: FC<any> = ({ prop, item, onClick, index, setEdit }) => {
  const { IDL, setIDL } = useIDL()

  const deleteItem = () => {
    const del = IDL[prop].toSpliced(index, 1)
    setIDL({
      ...IDL,
      [prop]: del
    })
  }

  return (

    <div
      className="relative flex p-5 pt-7 m-5 border w-44 h-[90%] rounded-lg border-border justify-center text-red font-medium hover:bg-backg hover:text-green hover:border-green cursor-pointer"
      onClick={(e) => {setEdit({item, index})}}
    >
      <TrashIcon onClick={(e) => {
        e.stopPropagation()
        deleteItem()
      }} className="absolute z-20 text-border bottom-2 right-2 w-4 h-4 hover:text-yellow" />
      <p className="overflow-hidden text-justify mt-2 break-words">{item.name}</p>
    </div>
  )
}