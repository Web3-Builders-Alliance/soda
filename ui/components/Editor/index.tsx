import { FC, useState } from "react";
import { Section } from "@/components/section";
import { useIDL } from "@/context/IDL";

export const Editor: FC<any> = ({generateIDL}) => {

    const [select, setSelect] = useState("instructions")
    const { IDL, setIDL } = useIDL()

    return (
        <div className=" flex flex-col gap-10 h-full font-mono p-10">
            <div className="flex justify-between">
                <input
                    placeholder="Project's Name"
                    value={IDL.name}
                    onChange={(e) => setIDL({
                        ...IDL,
                        name: e.target.value
                    })
                    }
                    className=" w-3/12 h-20 p-5 bg-[#102042] text-white text-base rounded-xl"
                />
                <div>
                    <button className="text-white bg-[#387847] p-5 rounded-xl h-20" onClick={generateIDL}>
                        Save IDL
                    </button>
                </div>
            </div>
            <div className=" flex flex-col border border-white gap-2 h-[calc(100%_-_5rem)] rounded-xl overflow-hidden">
                <div className=" flex w-full text-center -space-x-1 h-12">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if( name !== "name" && name !== "version" && name !== "metadata" )
                            return (
                                <div
                                    className={` ${select === name ? "z-20" : ""} self-end h-full w-full`}
                                    key={name}
                                >
                                    <div
                                        className={`${select === name ? "text-white h-full shadow-tabSelected rounded-b-xl" : "text-slate-400 h-[90%]  shadow-tab"} shadow-white flex px-6 items-center justify-center   bg-[#1E1E1E]`}
                                        onClick={() => setSelect(name)}
                                    >
                                        <p>
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Section instruction={select}/>
            </div>
        </div>
    )
};
