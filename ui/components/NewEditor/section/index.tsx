import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { CheckIcon } from "@heroicons/react/24/solid"
import { Card } from "../card";
import Tab from "./EditInstruction/Tabs/tabWithoutType";
import EditInstructions from "./EditInstruction";
import { useIDL } from "@/context/IDL";

export const Section: FC<any> = ({ instruction }) => {
  const { IDL, setIDL } = useIDL()
  const [newIntructionName, setNewIntructionName] = useState<string>("");
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
            value={newIntructionName}
            onChange={(e) => setNewIntructionName(e.target.value)}
            className=" w-full bg-inputs focus:outline-none"
          />
          <div className="flex gap-2">
            <CheckIcon
              className="w-5 h-5 text-white hover:text-green"
              onClick={() => {
                if (!IDL[instruction].find((inst: any) => inst.name === newIntructionName)) {
                  setIDL({
                    ...IDL,
                    [instruction]: [
                      ...IDL[instruction],
                      {
                        name: newIntructionName
                      }
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
          <div className=" flex flex-col gap-2 max-h-full w-56 w-80 pr-4 overflow-y-auto">


            {
              IDL[instruction]?.map(({ name }: { name: string; }, index: number) => (
                <Card
                  key={name}
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
              ))}
          </div>
        }  
      </div>
      <EditInstructions
          instruction={instruction}
          editingItem={editingItem}
        />
    </section>
  );
};
