import { useIDL } from "@/context/IDL"
import { FC } from "react"
import { Section } from "../section"



const ClassicEditor: FC<any> = ({ exportData }) => {

    const { IDL, setIDL } = useIDL()



    const instructions = [
        {
            name: "instructions",
            item: IDL.instructions,
            initExpanded: true,
        },
        {
            name: "accounts",
            item: IDL.accounts,
            initExpanded: false,

        },
        {
            name: "types",
            item: IDL.types,
            initExpanded: false,

        },
        {
            name: "events",
            item: IDL.events,
            initExpanded: false,

        },
        {
            name: "errors",
            item: IDL.errors,
            initExpanded: false,
        },
    ]

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-between">
                <input
                    placeholder="Add project's name"
                    value={IDL.name}
                    onChange={(e) => setIDL({ ...IDL, name: e.target.value })}
                    className="p-5 mb-5 m-5 w-3/12 h-20 bg-inputs text-chok text-base rounded-xl hover:shadow-md hover:shadow-border hover:text-green"
                />
            </div>
            {
                instructions.map(({ item, name, initExpanded }) => (
                    <Section
                        key={name}
                        instruction={name}
                        content={item}
                        initExpanded={initExpanded}
                    />
                ))
            }
        </div>
    )
}

export default ClassicEditor