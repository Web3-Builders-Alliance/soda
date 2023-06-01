import { FC } from "react";
import { Section } from "@/components/section";

export const Editor: FC<any> = ({
    name,
    setName,
    instructions,
    setInstructions,
    accounts,
    setAccounts,
    types,
    setTypes,
    events,
    setEvents,
    errors,
    setErrors,
}) => (
    <>
        <input
            placeholder="Project's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-5 mb-5 m-5 bg-black text-white text-center text-base font-mono rounded-md ring-2 ring-neutral-700"
        />
        {
            [
                {
                    name: "Instructions",
                    item: instructions,
                    setItem: setInstructions,
                    initExpanded: true,
                },
                {
                    name: "Accounts",
                    item: accounts,
                    setItem: setAccounts,
                    initExpanded: false,
                },
                {
                    name: "Types",
                    item: types,
                    setItem: setTypes,
                    initExpanded: false,
                },
                {
                    name: "Events",
                    item: events,
                    setItem: setEvents,
                    initExpanded: false,
                },
                {
                    name: "Errors",
                    item: errors,
                    setItem: setErrors,
                    initExpanded: false,
                },
            ].map(({ item, setItem, name, initExpanded }) => (
                <Section
                    key={name}
                    name={name}
                    content={item}
                    setContent={setItem}
                    initExpanded={initExpanded}
                />
            ))
        }
    </>
);
