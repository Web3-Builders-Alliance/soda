import { FC, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";
import PopUp from "@/components/PopUp";

export const Card: FC<any> = ({ name, onClick, instruction, index, selected }) => {
  const { IDL, setIDL } = useIDL()
  const [showOptions, setShowOptions] = useState(false)
  const [newName, setNewName] = useState(name)
  const timeoutName = useRef<NodeJS.Timeout>()
  const [confirmation, setConfirmation] = useState(false)

  useEffect(() => {
    clearTimeout(timeoutName.current)
    timeoutName.current = setTimeout(() => {
      setIDL({
        ...IDL,
        [instruction]: IDL[instruction].map((inst: any, i: number) => {
          if (index === i) {
            return {
              ...inst,
              name: newName
            }
          }
          return inst
        })
      })
    }, 1000)
  }, [newName])

  const deleteItem = () => {
    const del = IDL[instruction].toSpliced(index, 1)
    setIDL({
      ...IDL,
      [instruction]: del
    })
  }

  const cancelDelete = () => {
    setConfirmation(false)
  }

  return (
    <>
      <div
        className={`flex h-12 min-h-[3rem] items-center justify-between px-4 rounded-xl bg-inputs border border-border cursor-pointer ${selected ? "text-green-custom shadow-sm shadow-green-custom" : "text-yellow-custom"}`}
        onClick={onClick}
        onMouseOver={() => { setShowOptions(true) }}
        onMouseOut={() => { setShowOptions(false) }}
      >
        <input
          placeholder={name}
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value)
          }}
          className=" w-full bg-inputs focus:outline-none"
        />
        {
          showOptions &&
          <div className="flex">
            <TrashIcon
              onClick={()=>setConfirmation(true)}
              className="text-red w-4 h-4"
            />
          </div>
        }
        <ArrowRightIcon
          className={` ${selected ? "visible" : "invisible"} w-8 h-4 text-white`}
        />
      </div>
      {
        confirmation &&
        <PopUp
          closePopUp={cancelDelete}
          alert={{
            text: "Are you sure you want to delete?",
            cancel: cancelDelete,
            confirm: deleteItem
          }}
        />
      }
    </>
  )
};