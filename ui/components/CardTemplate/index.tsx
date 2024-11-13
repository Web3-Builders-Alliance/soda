import { useIDL } from "@/context/IDL";
import { checkNFT } from "@/helpers";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import JSZip from "jszip";
import Image from "next/image"
import { FC } from "react";

const CardTemplate: FC<any> = ({ template, indexTemplate }) => {
    const { IDL } = useIDL()
    const { connection } = useConnection()
    const wallet = useAnchorWallet();

    const exportProject = async () => {
        if (await checkNFT(connection, wallet)) {
            const response = await fetch(`https://soda.shuttleapp.rs/get_project_files/${indexTemplate}`, {
                method: "POST",
                body: JSON.stringify({ idl: IDL })
            })
            const { files } = await response.json()
            const zip = new JSZip();

            // Iterate over each file in the response
            files.forEach((file: any) => {
                const { path, content } = file;

                // Create folders and file in memory
                const folders = path.split('/');
                const fileName = folders.pop();

                let folder = zip;
                folders.forEach((folderName: any) => {
                    folder = folder.folder(folderName) as JSZip
                });

                // Set the content of the file
                if (typeof content.String != "undefined") {
                    folder.file(fileName, content.String);
                } else {
                    folder.file(fileName, content.Vec)
                }
            });

            // Generate the zip file asynchronously
            zip.generateAsync({ type: 'blob' }).then(blob => {
                // Provide a way for the user to download the zip file
                const url = URL.createObjectURL(blob);
                // Example: Create a download link and trigger the click event
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `${IDL.name || " "}.zip`;
                downloadLink.click();

                // Clean up the created URL object
                URL.revokeObjectURL(url);
            });
        } else {
            alert("need to be coneected with a wallet with the Soda NFT")
        }
    }
    
    return (
        <div className={` flex flex-col h-96 bg-backg p-5 w-52 rounded-3xl shadow-md shadow-black  text-white gap-3 justify-between items-center`}>
            <div className=" flex text-sm justify-between w-full">
                <p>
                    {
                        !template?.price ?
                            "Free Template"
                            :
                            `${template?.price?.toString()} ${template.currency} `
                    }
                </p>
                <p>v{template?.version}</p>
            </div>
            <div className=" flex flex-col w-full items-center justify-around">
                < Image className="h-20 w-20" width={5} height={2} src={template.image || "/soda.svg"} alt={template.name} />
                <p className=" text-sm">{template.name}</p>
                <p className=" text-xs overflow-y-auto h-">{template.description}</p>
            </div>
            {/* <div className="flex flex-col gap-2 ">
                <p className=" text-sm">Brought to you by</p>

                <div className="flex bg-[#183a5c] justify-center items-center h-10 w-full py-2 p-4 rounded-3xl">
                    <Image className="" src={template.icon || ""} alt={template.name} />
                </div>
            </div> */}
            <button
                className="text-white bg-[#387847] px-5 rounded-xl h-10"
                onClick={exportProject}
            >
                Export
            </button>
        </div>
    )
}

export default CardTemplate