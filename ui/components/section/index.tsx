import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Card } from "../card";
import Tab from "./EditInstruction/Tabs/tabs";
import EditInstructions from "./EditInstruction";
import { useIDL } from "@/context/IDL";

export const Section: FC<any> = ({ instruction }) => {
  const { IDL, setIDL } = useIDL()
  const [newIntructionName, setNewIntructionName] = useState<string>("");
  const [editingItem, setEditingItem] = useState(0);

  return (
    <section className={`flex flex-col p-5 relative gap-5 h-[calc(100%_-_3.5rem)]`}>
      {
        instruction !== "errors" &&
        <div
          className=" flex bg-[#102042] h-14 justify-between w-80 rounded-xl py-4 px-6 text-white cursor-pointer"
        >
          <input
            placeholder={`Add ${instruction}'s Name`}
            value={newIntructionName}
            onChange={(e) => setNewIntructionName(e.target.value)}
            className=" w-full bg-transparent focus:outline-none"
          />
          <div className="flex gap-2">
            <CheckIcon
              className="w-5 h-5 text-white"
              onClick={() => {
                if(!IDL[instruction].find((inst: any)=>inst.name === newIntructionName)){
                  setIDL({
                    ...IDL,
                    [instruction]: [
                      ...IDL[instruction],
                      {
                        name: newIntructionName
                      }
                    ]
                  })
                }}
                }
            />
          </div>
        </div>
      }
      <div className="flex gap-5 h-[calc(100%_-_6rem)] w-full">
        <div className=" flex flex-col gap-2 max-h-full w-56 min-w-[14rem] pr-4 overflow-y-auto">
          
          {
            IDL[instruction]?.map((item: { name: string; }, index: number) => (
              <Card
                key={item.name}
                name={item.name}
                filter={() => {
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
        <EditInstructions
          instruction={instruction}
          editingItem={editingItem}
        />
      </div>
    </section>
  );
};
