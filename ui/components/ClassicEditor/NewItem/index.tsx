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
    if (!IDL[prop].find((inst: any) => inst.name === newInstructionName)) {

      setIDL({
        ...IDL,
        [prop]: [
          ...IDL[prop],
          { name: newInstructionName }
        ]
      })
    }
  }

  return (

    <div
      className="flex flex-col justify-between p-5 m-5 h-[90%] rounded-md ring-1 items-center hover:ring-2 ring-border"
    >
      <input
        placeholder={`Add ${prop.charAt(0).toUpperCase() + prop.slice(1)}'s name`}
        autoFocus
        onChange={(e) => setNewIntructionName(e.target.value)}
        className="w-full text-center h-16 bg-inputs text-red rounded-md ring-1 ring-border"
      />
      <button
        className="p-2 text-green font-bold hover:bg-green rounded-md hover:text-inputs"
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

