import { egg } from "@/helpers";
const nameSetter = (name: string, setName: Function) => {
    if (name === (process.env.egg ?? "Chewing Glass")) egg();
    setName(name);
}
export default nameSetter;
