import { useIDL } from "@/context/IDL";
import { FC, useEffect, useState } from "react";

export const NewItem: FC<any> = ({ prop, setIsModalOpen, isModalOpen }) => {
  const { IDL, setIDL } = useIDL()
  const [modal, setModal] = useState(isModalOpen)
  const [newInstructionName, setNewIntructionName] = useState<any>()

  useEffect(() => {
    setModal(isModalOpen)
  }, [isModalOpen])

  const save = () => {
    setIDL({
      ...IDL,
      [prop]: [
        ...IDL[prop],
        { name: newInstructionName }
      ]
    })
  }

  return (

    <div
      className="flex flex-col justify-between p-5 m-5  h-48 rounded-md bg-inputs items-center text-green font-bold hover:ring-2 ring-border cursor-pointer"
    >
      <input
        placeholder={`${prop.charAt(0).toUpperCase() + prop.slice(1)}'s Name`}
        autoFocus
        onChange={(e) => setNewIntructionName(e.target.value)}
        className="w-full text-center bg-inputs text-yellow rounded-md ring-1 ring-chok"
      />
      <button
        className="p-2 text-green"
        onClick={() => {
          setIsModalOpen(false)
          save()
        }}
      >
        Save
      </button>
    </div>
  )
}

