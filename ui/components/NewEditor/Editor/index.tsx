import { FC, useState } from "react";
import { Section } from "@/components/NewEditor/section";
import { useIDL } from "@/context/IDL";
import SelectTemplate from "./SelectTemplate";

export const NewEditor: FC<any> = ({generateIDL}) => {

    const [select, setSelect] = useState("instructions")
    const [popUpTemplates, setPopUpTemplates] = useState(false)
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
                    className=" w-3/12 h-20 p-5 bg-[#102042] text-slate-50 text-base rounded-xl"
                />
                <div>
                    <button className="text-slate-50 bg-[#387847] p-5 rounded-xl h-20" onClick={generateIDL}>

                        Save IDL
                    </button>
                    {/* <button className="text-white bg-[#387847] p-5 rounded-xl h-20" onClick={()=>setPopUpTemplates(!popUpTemplates)}>
                        Create Proyect
                    </button> */}
                </div>
                {
                    popUpTemplates &&
                    <SelectTemplate />
                }
            </div>
            <div className=" flex flex-col border border-slate-700 gap-2 h-[calc(100%_-_5rem)] rounded-xl overflow-hidden">

                <div className=" flex w-full text-center -space-x-1 h-12">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if( name !== "name" && name !== "version" && name !== "metadata" )
                            return (
                                <div
                                    className={`  self-end h-full w-full`}
                                    key={name}
                                >
                                    <div
                                        className={`${select === name ? "text-slate-50 h-full  rounded-b-xl bg-[#081635]" : "text-slate-500 h-[90%] hover:text-slate-400 cursor-pointer shadow-inner shadow-slate-800 bg-slate-900"} shadow-slate-600 flex px-6 items-center justify-center`}

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
