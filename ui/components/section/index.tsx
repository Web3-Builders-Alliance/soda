import { FC, useState } from "react";
import { NewItem } from "../NewItem";

export const Section: FC<any> = ({ content, setContent }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <section className={`flex p-5 m-5 border border-gray-900 bg-gray-700 relative`}>
      <div className={`transition-all duration-500 ease-in-out overflow-x-auto overflow-y-hidden ${expanded ? "h-64" : " h-4"}`}>
      {content?.map((item: any) => (
        <div key={item.name}>{item.name}</div>
      ))}
      <NewItem />
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
    </section>
  );
};
