import { FC, useState } from "react";
import { Section } from "@/components/section";
import { useIDL } from "@/context/IDL";

export const Editor: FC<any> = ({
    // name,
    // setName,
    // instructions,
    // setInstructions,
    // accounts,
    // setAccounts,
    // types,
    // setTypes,
    // events,
    // setEvents,
    // errors,
    // setErrors,
}) => {

    const [select, setSelect] = useState("instructions")
    const { IDL, setIDL } = useIDL()
    // const options = [
    //     {
    //         name: "Instructions",
    //         item: instructions,
    //         setItem: setInstructions,
    //         initExpanded: false,
    //     },
    //     {
    //         name: "Accounts",
    //         item: accounts,
    //         setItem: setAccounts,
    //         initExpanded: false,
    //     },
    //     {
    //         name: "Types",
    //         item: types,
    //         setItem: setTypes,
    //         initExpanded: false,
    //     },
    //     {
    //         name: "Events",
    //         item: events,
    //         setItem: setEvents,
    //         initExpanded: false,
    //     },
    //     {
    //         name: "Errors",
    //         item: errors,
    //         setItem: setErrors,
    //         initExpanded: false,
    //     },
    // ]

    return (
        <div className=" flex flex-col gap-10 h-full font-mono m-10">
            <input
                placeholder="Project's Name"
                value={IDL.name}
                onChange={(e) => setIDL(e.target.value)}
                className=" w-3/12  p-5 bg-[#102042] text-white text-base rounded-xl"
            />
            <div className=" flex flex-col border border-white gap-2 h-full rounded-xl">
                <div className=" flex w-full text-center -space-x-1">
                    {
                        Object.keys(IDL).map((name, index) => {
                            if( name !== "name" && name !== "version" && name !== "metadata" )
                            return (
                                <div
                                    className={` ${select === name ? "z-20" : ""  } self-end w-full`}
                                    key={name}
                                >
                                    <div
                                        className={`${select === name ? "text-white h-[2.7rem] shadow-tabSelected" : "text-slate-400 h-10 shadow-tab"} shadow-white flex px-6 items-center justify-center  rounded-t-xl bg-[#1E1E1E]`}
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
                <Section instruction={select}/>
            </div>
        </div>
    )
};
