import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { Card } from "../card";
import EditItem from "../EditItem";
import { EditProp } from "../EditItem/EditProp";

export const Section: FC<any> = ({ instruction, content, initExpanded = false, deleteItem }) => {
  const [expanded, setExpanded] = useState(initExpanded);
  const [edit, setEdit] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<string | boolean>(false);
  const [hidden, setHidden] = useState<any>()

  useEffect(() => {
    if (expanded) {
      return setHidden(false)
    }
    setTimeout(() => {
      setHidden(true)
    }, 500)
  }, [expanded])

  return (
    <section className={`flex p-5 m-5 border border-border bg-backg rounded-md relative`}>
      <div
        className="absolute flex left-5 top-0 transform -translate-y-1/2 text-chok justify-center items-center font-mono font-thin"
      >
        {`${instruction.charAt(0).toUpperCase() + instruction.slice(1)}`}
      </div>
      <div className={` flex w-full mini-scrollbar transition-all duration-500 overflow-x-auto overflow-y-hidden ${expanded ? "h-min" : " overflow-x-hidden h-0"} ${hidden ? "hidden" : "block"}`}>
        {
          instruction !== "errors" && !edit ?
            <>
              <NewItem
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                prop={instruction}
              />
              {
                content.map((item: any, index: number) => (
                  <Card
                    prop={instruction}
                    key={item.name}
                    item={item}
                    index={index}
                    setIsModalOpen={setIsModalOpen}
                    setEdit={setEdit}
                  />
                ))
              }
            </>
            :
            <EditItem
              expanded={expanded}
              setEdit={setEdit}
              indexItem={edit?.index}
              item={edit?.item}
              instruction={instruction}
            />
        }
      </div>
      <button
        type="button"
        className="absolute flex left-1/2 bottom-0 border border-border bg-inputs rounded-full w-8 h-8 transform -translate-x-1/2 translate-y-1/2 text-yellow justify-center items-center hover:bg-backg"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "-" : "+"}
      </button>
    </section>
  );
};
