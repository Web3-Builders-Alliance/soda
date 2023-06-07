import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";

const about = () => {
    invoke("show_about")
    .then(
        ()=>{console.log("about");}
    )
    .catch(async (e) => {
      await message(e, { title: "Error", type: "error" });
    });
};

export default about;