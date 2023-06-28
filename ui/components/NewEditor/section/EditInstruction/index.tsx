import { FC, useState, useEffect } from "react"
import Tab from "./Tabs/tab"
import { type_args } from "@/const"
import { useIDL } from "@/context/IDL"

const EditInstructions: FC<any> = ({ editingItem, instruction }) => {
    const [tabConfig, setTab] = useState("accounts")
    const [kind, setKind] = useState("")
    const { IDL, setIDL } = useIDL()

    useEffect(() => {
        if (IDL?.[instruction]?.[editingItem]?.type) {
            setKind(IDL?.[instruction]?.[editingItem]?.type?.kind)
        } else {
            setKind("")
        }
    }, [editingItem])

    const addProperty = (newProperty: any) => {
        // const verifyProperty = isProperty(newProperty, tabConfig)
        // if (verifyProperty) {
        if (instruction === "errors") {
            const errProperty = {
                ...newProperty,
                code: 6000 + (IDL[instruction].length)
            }
            return setIDL({
                ...IDL,
                [instruction]: [
                    ...IDL[instruction],
                    errProperty
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

    const editProperty = (propertyEdit: any, indexProperty: number) => {
        if (instruction === "errors") {
            const editing = {
                ...IDL,
                [instruction]: IDL[instruction].map((prop: any, i: number) => {
                    if (indexProperty === i) {
                        return propertyEdit
                    } else {
                        prop
                    }
                })
            }
            return setIDL(editing)
        }
        const editing = {
            ...IDL,
            [instruction]: IDL[instruction].map((inst: any, index: number) => {
                if (index === editingItem) {
                    if (instruction === "instructions" && !inst?.[tabConfig]?.includes(propertyEdit)) {
                        return {
                            ...inst,
                            [tabConfig]: inst?.[tabConfig].map((prop: any, i: number) => {
                                if (indexProperty === i) {
                                    return propertyEdit
                                } else {
                                    prop
                                }
                            })
                        }
                    }
                    if (instruction === "events" && !inst?.[tabConfig]?.includes(propertyEdit)) {
                        return {
                            ...inst,
                            fields: inst?.fields.map((prop: any, i: number) => {
                                if (indexProperty === i) {
                                    return propertyEdit
                                } else {
                                    prop
                                }
                            })
                        }
                    }
                    if (!inst?.types?.[tabConfig]?.includes(propertyEdit)) {
                        return {
                            ...inst,
                            type: {
                                kind: kind,
                                [kind === "struct" ? "fields" : "variants"]: inst?.type?.[kind === "struct" ? "fields" : "variants"].map((prop: any, i: number) => {
                                    if (indexProperty === i) {
                                        return propertyEdit
                                    } else {
                                        prop
                                    }
                                })

                            }
                        }
                    }
                }
                return inst
            })
        }
        // const editing = {
        //     ...IDL,
        //     ...propertyEdit
        // }
        setIDL(editing)

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
                                        className={`${tabConfig === name ? "text-slate-50 h-full" : "text-slate-500 hover:text-slate-400 h-[90%] cursor-pointer border-b-2 border-slate-700"} flex px-6 items-center justify-center`}

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
                        objConfig={[{ name: "name" }, { name: "isMut", options: "boolean" }, { name: "isSigner", options: "boolean" }]}
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
                    objConfig={[{ disabled: true, name: "code" }, { name: "name" }, { name: "msg" }]}
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
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                />
            </div>
        ),
    }

    if (render[instruction as keyof typeof render]) return render[instruction as keyof typeof render]
    return (
        IDL?.[instruction]?.[editingItem] &&
        <div className="flex flex-col overflow-x-auto gap-4 h-full">
            {
                !IDL?.[instruction]?.[editingItem]?.type ?
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
                    :
                    <p className="text-white text-xl">
                        {
                           `Kind: ${IDL?.[instruction]?.[editingItem]?.type.kind}`
                        }
                    </p>
            }
            {
                kind === "enum" &&
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]?.[editingItem]?.type?.variants}
                    objConfig={[{ name: "name" }]}
                    />
                }
            {
                kind === "struct" &&
                <Tab
                editProperty={editProperty}
                addProperty={addProperty}
                elements={IDL?.[instruction]?.[editingItem]?.type?.fields}
                objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                />
            }
        </div>

    )


}

export default EditInstructions