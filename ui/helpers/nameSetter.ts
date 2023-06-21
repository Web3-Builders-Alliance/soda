import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
const nameSetter = (name: string, setName: Function) => {
    if (name === "Chewing Glass") {
        invoke("new_window", { target: "bubbles" })
            .catch(async (e) => {
                await message(e, { title: "Error", type: "error" });
            });
    };
    setName(name);
}
export default nameSetter;
