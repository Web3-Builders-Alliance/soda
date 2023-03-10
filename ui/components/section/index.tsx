import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { Card } from "../Card";

export const Section: FC<any> = ({ name, content, setContent, initExpanded= false }) => {
  const [expanded, setExpanded] = useState(initExpanded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIntructionName, setNewIntructionName] = useState<string>("instruction_name");
  const [editingItem, setEditingItem] = useState(0);

  useEffect(()=>console.log(isModalOpen),[isModalOpen])
  return (
    <section className={`flex p-5 m-5 border border-gray-900 bg-gray-700 relative`}>
      <div
        className="absolute flex left-5 top-0 transform  -translate-y-1/2 text-white justify-center items-center font-mono font-thin"
      >
        {name}
      </div>
      <div className={`mini-scrollbar flex transition-all duration-500 ease-in-out overflow-x-auto overflow-y-hidden ${expanded ? "h-64" : " overflow-x-hidden h-4"}`}>
      {content.map((item: { name: string; }, index:number) => (
        <Card
          key={item.name}
          name={item.name}
          onClick={()=>{
            setEditingItem(index)
            setIsModalOpen(true)
          }}
        />
      ))}
      <NewItem
        onClick={()=>{
          setEditingItem((content?.length ?? 0) + 1)
          setIsModalOpen(true)}
        }
      />
      </div>
      <button
        type="button"
        className="absolute flex left-1/2 bottom-0 border border-gray-500 bg-gray-700 rounded-full w-8 h-8 transform -translate-x-1/2 translate-y-1/2 text-white justify-center items-center"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "-" : "+"}
      </button>
      {isModalOpen && (
        <div className="flex flex-col p-5 text-red text-center bg-purple-900 absolute left-5 top-5 right-5 bottom-5">
                <input
            placeholder="Instruction's Name"
            value={newIntructionName}
            onChange={(e) => setNewIntructionName(e.target.value)}
            className="p-5 mb-5 text-center bg-gray-800 text-white"
          />
          <div>
          <button
            className="p-2 m-2 mx-auto bg-red-900 text-white mt-5"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 m-2 mx-auto bg-green-900 text-white mt-5"
            onClick={() => {
              setIsModalOpen(false)
              setContent([
                ...content,
                {name:newIntructionName}
              ])
            }}
          >
            Save
          </button>
          </div>
        </div>
      )}
    </section>
  );
};
