import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  SetStateAction,
  useState,
  Dispatch,
  useRef,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

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
    instructions: [],
    accounts: [],
    types: [],
    events: [],
    errors: [],
    metadata: undefined,
  });

  const handleIDL = (IDL: any) => {
    const idl = JSON.stringify(IDL, null, 2);
    invoke("update_idl_string", { idl })
      .then(() => {
        if (IDL.name === "Chewing Glass") {
          invoke("new_window", { target: "bubbles" }).catch(async (e) => {
            await message(e, { title: "Error", type: "error" });
          });
        }
        setIDL(IDL);
      })
      .catch(async (e) => {
        await message(e, { title: "Error", type: "error" });
      });
  };

  return (
    <IDLContext.Provider value={{ IDL, setIDL: handleIDL }}>
      {children}
    </IDLContext.Provider>
  );
};

const useIDL = () => useContext(IDLContext);

export { IDLProvider, useIDL };
