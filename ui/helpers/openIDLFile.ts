import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

const openIDLFile = (setName: Function, setInstructions: Function, setAccounts: Function, setTypes: Function, setEvents: Function, setErrors: Function, setMetadata: Function) => {
    return async () => {
      try {
        const result = await open({
          multiple: false,
          directory: false,
          title: "Select an IDL file",
          filters: [
            {
              name: "IDL",
              extensions: ["json"],
            },
          ],
        });
        if (typeof result !== "string") {
          await message(
            `The type resulted of the selection is ${typeof result}`,
            {
              title: "Something fail while tryng to open an IDL File.",
              type: "error",
            }
          );
        } else {
          const idl = await readTextFile(result);
          console.log(idl);
          const parsed = JSON.parse(idl);
          if (parsed.name)
            setName(parsed.name);
          if (parsed.instructions)
            setInstructions(parsed.instructions);
          if (parsed.accounts)
            setAccounts(parsed.accounts);
          if (parsed.types)
            setTypes(parsed.types);
          if (parsed.events)
            setEvents(parsed.events);
          if (parsed.errors)
            setErrors(parsed.errors);
          if (parsed.metadata)
            setMetadata(parsed.metadata);
        }
      } catch (e) {
        await message(`${e}`, {
          title: "Something fail while tryng to open an IDL File.",
          type: "error",
        });
      }
    };
  }
  
  export default openIDLFile;