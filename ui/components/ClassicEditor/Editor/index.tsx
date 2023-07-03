import { useIDL } from "@/context/IDL"
import { FC } from "react"
import { Section } from "../section"

const ClassicEditor: FC<any> = ({ exportData }) => {

    const { IDL, setIDL } = useIDL()

    return (
        <div className="flex flex-col justify-center">
             <div className="flex justify-between">
            <input
                placeholder="Project's Name"
                value={IDL.name}
                onChange={(e) => setIDL({ ...IDL, name: e.target.value })}
                className="p-5 mb-5 m-5 w-3/12 h-20 bg-inputs text-chok text-base rounded-xl"
            />
             {/* <button
                type="button"
                className="w-2/12 h-20 mx-5 px-5 py-2 my-5 bg-export rounded-xl text-chok font-semibold hover:text-blue hover:ring-2 hover:ring-sky"
                onClick={exportData}
            >
                Create Project
            </button> */}
            </div>
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
        </div>
    )
}

export default ClassicEditor