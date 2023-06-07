import { egg } from "@/helpers";
const nameSetter = (name: string, setName: Function) => name === (process.env.egg ?? "Chewing Glass") ? egg() : setName(name);
export default nameSetter;
