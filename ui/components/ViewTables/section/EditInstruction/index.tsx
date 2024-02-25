import { FC, useState, useEffect, useRef } from "react"
import Tab from "./Tabs/tab"
import { type_args } from "@/const"
import { useIDL } from "@/context/IDL"

const EditInstructions: FC<any> = ({ indexItem, instruction }) => {
    const [tabConfig, setTab] = useState("accounts")
    const timeOutediting = useRef<NodeJS.Timeout>()
    const [kind, setKind] = useState("")
    const { IDL, setIDL } = useIDL()

    useEffect(() => {
        if (IDL?.[instruction]?.[indexItem]?.type) {
            setKind(IDL?.[instruction]?.[indexItem]?.type?.kind)
        } else {
            setKind("")
        }
    }, [indexItem])

    const addProperty = (newProperty: any) => {
        if (newProperty.name) {
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
                    if (index === indexItem) {
                        if (instruction === "instructions" && !inst?.[tabConfig]?.find((obj: any) => obj.name === newProperty.name)) {
                            return {
                                ...inst,
                                [tabConfig]: [
                                    ...inst?.[tabConfig] || [],
                                    newProperty
                                ]
                            }
                        }
                        if (instruction === "events" && !inst?.[tabConfig]?.find((obj: any) => obj.name === newProperty.name)) {
                            return {
                                ...inst,
                                fields: [
                                    ...inst?.fields || [],
                                    newProperty
                                ]
                            }
                        }
                        if (!inst?.types?.[tabConfig]?.find((obj: any) => obj.name === newProperty.name)) {
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
        }
    }

    const editProperty = (e: any, indexProperty: number) => {
        if (timeOutediting.current) clearTimeout(timeOutediting.current)

        timeOutediting.current = setTimeout(() => {
            if (instruction === "errors") {
                const editing = {
                    ...IDL,
                    [instruction]: IDL[instruction].map((prop: any, i: number) => {

                        if (indexProperty === i) {
                            return {
                                ...prop,
                                [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                            }
                        } else {
                            return prop
                        }
                    })
                }
                return setIDL(editing)
            }

            const editing = {
                ...IDL,
                [instruction]: IDL[instruction].map((inst: any, index: number) => {
                    if (index === indexItem) {
                        if (!inst?.[tabConfig]?.find((prop: any) => prop[e.target.value])) {
                            if (instruction === "instructions") {
                                return {
                                    ...inst,
                                    [tabConfig]: inst?.[tabConfig].map((prop: any, i: number) => {
                                        if (indexProperty === i) {
                                            return {
                                                ...prop,
                                                [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                                            }
                                        } else {
                                            return prop
                                        }
                                    })
                                }
                            }
                            if (instruction === "events") {
                                return {
                                    ...inst,
                                    fields: inst?.fields.map((prop: any, i: number) => {
                                        if (indexProperty === i) {
                                            return {
                                                ...prop,
                                                [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                                            }
                                        } else {
                                            return prop
                                        }
                                    })
                                }
                            }
                            return {
                                ...inst,
                                type: {
                                    ...inst.type,
                                    [inst?.type?.kind === "struct" ? "fields" : "variants"]: inst?.type?.[inst?.type?.kind === "struct" ? "fields" : "variants"].map((prop: any, i: number) => {
                                        if (indexProperty === i) {
                                            return {
                                                ...prop,
                                                [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value
                                            }
                                        } else {
                                            return prop
                                        }
                                    })

                                }
                            }

                        }
                    }
                    return inst
                })
            }
            setIDL(editing)
        }, 1000)
    }

    const deleteItem = (indexProperty: number) => {
        if (instruction === "errors") {
            const del = {
                ...IDL,
                [instruction]: IDL[instruction].filter((e: any, i: any) => i !== indexProperty).map((error: any, i: any) => {
                    return {
                        ...error,
                        code: 6000 + i
                    }
                })
            }
            setIDL(del)
            return
        }
        const del = {
            ...IDL,
            [instruction]: IDL[instruction].map((inst: any, index: number) => {
                if (index === indexItem) {
                    if (instruction === "instructions") {
                        return {
                            ...inst,
                            [tabConfig]: inst[tabConfig].filter((e: any, i: any) => i !== indexProperty)
                        }
                    }
                    if (instruction === "events") {
                        return {
                            ...inst,
                            fields: inst?.fields.filter((e: any, i: any) => i !== indexProperty)
                        }
                    }
                    return {
                        ...inst,
                        type: {
                            ...inst.type,
                            [inst?.type?.kind === "struct" ? "fields" : "variants"]: inst?.type?.[inst?.type?.kind === "struct" ? "fields" : "variants"].filter((e: any, i: any) => i !== indexProperty)
                        }
                    }
                }
                return inst
            })
        }
        setIDL(del)
    }

    const render = {
        instructions: (
            IDL?.[instruction]?.[indexItem] &&
            <div className="flex flex-col overflow-x-auto gap-4 w-10/12 h-full bg-backg rounded-md shadow-md shadow-inputs">
                <div className="flex w-full h-12 text-center -space-x-1 shadow-inner shadow-inputs bg-backg">
                    {
                        ["accounts", "args"].map((name, index) => {
                            return (
                                <div
                                    className={` ${tabConfig === name ? "z-20" : ""} self-end w-1/2`}
                                    key={name}
                                >
                                    <div
                                        className={`${tabConfig === name ? "text-chok h-full border-b border-chok" : "text-border hover:text-chok h-[90%] cursor-pointer border-b border-border"} flex px-6 items-center justify-center`}

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
                        deleteItem={deleteItem}
                        elements={IDL?.[instruction]?.[indexItem]?.[tabConfig]}
                        objConfig={[{ name: "name" }, { name: "isMut", options: "boolean" }, { name: "isSigner", options: "boolean" }]}
                    />
                }
                {
                    tabConfig === "args" &&
                    <Tab
                        editProperty={editProperty}
                        addProperty={addProperty}
                        deleteItem={deleteItem}
                        elements={IDL?.[instruction]?.[indexItem]?.[tabConfig]}
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
                    instruction={instruction}
                    deleteItem={deleteItem}
                    elements={IDL?.[instruction]}
                    objConfig={[{ disabled: true, name: "code" }, { name: "name" }, { name: "msg" }]}
                />
            </div>
        ),
        events: (
            IDL?.[instruction]?.[indexItem] &&
            <div className="flex flex-col w-full overflow-x-auto gap-4 h-full mt-20">
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    deleteItem={deleteItem}
                    elements={IDL?.[instruction]?.[indexItem]?.fields}
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                />
            </div>
        ),
    }

    if (render[instruction as keyof typeof render]) return render[instruction as keyof typeof render]
    return (
        IDL?.[instruction]?.[indexItem] &&
        <div className="flex flex-col overflow-x-auto gap-4 h-full w-full">
            {
                !IDL?.[instruction]?.[indexItem]?.type ?
                    <select
                        className='bg-inputs rounded-md text-chok'
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
                    <p className="text-chok text-xl">
                        {
                            `Kind: ${IDL?.[instruction]?.[indexItem]?.type.kind}`
                        }
                    </p>
            }
            {
                kind === "enum" &&
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    deleteItem={deleteItem}
                    elements={IDL?.[instruction]?.[indexItem]?.type?.variants}
                    objConfig={[{ name: "name" }]}
                />
            }
            {
                kind === "struct" &&
                <Tab
                    editProperty={editProperty}
                    addProperty={addProperty}
                    deleteItem={deleteItem}
                    elements={IDL?.[instruction]?.[indexItem]?.type?.fields}
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                />
            }
        </div>

    )


}

export default EditInstructions