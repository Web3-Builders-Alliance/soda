import { FC, useState, useEffect } from "react"
import Tab from "./Tabs/tabs"
import { type_args } from "@/const"
import { useIDL } from "@/context/IDL"

const EditInstructions: FC<any> = ({ editingItem: editingInstruction, instruction }) => {
    const [tabInstruction, setTabInstruction] = useState("accounts")
    const { IDL } = useIDL()

    const tabs = () => {
        if (instruction === "instructions") {
            return (
                <div className="flex flex-col overflow-x-auto gap-4 h-full">
                    <div className=" flex w-full h-12 text-center -space-x-1">
                        {
                            ["accounts", "args"].map((name, index) => {
                                return (
                                    <div
                                        className={` ${tabInstruction === name ? "z-20" : ""} self-end w-full`}
                                        key={name}
                                    >
                                        <div
                                            className={`${tabInstruction === name ? "text-white h-full shadow-tabSelected" : "text-slate-400 h-[90%] shadow-tab"} shadow-white flex px-6 items-center justify-center  rounded-t-xl bg-[#1E1E1E]`}
                                            onClick={() => setTabInstruction(name)}
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
                    {
                        tabInstruction === "accounts" &&
                        <Tab
                            instruction={instruction}
                            elements={IDL[instruction]?.accounts}
                            property={tabInstruction}
                            editingInstruction={editingInstruction}
                            objConfig={[{ name: "name" }, { name: "isMut", options: ["true", "false"] }, { name: "isSigner", options: ["true", "false"] }]}
                        />
                    }
                    {
                        tabInstruction === "args" &&
                        <Tab
                            instruction={instruction}
                            property={tabInstruction}
                            editingInstruction={editingInstruction}
                            elements={IDL[instruction]?.args}
                            objConfig={[{ name: "name" }, { name: "type", options: type_args }]}
                        />
                    }
                </div>
            )
        } else if (instruction === "errors") {
            return (
                <div>

                </div>
            )
        }
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="w-9/12">
            {
                tabs()
            }
        </div>
    )
}

export default EditInstructions