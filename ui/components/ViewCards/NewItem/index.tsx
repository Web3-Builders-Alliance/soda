import { useIDL } from "@/context/IDL";
import { CheckIcon } from '@heroicons/react/24/solid'
import { FC, useEffect, useState } from "react";

export const NewItem: FC<any> = ({ prop, setIsModalOpen, isModalOpen }) => {
  const { IDL, setIDL } = useIDL()
  const [modal, setModal] = useState(isModalOpen)
  const [newInstructionName, setNewIntructionName] = useState<any>()

  useEffect(() => {
    setModal(isModalOpen)
  }, [isModalOpen])

  const save = () => {
    if (!IDL[prop].find((inst: any) => inst.name === newInstructionName) && newInstructionName  ) {

      setIDL({
        ...IDL,
        [prop]: [
          ...IDL[prop],
          { name: newInstructionName }
        ]
      })
    }
    setNewIntructionName("")
  }

  return (

    <div
      className="flex flex-col justify-between p-5 m-5 h-[90%] min-w-[12rem] rounded-md ring-1 items-center hover:ring-2 ring-border"
    >
      <input
        placeholder={`Add ${prop.charAt(0).toUpperCase() + prop.slice(1)}'s name`}
        autoFocus
        value={newInstructionName}
        onChange={(e) => setNewIntructionName(e.target.value)}
        className="w-full text-center h-16 p-4 bg-inputs text-red-custom rounded-md ring-1 ring-border"
      />
      <CheckIcon
        className=" self-end text-green-custom w-6 font-bold hover:bg-green-custom rounded-md hover:text-inputs"
        onClick={() => {
          setIsModalOpen(false)
          save()
        }}
      />
    </div>
  )
}

