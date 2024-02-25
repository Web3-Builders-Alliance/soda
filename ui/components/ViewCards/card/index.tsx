import { FC, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";
import PopUp from "@/components/PopUp";

export const Card: FC<any> = ({ prop, item, onClick, index, setEdit, explanationText }) => {
  const { IDL, setIDL } = useIDL()
  const [confirmation, setConfirmation] = useState(false)

  const deleteItem = () => {
    const del = IDL[prop].toSpliced(index, 1)
    return setIDL({
      ...IDL,
      [prop]: del
    })
  }

  const cancelDelete = () => {
    setConfirmation(false)
  }

  return (
    <>
      <div
        className="relative flex flex-col h-[90%] border min-w-[10rem] w-40 rounded-lg border-border text-red-custom font-medium hover:bg-backg hover:text-green-custom hover:border-green-custom cursor-pointer"
        onClick={(e) => { setEdit({ item, index }) }}
      >
        <TrashIcon onClick={(e) => {
          e.stopPropagation()
          setConfirmation(true)
        }} className="absolute z-20 text-border bottom-2 right-2 w-4 h-4 hover:text-yellow-custom" />
        <div className=" flex flex-col items-center justify-around h-[75%] w-11/12">
          <p className="text-justify text-2xl break-words">{item.name}</p>
          <p className="overflow-y-auto mini-scrollbar text-sm text-chok">
            {explanationText}
          </p>
        </div>
      </div>
      {
        confirmation &&
        <PopUp
          closePopUp={cancelDelete}
          alert={{
            text: "Delete?",
            confirm: deleteItem,
            cancel: cancelDelete
          }}
        />
      }
    </>
  )
}