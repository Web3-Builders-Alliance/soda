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
        if (typeof result === "string") {
        invoke("update_template", { templatePath: result })
            .then(async () => {
                await message(`Template path: ${result}`, "Template Selected");
            }).catch(async (e) => {
                await message(e?.error ?? "update_template Error", { title: "Error Trying to open the selected folder as a template", type: "error" });
            });
        }
    }
    catch (e) {
        await message(`${e}`, {
            title: "Something fail while tryng to open the template.",
            type: "error",
        });
    }
};

export default templateFromFolder;