import { FC, useState } from "react";
import { Section } from "@/components/NewEditor/section";
import { useIDL } from "@/context/IDL";
import SelectTemplate from "./SelectTemplate";

export const NewEditor: FC<any> = ({generateIDL}) => {

    const [select, setSelect] = useState("instructions")
    const [popUpTemplates, setPopUpTemplates] = useState(false)
    const { IDL, setIDL } = useIDL()

    return (
        <div className="flex flex-col gap-10 m-5 h-full font-mono">
            <div className="flex justify-between">
                <input
                    placeholder="Project's Name"
                    value={IDL.name}
                    onChange={(e) => setIDL({
                        ...IDL,
                        name: e.target.value
                    })
                    }
                    className="w-3/12 h-20 p-5 bg-inputs text-chok text-base rounded-xl"
                />
                <div>
                    {/* <button className="text-chok bg-export p-5 rounded-xl h-20" onClick={generateIDL}>

                        Save IDL
                    </button> */}
                    {/* <button className="text-white bg-[#387847] p-5 rounded-xl h-20" onClick={()=>setPopUpTemplates(!popUpTemplates)}>
                        Create Proyect
                    </button> */}

                </div>
                {
                    popUpTemplates &&
                    <SelectTemplate />
                }
            </div>
            <div className="flex flex-col border border-border gap-2 h-[calc(100%_-_5rem)] rounded-xl overflow-hidden">

                <div className="flex w-full text-center -space-x-1 h-12">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if( name !== "name" && name !== "version" && name !== "metadata" )
                            return (
                                <div
                                    className={`self-end h-full w-full`}
                                    key={name}
                                >
                                    <div
                                        className={`${select === name ? "text-chok h-full bg-backg border-b-2 border-chok" : "text-border h-[100%] hover:text-chok cursor-pointer shadow-inner shadow-inputs bg-backg border-b-2 border-border"} shadow-inputs flex px-6 items-center justify-center`}

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
