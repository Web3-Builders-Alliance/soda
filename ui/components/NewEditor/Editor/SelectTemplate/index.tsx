import ArrowBack from "@/public/ArrowBack.png"
import SolanaIcon from "@/public/SolanaIcon.png"

import Image from "next/image";
import { useRouter } from "next/router";
import { useTemplates } from "@/context/templates";
import CardTemplate from "./CardTemplate";


const SelectTemplate = () => {
    const { templates } = useTemplates()
    const router = useRouter()

    return (
        <div className="fixed z-50 top-0 left-0 h-screen w-screen">
            <div className="absolute h-[70%] w-11/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10 overflow-auto rounded-3xl bg-[#242f34] [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col w-full overflow-hidden">
                    <div className="flex bg-[#0c1f3f] p-3 justify-between gap-2 w-full items-center">
                        <Image src={ArrowBack} alt="back all project" className="w-4 h-4" onClick={() => router.push("/newProject")} />

                        <div className="flex text-white gap-4 font-semibold w-full items-center overflow-hidden">
                            Templates
                        </div>
                        <Image className="w-6 h-6" src={SolanaIcon} alt="back all project" />
                    </div>
                    <div className="p-4">
                        {
                            templates.map((template: any) => {
                                return (
                                    <CardTemplate key={template.name} template={template} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectTemplate
