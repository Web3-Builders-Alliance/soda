import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";

const egg = () => {
  invoke("new_window", {target: "egg"})
    .then(() => {
      console.log("Egg");
    })
    .catch(async (e) => {
      await message(e, { title: "Error", type: "error" });
    });
};

export default egg;
