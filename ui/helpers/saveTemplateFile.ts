import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";

const saveTemplateFile = async () => {
    try {
    const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      })
        if (typeof result !== "string")return;
        invoke("generate_template_file", {path: `${result}/template.soda`})
          .then(async () => {
            await message(`Output path: ${result}/template.soda`, "Template generated");
          })
          .catch(async (e) => {
            await message(e?.error ?? "generate_idl_file Error", { title: "Error", type: "error" });
          });
      } catch (e) {
        await message(`${e}`, {
          title: "Something fail while trying to generate a Template File.",
          type: "error",
        });
      }
}

export default saveTemplateFile;