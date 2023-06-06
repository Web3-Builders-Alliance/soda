import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";

const selectTemplateFolder = (setTemplateFolder: Function) => {
    return async () => {
      try {
        const result = await open({
          multiple: false,
          directory: true,
          title: "Select a template folder",
        });
        async () => {
          await message(`Template path: ${result}`, "Template Seleccionado");
        };
        setTemplateFolder(result);
      } catch (e) {
        await message(`${e}`, {
          title: "Something fail while tryng to open the template folder.",
          type: "error",
        });
      }
    };
  }
  
  export default selectTemplateFolder;