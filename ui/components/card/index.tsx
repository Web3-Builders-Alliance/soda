import { FC, useState } from "react";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";



export const Card: FC<any> = ({ name, onClick, filter, instruction, index }) => {
  const { IDL, setIDL } = useIDL()
  const [showOptions, setShowOptions] = useState(false)
  const [newName, setNewName] = useState(name)

  const editNameInstruction = () => {
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
  }

  console.log(IDL)

  return (
    <div
      className="flex h-12 min-h-[3rem] items-center justify-between px-4 text-[#D6BA4D] rounded-xl bg-[#102042] border border-[#D9D9D9] cursor-pointer"
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
        className=" w-full bg-transparent focus:outline-none"
      />
      {
        showOptions &&
        <div className="flex">
          <CheckIcon
            onClick={editNameInstruction}
            className=" w-4 h-4"
          />
          <TrashIcon
            onClick={filter}
            className="text-white w-4 h-4"
          />
        </div>
      }
    </div>
  )
};