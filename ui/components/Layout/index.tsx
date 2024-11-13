import { FC, useEffect, useState } from 'react'

import { useIDL } from '@/context/IDL'
import { ArrowDownTrayIcon, FolderArrowDownIcon, FolderOpenIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { generateProjectFiles, openIDLFile, saveIDLFile, selectTemplateFolder, cleanProject } from "@/helpers";
import { useRouter } from 'next/router';
import { TauriEvent, listen } from '@tauri-apps/api/event';
import { useTemplates } from '@/context/templates';

const Layout: FC<any> = ({ children }) => {
    const router = useRouter()
    const {templateFolder} = useTemplates();
    const { IDL, setIDL } = useIDL()
    const openIDL = openIDLFile(setIDL);
    const [baseFolder, setBaseFolder] = useState<any>(undefined);
    const generateIDL = saveIDLFile(setBaseFolder, IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);
    const newProject = cleanProject(setIDL);
    const exportData = generateProjectFiles(IDL.name, setBaseFolder);
    const handleTemplateFolder = selectTemplateFolder();

    useEffect(() => {
        (async () => {
            const unlisten = await listen(TauriEvent.MENU, (event) => {
                switch (event?.payload
                ) {
                    case "new_project":
                        newProject();
                        break;
                    case "open_idl":
                        openIDL();
                        break;
                    case "change_template":
                        handleTemplateFolder();
                        break;
                    case "generate_project":
                        exportData();
                        break;
                    case "generate_idl":
                        generateIDL();
                        break;
                }
            });
            return () => {
                unlisten();
            };
        })();
    }, []);



    return (
        <div className='h-screen'>
            <div className="sticky top-0 z-40 h-20 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
                <div className="flex gap-8 justify-center items-center">
                    {
                        router.asPath === "/templates" &&
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                            onClick={() => {
                                router.push("/")
                            }}
                        >
                            <PencilSquareIcon className="h-5oko w-5" aria-hidden="true" />Editor
                        </button>
                    }
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={newProject}
                    >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />New
                    </button>
                    <input type="file" id="file" onChange={openIDL} className="hidden" />
                    <label
                        htmlFor="file"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                    >
                        <FolderOpenIcon className="h-5 w-5" aria-hidden="true" /> Open
                    </label>

                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={generateIDL}
                    >
                        <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> Download IDL
                    </button>
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green-custom hover:text-green-custom focus:bg-inputs active:outline-none active:ring active:ring-border"
                        onClick={exportData}
                    >
                        <FolderArrowDownIcon className="h-5oko w-5" aria-hidden="true" />Export
                    </button>

                </div>
            </div>
            <main className=" h-[calc(100%-5rem)] mini-scroll overflow-y-auto bg-backg">
                {children}
            </main>
        </div>
    )
}

export default Layout