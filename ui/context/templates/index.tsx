import { ReactNode, createContext, useContext, useState } from "react";
import SeahorseIcon from "@/public/seahorse.png"
import AnchorImg from "@/public/anchor.png"
import SolanaFundationIcon from "@/public/solanafundation.png"

const TemplateContext = createContext<any>({
    templates: [],
});

const TemplatesProvider = ({ children }: { children: ReactNode }) => {
    const [templates, setTemplates] = useState([]);

    return (
        <TemplateContext.Provider value={{ templates, setTemplates }}>
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplates = () => useContext(TemplateContext);

export { TemplatesProvider, useTemplates };