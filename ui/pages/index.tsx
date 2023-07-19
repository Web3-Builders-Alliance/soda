import Head from "next/head";
import { useEffect, useState, Fragment, useRef } from "react";
import { TauriEvent, listen } from "@tauri-apps/api/event";
import { about, cleanProject, generateProjectFiles, nameSetter, openIDLFile, saveIDLFile, saveTemplateFile, selectTemplateFolder, templateFromFolder } from "@/helpers";
import Layout from "@/components/Layout";
import { useIDL } from "@/context/IDL";
import { NewEditor } from "@/components/NewEditor/Editor";
import ClassicEditor from "@/components/ClassicEditor/Editor";
import { Dialog, Transition } from '@headlessui/react'
import {
  PlusIcon,
  FolderOpenIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  FolderArrowDownIcon
} from '@heroicons/react/24/outline'
import JSONEditor from "@/components/JSONEditor";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

export default function Home() {

  const { IDL, setIDL } = useIDL()
  const [templateFolder, setTemplateFolder] = useState<any>(undefined);
  const [selectedUI, setSelectedUI] = useState("cards")
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  const exportData = generateProjectFiles(IDL.name, templateFolder, setTemplateFolder, setBaseFolder);
  const handleTemplateFolder = selectTemplateFolder(setTemplateFolder);
  const openIDL = openIDLFile(IDL, setIDL);
  const newProject = cleanProject(setIDL);
  const generateIDL = saveIDLFile(setBaseFolder, IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [width, setWidth] = useState(true)
  const [hidden, setHidden] = useState(false)

  const navigation = [
    {
      name: 'Open IDL file',
      href: '#',
      event: openIDL
    },
    {
      name: 'New IDL',
      href: '#',
      event: newProject
    },
    {
      name: 'Save IDL',
      href: '#',
      event: generateIDL
    },
    {
      name: 'Select a template',
      href: '#',
      event: handleTemplateFolder
    },
    {
      name: 'Create Project',
      href: '#',
      event: exportData
    },
  ]

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
          case "about":
            about();
            break;
          case "template_from_folder":
            templateFromFolder();
            break;
          case "save_template_file":
            saveTemplateFile()
          default:
            break;
        }
      });
      return () => {
        unlisten();
      };
    })();
  }, []);

  const render = () => {
    const view = {
      cards: <ClassicEditor exportData={exportData} />,
      tables: <NewEditor generateIDL={generateIDL} />
    }

    if (selectedUI !== "json") {
      return (
        <div className="flex h-full ">
          <div className="h-full w-full overflow-auto">
            <CodeBracketIcon
              onClick={() => {
                if (width) {
                  setWidth(false)
                  setTimeout(() => {
                    setHidden(true)
                  }, 450)
                } else {
                  setHidden(false)
                  setTimeout(() => {
                    setWidth(true)
                  }, 0)

                }
              }}
              className="sticky ml-auto mr-2 top-2 w-6 h-6 text-white z-50 cursor-pointer hover:text-greenn "
            />
            {view[selectedUI as keyof typeof render]}
          </div>
          <div className={`${width ? "w-6/12" : "w-0"} ${hidden ? "hidden" : ""} transition-[width] ease-in-out duration-700 border border-border rounded-l-lg`}>
            <JSONEditor noeditable />
          </div>
        </div>
      )
    } else {
      return <JSONEditor />
    }

  }

  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate Solana projects from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" />
            </Transition.Child>

            <div className="fixed inset-0 flex ">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue px-6 pb-2">

                    <div className="flex h-16 shrink-0 items-center">
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {
                              navigation.map((item) => (
                                <li
                                  key={item.name}
                                  onClick={item?.event}
                                >
                                  <a
                                    href={item.href}
                                    className={'text-chok hover:text-inputs hover:bg-chok group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))
                            }
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="sticky top-0 z-40 h-20 flex items-center justify-between gap-x-6 bg-backg  shadow-sm px-6">
          <div className="flex gap-8 justify-center items-center">
            <button type="button" className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green hover:text-green focus:bg-inputs active:outline-none active:ring active:ring-border" onClick={newProject}>
              <PlusIcon className="h-5 w-5" aria-hidden="true" />New
            </button>
            <button type="button" className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green hover:text-green focus:bg-inputs active:outline-none active:ring active:ring-border" onClick={openIDL}>
              <FolderOpenIcon className="h-5 w-5" aria-hidden="true" />Open
            </button>
            <button type="button" className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green hover:text-green focus:bg-inputs active:outline-none active:ring active:ring-border" onClick={generateIDL}>
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />Save
            </button>
            <button type="button" className="-m-2.5 p-2.5 text-chok text-sm inline-flex items-center gap-x-1.5 rounded-md border border-border hover:bg-inputs hover:shadow-md hover:shadow-green hover:text-green focus:bg-inputs active:outline-none active:ring active:ring-border" onClick={exportData}>
              <FolderArrowDownIcon className="h-5 w-5" aria-hidden="true" />Export
            </button>
          </div>
          <div className="text-chok flex gap-5">
            <p className="text-border">Views:</p>
            <button onClick={() => setSelectedUI("cards")} className={`${selectedUI === "cards" && "text-green underline"}`}>cards</button> 
            <button onClick={() => setSelectedUI("tables")} className={`${selectedUI === "tables" && "text-green underline"}`}>tables</button> 
            <button onClick={() => setSelectedUI("json")} className={`${selectedUI === "json" && "text-green underline"}`}>JSON</button>

          </div>
        </div>
        <main className=" h-[calc(100%_-_5rem)] bg-backg ">
          {render()}
        </main>
      </div>

    </>
  );
}
