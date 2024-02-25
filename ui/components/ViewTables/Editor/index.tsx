import { FC, useState } from "react";
import { Section } from "@/components/ViewTables/section";
import { useIDL } from "@/context/IDL";

export const NewEditor: FC<any> = () => {

    const [select, setSelect] = useState("instructions")
    const { IDL, setIDL } = useIDL()

    return (
        <div className="flex flex-col h-full p-5 gap-5 font-mono">
            <input
                placeholder="Add project's name"
                value={IDL.name}
                onChange={(e) => setIDL({
                    ...IDL,
                    name: e.target.value
                })
                }
                className="w-3/12 bg-inputs h-16 text-center text-chok text-base rounded-xl hover:shadow-md hover:shadow-border hover:text-green-custom"
            />
            <div className="flex flex-col h-full border border-border gap-2 rounded-xl overflow-hidden">

                <div className="flex w-full text-center -space-x-1 h-12">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if (name !== "name" && name !== "version" && name !== "metadata")
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
                <Section instruction={select} />
            </div>
        </div>
    )
};
