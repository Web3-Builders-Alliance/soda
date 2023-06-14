import { FC, useState, useEffect } from "react"
import Tab from "./Tabs/tab"
import { type_args } from "@/const"
import { useIDL } from "@/context/IDL"
import { isProperty } from "./Tabs/verifyType"

const EditInstructions: FC<any> = ({ editingItem, instruction }) => {
    const [tabConfig, setTab] = useState("accounts")
    const [kind, setKind] = useState("")
    const { IDL, setIDL } = useIDL()

    useEffect(() => {
        if (IDL?.[instruction]?.[editingItem]?.type) {
            console.log(IDL?.[instruction]?.[editingItem]?.type)
            setKind(IDL?.[instruction]?.[editingItem]?.type?.kind)
        } else {
            setKind("")
        }
    }, [editingItem])

    const addProperty = (newProperty: any) => {
        // const verifyProperty = isProperty(newProperty, tabConfig)
        // if (verifyProperty) {
        if (instruction === "errors") {
            return setIDL({
                ...IDL,
                [instruction]: [
                    ...IDL[instruction],
                    newProperty
                ]
            })
        }
        setIDL({
            ...IDL,
            [instruction]: IDL[instruction].map((inst: any, index: number) => {
                if (index === editingItem) {
                    if (instruction === "instructions" && !inst?.[tabConfig]?.includes(newProperty)) {
                        return {
                            ...inst,
                            [tabConfig]: [
                                ...inst?.[tabConfig] || [],
                                newProperty
                            ]
                        }
                    }
                    if (instruction === "events" && !inst?.[tabConfig]?.includes(newProperty)) {
                        return {
                            ...inst,
                            fields: [
                                ...inst?.fields || [],
                                newProperty
                            ]
                        }
                    }
                    if (!inst?.types?.[tabConfig]?.includes(newProperty)) {
                        return {
                            ...inst,
                            type: {
                                kind: kind,
                                [kind === "struct" ? "fields" : "variants"]: [
                                    ...inst?.type?.[kind === "struct" ? "fields" : "variants"] || [],
                                    newProperty
                                ]

                            }
                        }
                    }
                }
                return inst
            })
        })
        // }
    }

    const editProperty = (propertyEdit: any) => {

        const editing = {
            ...IDL,
            propertyEdit
        }
        setIDL(editing)
        // }
    }

    const render = {
        instructions: (
            IDL?.[instruction]?.[editingItem] &&
            <div className="flex flex-col overflow-x-auto gap-4 h-full">
                <div className=" flex w-full h-12 text-center -space-x-1">
                    {
                        ["accounts", "args"].map((name, index) => {
                            return (
                                <div
                                    className={` ${tabConfig === name ? "z-20" : ""} self-end w-full`}
                                    key={name}
                                >
                                    <div
                                        className={`${tabConfig === name ? "text-white h-full shadow-tabSelected" : "text-slate-400 h-[90%] shadow-tab"} shadow-white flex px-6 items-center justify-center  rounded-t-xl bg-[#1E1E1E]`}
                                        onClick={() => setTab(name)}
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
                    tabConfig === "accounts" &&
                    <Tab
                        editProperty={editProperty}
                        addProperty={addProperty}
                        elements={IDL?.[instruction]?.[editingItem]?.[tabConfig]}
                        objConfig={[{ name: "name" }, { name: "isMut", options: ["true", "false"] }, { name: "isSigner", options: ["true", "false"] }]}
                    />
                }
                {
                    tabConfig === "args" &&
                    <Tab
                        editProperty={editProperty}
                        addProperty={addProperty}
                        elements={IDL?.[instruction]?.[editingItem]?.[tabConfig]}
                        objConfig={[{ name: "name" }, { name: "type", options: type_args }]}
                    />
                }
            </div>
        ),
        errors: (
            <div className="flex flex-col overflow-x-auto gap-4 h-full">
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]}
                    objConfig={[{ name: "code" }, { name: "type" }, { name: "msg" }]}
                />
            </div>
        ),
        events: (
            IDL?.[instruction]?.[editingItem] &&
            <div className="flex flex-col w-full overflow-x-auto gap-4 h-full">
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]?.[editingItem]?.fields}
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: ["true", "false"] }]}
                />
            </div>
        ),
    }

    // if (instruction === "instructions") {
    //     return (
    //         <div className="flex flex-col overflow-x-auto gap-4 h-full">
    //             <div className=" flex w-full h-12 text-center -space-x-1">
    //                 {
    //                     ["accounts", "args"].map((name, index) => {
    //                         return (
    //                             <div
    //                                 className={` ${tabConfig === name ? "z-20" : ""} self-end w-full`}
    //                                 key={name}
    //                             >
    //                                 <div
    //                                     className={`${tabConfig === name ? "text-white h-full shadow-tabSelected" : "text-slate-400 h-[90%] shadow-tab"} shadow-white flex px-6 items-center justify-center  rounded-t-xl bg-[#1E1E1E]`}
    //                                     onClick={() => setTab(name)}
    //                                 >
    //                                     <p>
    //                                         {name}
    //                                     </p>
    //                                 </div>
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //             {
    //                 tabConfig === "accounts" &&
    //                 <Tab
    //                     editProperty={editProperty}
    //                     addProperty={addProperty}
    //                     elements={IDL?.[instruction]?.[editingItem]?.[tabConfig]}
    //                     objConfig={[{ name: "name" }, { name: "isMut", options: ["true", "false"] }, { name: "isSigner", options: ["true", "false"] }]}
    //                 />
    //             }
    //             {
    //                 tabConfig === "args" &&
    //                 <Tab
    //                     editProperty={editProperty}
    //                     addProperty={addProperty}
    //                     elements={IDL?.[instruction]?.[editingItem]?.[tabConfig]}
    //                     objConfig={[{ name: "name" }, { name: "type", options: type_args }]}
    //                 />
    //             }
    //         </div>
    //     )
    // } else if (instruction === "errors") {
    //     return (
    //         <div>

    //         </div>
    //     )
    // } else if (instruction === "events") {
    //     <div className="flex flex-col overflow-x-auto gap-4 h-full">
    //         <Tab
    //             editProperty={editProperty}
    //             addProperty={addProperty}
    //             elements={IDL?.[instruction]?.[editingItem]?.fields}
    //             objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: ["true", "false"] }]}
    //         />
    //     </div>
    // }
    if (render[instruction as keyof typeof render]) return render[instruction as keyof typeof render]
    return (
        IDL?.[instruction]?.[editingItem] &&
        <div className="flex flex-col overflow-x-auto gap-4 h-full">
            {
                !IDL?.[instruction]?.[editingItem]?.type &&
                <select
                    className='bg-transparent text-white'
                    defaultValue={0}
                    onChange={(e) => { setKind(e.target.value) }}
                >
                    <option
                        value={0}
                        disabled
                    >
                        Select Kind
                    </option>
                    {
                        ["struct", "enum"].map((op: any) => {
                            return (
                                <option key={op}>
                                    {
                                        op
                                    }
                                </option>
                            )
                        })
                    }
                </select>
            }
            {
                kind === "enum" &&
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]?.[editingItem]?.type?.variants}
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: ["true", "false"] }]}
                />
            }
            {
                kind === "struct" &&
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]?.[editingItem]?.type?.fields}
                    objConfig={[{ name: "name" }]}
                />
            }
        </div>

    )


}

export default EditInstructions