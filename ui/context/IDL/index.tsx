import { ReactNode, createContext, useContext, useEffect, SetStateAction, useState, Dispatch, useRef } from "react";

const IDLContext = createContext<any>({
    instructions: [],
    accounts: [],
    types: [],
    events: [],
    errors: [],
});

const IDLProvider = ({ children }: { children: ReactNode }) => {
    const [IDL, setIDL] = useState<any>({
        name: "",
        version: "0.1.0",
        instructions: [{
            name: "initialize"
        }],
        accounts: [],
        types: [],
        events: [],
        errors: [],
        metadata: undefined
    });



    return (
        <IDLContext.Provider value={{ IDL, setIDL }}>
            {children}
        </IDLContext.Provider>
    );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
