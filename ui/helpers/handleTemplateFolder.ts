import { invoke } from "@tauri-apps/api/tauri";

const handleTemplateFolder = (template: string, setTemplateFolder: Function) => {
    invoke("update_template_folder_path", { template } ).then(() => setTemplateFolder(template));
  };

  export default handleTemplateFolder;