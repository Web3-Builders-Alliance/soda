import { useIDL } from "@/context/IDL"
import { FC } from "react"
import { Section } from "../section"

const ClassicEditor: FC<any> = ({ exportData }) => {

    const { IDL, setIDL } = useIDL()

    return (
        <div className="flex flex-col justify-center">
            <input
                placeholder="Project's Name"
                value={IDL.name}
                onChange={(e) => setIDL({ ...IDL, name: e.target.value })}
                className="p-5 mb-5 m-5 bg-black text-white text-center text-base font-mono rounded-md ring-2 ring-neutral-700"
            />
            {[
                {
                    name: "Instructions",
                    item: IDL.instructions,
                    setItem: (newItem: any) => { setIDL({ ...IDL, instructions: [...IDL.instructions, newItem] }) },
                    initExpanded: true,
                    deleteItem: (index: any) => {
                        const del = IDL.instructions.toSpliced(index, 1)
                        setIDL({
                            ...IDL,
                            instructions: del
                        })
                    }
                },
                {
                    name: "Accounts",
                    item: IDL.accounts,
                    setItem: (newItem: any) => { setIDL({ ...IDL, accounts: [...IDL.accounts, newItem] }) },
                    initExpanded: false,
                    deleteItem: (index: any) => {
                        const del = IDL.accounts.toSpliced(index, 1)
                        setIDL({
                            ...IDL,
                            accounts: del
                        })
                    }
                },
                {
                    name: "Types",
                    item: IDL.types,
                    setItem: (newItem: any) => { setIDL({ ...IDL, types: [...IDL.types, newItem] }) },
                    initExpanded: false,
                    deleteItem: (index: any) => {
                        const del = IDL.types.toSpliced(index, 1)
                        setIDL({
                            ...IDL,
                            types: del
                        })
                    }
                },
                {
                    name: "Events",
                    item: IDL.events,
                    setItem: (newItem: any) => { setIDL({ ...IDL, events: [...IDL.events, newItem] }) },
                    initExpanded: false,
                    deleteItem: (index: any) => {
                        const del = IDL.events.toSpliced(index, 1)
                        setIDL({
                            ...IDL,
                            events: del
                        })
                    }
                },
                {
                    name: "Errors",
                    item: IDL.errors,
                    setItem: (newItem: any) => { setIDL({ ...IDL, errors: [...IDL.errors, newItem] }) },
                    initExpanded: false,
                    deleteItem: (index: any) => {
                        const del = IDL.errors.toSpliced(index, 1)
                        setIDL({
                            ...IDL,
                            errors: del
                        })
                    }
                },
            ].map(({ item, setItem, name, initExpanded, deleteItem }) => (
                <Section
                    key={name}
                    name={name}
                    content={item}
                    setContent={setItem}
                    initExpanded={initExpanded}
                    deleteItem={deleteItem}
                />
            ))}
            <button
                type="button"
                className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200  "
                onClick={exportData}
            >
                Create Project
            </button>
        </div>
    )
}

export default ClassicEditor