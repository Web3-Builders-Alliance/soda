import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import handleBaseFolder from "./handleBaseFolder";

const saveIDLFile = (setBaseFolder: Function, version: string | undefined, name: string, instructions: any, accounts: any, types: any, events: any, errors: any, metadata: any) => {
    return async () => {
      try {
        const result = await open({
          multiple: false,
          directory: true,
          title: "Select a target folder",
        });
        if (typeof result !== "string")return;
        handleBaseFolder(result, setBaseFolder);
        invoke("generate_idl_file")
          .then(async () => {
            await message(`Output path: ${result}/idl.json`, "IDL File generated");
          })
          .catch(async (e) => {
            await message(e?.error ?? "generate_idl_file Error", { title: "Error trying to save IDL file in the selected location", type: "error" });
          });
      } catch (e) {
        await message(`${e}`, {
          title: "Something fail while tryng to generate an IDL File.",
          type: "error",
        });
      }
    };
  }
  
export default saveIDLFile;