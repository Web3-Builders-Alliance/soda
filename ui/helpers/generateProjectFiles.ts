import { message } from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import handleBaseFolder from "./handleBaseFolder";
import handleTemplateFolder from "./handleTemplateFolder";

const generateProjectFiles = (
  version: string | undefined,
  name: string,
  instructions: any,
  accounts: any,
  types: any,
  events: any,
  errors: any,
  metadata: any,
  templateFolder: any,
  setTemplateFolder: Function,
  setBaseFolder: Function,
) => {
  return async () => {
    const idl = JSON.stringify({
      version,
      name,
      instructions,
      accounts,
      types,
      events,
      errors,
      metadata,
    });

    try {
      let template = templateFolder;
      if (templateFolder === undefined) {
        await message(
          "You need to select a template folder before generate the project",
          "Select a Template folder"
        );
        template = await open({
          multiple: false,
          directory: true,
          title: "Select a template folder",
        });
        handleTemplateFolder(template, setTemplateFolder);
        await message(
          "Select in wich folder you want to generate the project",
          "Select a output folder"
        );
      }
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      });
      if (typeof result !== "string") return;
      handleBaseFolder(result, setBaseFolder);

      invoke("generate", { idl, templateFolder: template })
        .then(async () => {
          await message(`Output path: ${result}/${name}`, "Project generated");
        })
        .catch(async (e) => {
          await message(e, { title: "Error", type: "error" });
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
