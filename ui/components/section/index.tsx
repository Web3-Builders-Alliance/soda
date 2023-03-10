import { FC } from "react";

export const Section: FC<any> = ({content, setContent}) => {

  return (
    <section className="flex p-5 m-5 border border-gray-900 bg-gray-700">
      {content?.map((item:any)=>(
        <div key={item.name}>{item.name}</div>
      ))}
    </section>
  );
};