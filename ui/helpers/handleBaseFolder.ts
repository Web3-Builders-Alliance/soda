import { invoke } from "@tauri-apps/api/tauri";

const handleBaseFolder = (base: string, setBaseFolder: Function) => {
    invoke("update_base_folder_path", { base } ).then(() => setBaseFolder(base));
  };

  export default handleBaseFolder;