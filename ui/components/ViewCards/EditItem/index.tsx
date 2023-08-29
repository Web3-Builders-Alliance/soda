import { FC, useState, useEffect } from "react"
import { type_args } from "@/const"
import { useIDL } from "@/context/IDL"
import { EditProp } from "./EditProp"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

const EditItem: FC<any> = ({ indexItem, instruction, setEdit }) => {
    const { IDL, setIDL } = useIDL()
    const [tabConfig, setTab] = useState("accounts")
    const [kind, setKind] = useState("")


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

    const render = {
        instructions: (
            IDL?.[instruction]?.[indexItem] &&
            <>
                <div className="flex w-full h-12 mt-4 text-center -space-x-1">
                    {
                        ["accounts", "args"].map((name, index) => {
                            return (
                                <div
                                    className={` ${tabConfig === name ? "z-20" : ""} self-end`}
                                    key={name}
                                >
                                    <div
                                        className={`${tabConfig === name ? "text-green-custom h-full border-b border-green-custom" : "text-border hover:text-green-custom h-[90%] cursor-pointer border-b border-border"} flex px-6 items-center justify-center`}

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
                    <EditProp
                        instruction={instruction}
                        nameConfig={tabConfig}
                        indexItem={indexItem}
                        addProperty={addProperty}
                        elements={IDL?.[instruction]?.[indexItem]?.[tabConfig]}
                        objConfig={[{ name: "name" }, { name: "isMut", options: "boolean" }, { name: "isSigner", options: "boolean" }]}
                    />
                }
                {
                    tabConfig === "args" &&
                    <EditProp
                        instruction={instruction}
                        nameConfig={tabConfig}
                        indexItem={indexItem}
                        addProperty={addProperty}
                        elements={IDL?.[instruction]?.[indexItem]?.[tabConfig]}
                        objConfig={[{ name: "name" }, { name: "type", options: type_args }]}
                    />
                }
            </>
        ),
        errors: (
            <>
                <EditProp
                    instruction={instruction}
                    indexItem={indexItem}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]}
                    objConfig={[{ disabled: true, name: "code" }, { name: "name" }, { name: "msg" }]}
                />
            </>
        ),
        events: (
            IDL?.[instruction]?.[indexItem] &&
            <>
                <EditProp
                    instruction={instruction}
                    indexItem={indexItem}
                    addProperty={addProperty}
                    elements={IDL?.[instruction]?.[indexItem]?.fields}
                    objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                />
            </>
        ),
    }

    return (
        <div className={`flex flex-col overflow-x-auto h-full w-full relative p-4`}>
            {
                instruction !== "errors" &&
                <div
                    className="absolute flex left-2 top-4 transform -translate-y-1/2 text-red-custom justify-center items-center font-mono font-medium"
                >
                    <ArrowLeftIcon
                        className="w-5 h-5 text-chok cursor-pointer hover:text-green-custom"
                        onClick={() => setEdit(false)}
                    />
                    <p className="ml-2 font-bold">
                        {`${IDL?.[instruction]?.[indexItem]?.name?.charAt(0).toUpperCase() + IDL?.[instruction]?.[indexItem]?.name?.slice(1)}`}
                    </p>
                </div>
            }
            {
                render[instruction as keyof typeof render]
                ||
                <div className="mt-4 ml-2">
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
                            <p className="text-chok ml-2">
                                {
                                    `Kind: ${IDL?.[instruction]?.[indexItem]?.type.kind}`
                                }
                            </p>
                    }
                    {
                        kind === "enum" &&
                        <EditProp
                            elements={IDL?.[instruction]?.[indexItem]?.type?.variants}
                            objConfig={[{ name: "name" }]}
                            instruction={instruction}
                            addProperty={addProperty}
                            indexItem={indexItem}
                        />
                    }
                    {
                        kind === "struct" &&
                        <EditProp
                            addProperty={addProperty}
                            indexItem={indexItem}
                            instruction={instruction}
                            elements={IDL?.[instruction]?.[indexItem]?.type?.fields}
                            objConfig={[{ name: "name" }, { name: "type", options: type_args }, { name: "index", options: "boolean" }]}
                        />
                    }

                </div>
            }
        </div>

    )
}

export default EditItem