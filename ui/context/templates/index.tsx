import { ReactNode, createContext, useContext, useState } from "react";
import SeahorseIcon from "@/public/seahorse.png"
import AnchorImg from "@/public/anchor.png"
import SolanaFundationIcon from "@/public/solanafundation.png"

const TemplateContext = createContext<any>({
    templates: [],
});

const TemplatesProvider = ({ children }: { children: ReactNode }) => {
    const [templates, setTemplates] = useState([
        {
            name: "Anchor",
            icon: AnchorImg,
            version: "1.0.0",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, molestiass .",
            broughtBy: {
                icon: SolanaFundationIcon,
                name: "Solana Fundation"
            }
        }
    ]);

    return (
        <TemplateContext.Provider value={{ templates }}>
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };