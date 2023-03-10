import { FC } from "react";

export const NewItem: FC<any> = ({content}) => {

  return (
    <div className="flex p-5 m-5 border w-20 h-50 border-gray-900 bg-yellow-700">
      {content?.name}
    </div>
  );
};