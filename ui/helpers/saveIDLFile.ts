import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";

const saveIDLFile = (setBaseFolder: Function, version: string | undefined, name: string, instructions: any, accounts: any, types: any, events: any, errors: any, metadata: any) => {
    return async () => {
      try {
        const result = await open({
          multiple: false,
          directory: true,
          title: "Select a target folder",
        });
        setBaseFolder(result);
        invoke("generate_idl_file", {
          baseFolder: result,
          idl: JSON.stringify({
            version,
            name,
            instructions,
            accounts,
            types,
            events,
            errors,
            metadata,
          }),
        })
          .then(async () => {
            await message(`Output path: ${result}/idl.json`, "Project generated");
          })
          .catch(async (e) => {
            await message(e, { title: "Error", type: "error" });
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