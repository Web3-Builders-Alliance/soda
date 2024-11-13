import { FC, useState, useEffect } from "react";
import { NewItem } from "../NewItem";
import { Card } from "../card";
import EditItem from "../EditItem";
import { useIDL } from "@/context/IDL";

export const Section: FC<any> = ({ instruction, content, initExpanded = false }) => {
  const { clear } = useIDL()
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

  useEffect(() => {
    setEdit(false)
  },[clear])

  return (
    <section className={`flex p-5 m-5 border border-border bg-backg rounded-md relative`}>
      <div
        className="absolute flex left-5 top-0 transform -translate-y-1/2 text-chok justify-center items-center font-mono font-thin"
      >
        {`${instruction.charAt(0).toUpperCase() + instruction.slice(1)}`}
      </div>
      <div className={`flex items-center w-full mini-scrollbar transition-all duration-500 overflow-y-hidden ${expanded ? "overflow-x-auto h-80" : " overflow-x-hidden h-0"}`}>
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
                    explanationText={"add / edit"}
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
        className="absolute flex left-1/2 bottom-0 border border-border bg-inputs rounded-full w-8 h-8 transform -translate-x-1/2 translate-y-1/2 text-yellow-custom justify-center items-center hover:bg-backg"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "-" : "+"}
      </button>
    </section>
  );
};
