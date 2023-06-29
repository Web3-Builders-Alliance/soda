import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

const openIDLFile = (IDL: any, setIDL: Function) => {
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
        setIDL({
          version: parsed.version,
          name: parsed.name,
          instructions: parsed.instructions ? parsed.instructions : [],
          accounts: parsed.accounts ? parsed.accounts : [],
          types: parsed.types ? parsed.types : [],
          events: parsed.events ? parsed.events : [],
          errors: parsed.errors ? parsed.errors : [],
          metadata: parsed.metadata
        })
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