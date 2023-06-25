import { message } from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import handleBaseFolder from "./handleBaseFolder";

const generateProjectFiles = (
  name: string,
  templateFolder: any,
  setTemplateFolder: Function,
  setBaseFolder: Function,
) => {
  return async () => {
    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      });
      if (typeof result !== "string") return;
      handleBaseFolder(result, setBaseFolder);

      invoke("generate")
        .then(async () => {
          await message(`Output path: ${result}/${name}`, "Project generated");
        })
        .catch(async (e) => {
          await message(e?.error ?? "Error", { title: "Error while creating projects files", type: "error" });
        });
    } catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to export data.",
        type: "error",
      });
    }
  };
};

export default generateProjectFiles;
