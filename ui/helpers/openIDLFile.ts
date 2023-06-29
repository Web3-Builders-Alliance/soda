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
      if (typeof result === "string") {
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
        // if (parsed.name) setIDL({
        //   ...IDL,
        //   name: parsed.name
        // });
        // if (parsed.instructions) setIDL({
        //   ...IDL,
        //   instructions: parsed.instructions
        // });
        // if (parsed.accounts) setIDL({
        //   ...IDL,
        //   accounts: parsed.accounts
        // });
        // if (parsed.types) setIDL({
        //   ...IDL,
        //   types: parsed.types
        // });
        // if (parsed.events) setIDL({
        //   ...IDL,
        //   events: parsed.events
        // });
        // if (parsed.errors) setIDL({
        //   ...IDL,
        //   errors: parsed.errors
        // });
        // if(parsed.metadata) setIDL({
        //   ...IDL,
        //   errors: parsed.errors
        // });
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