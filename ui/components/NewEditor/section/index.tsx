import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/solid"
import { Card } from "../card";
import EditInstructions from "./EditInstruction";
import { useIDL } from "@/context/IDL";

export const Section: FC<any> = ({ instruction }) => {
  const { IDL, setIDL } = useIDL()
  const [newInstructionName, setNewIntructionName] = useState<string>("");
  const [editingItem, setEditingItem] = useState(0);

  return (
    <section className={`flex p-5 relative gap-5 h-[calc(100%_-_3.5rem)]`}>

      <div className="flex flex-col gap-5 h-[calc(100%_-_6rem)]">

        {
          instruction !== "errors" &&
          <div
            className=" flex bg-inputs h-14 justify-between w-80 rounded-xl py-4 px-6 text-chok cursor-pointer"
          >
            <input
              placeholder={`Add ${instruction}'s Name`}
              value={newInstructionName}
              onChange={(e) => setNewIntructionName(e.target.value)}
              className=" w-full bg-inputs focus:outline-none"
            />
            <div className="flex gap-2">
              <CheckIcon
                className="w-5 h-5 text-white hover:text-green"
                onClick={() => {
                  if (!IDL[instruction].find((inst: any) => inst.name === newInstructionName)) {
                    setIDL({
                      ...IDL,
                      [instruction]: [
                        ...IDL[instruction],
                        { name: newInstructionName }
                      ]
                    })
                  }
                }
                }
              />
            </div>
          </div>
        }
        {
          instruction !== "errors" &&
          <div className=" flex flex-col gap-2 max-h-full w-80 pr-4 overflow-y-auto">


            {
              IDL[instruction]?.map(({ name }: { name: string; }, index: number) => {
                return ( 
                  <div key={name} className="flex items-center">
                    <Card
                      name={name}
                      instruction={instruction}
                      index={index}
                      deleteItem={() => {
                        const del = IDL[instruction].toSpliced(index, 1)
                        setIDL({
                          ...IDL,
                          [instruction]: del
                        })
                      }}
                      onClick={() => {
                        setEditingItem(index)
                      }}
                    />
                    <ArrowRightIcon
                      className={` ${editingItem === index ? "visible" : "invisible"} w-8 h-4 text-white`}
                    />
                  </div>
                )
              }
              )}
          </div>
        }
      </div>
      <EditInstructions
        instruction={instruction}
        indexItem={editingItem}
      />
    </section>
  );
};
