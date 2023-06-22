import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";

const selectTemplateFolder = (setTemplateFolder: Function) => {
  return async () => {
    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a template folder",
      });
        invoke("update_template", { templateFolder: result }).then(async () => {
          setTemplateFolder(result)
          await message(`Template path: ${result}`, "Template Seleccionado");
        });
      
    }
    catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to open the template folder.",
        type: "error",
      });
    }
  };
}

export default selectTemplateFolder;