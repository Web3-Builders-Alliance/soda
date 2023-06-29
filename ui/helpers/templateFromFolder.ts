import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";

const templateFromFolder = async () => {
    try {
        const result = await open({
            directory: true,
            multiple: false,
            title: "Select a template file",
        });
        invoke("update_template", { templatePath: result }).then(async () => {
            await message(`Template path: ${result}`, "Template Selected");
        });
    }
    catch (e) {
        await message(`${e}`, {
            title: "Something fail while tryng to open the template.",
            type: "error",
        });
    }
};

export default templateFromFolder;