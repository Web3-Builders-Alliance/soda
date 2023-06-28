import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { TauriEvent, listen } from "@tauri-apps/api/event";
import { about, cleanProject, generateProjectFiles, nameSetter, openIDLFile, saveIDLFile, saveTemplateFile, selectTemplateFolder, templateFromFolder } from "@/helpers";
import Layout from "@/components/Layout";
import { useIDL } from "@/context/IDL";
import { Section } from "@/components/ClassicEditor/section";
import { NewEditor } from "@/components/NewEditor/Editor";
import ClassicEditor from "@/components/ClassicEditor/Editor";
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import JSONEditor from "@/components/JSONEditor";

export default function Home() {

  const { IDL, setIDL } = useIDL()
  const [templateFolder, setTemplateFolder] = useState<any>(undefined);
  const [selectedUI, setSelectedUI] = useState("classic")
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  const exportData = generateProjectFiles(IDL.name, templateFolder, setTemplateFolder, setBaseFolder);
  const handleTemplateFolder = selectTemplateFolder(setTemplateFolder);
  const openIDL = openIDLFile(IDL, setIDL);
  const newProject = cleanProject(setIDL);
  const generateIDL = saveIDLFile(setBaseFolder, IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      classic: <ClassicEditor exportData={exportData} />,
      advanced: <NewEditor generateIDL={generateIDL} />,
      json: <JSONEditor />
    }

    return view[selectedUI as keyof typeof render]
  }

  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
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
              <div className="fixed inset-0 bg-gray-900/80" />
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
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#081635] px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* <Image
                                                height={25}
                                                width={25}
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company"
                                            /> */}
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
                                    className={'text-white hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}
                                  >
                                    {/* <item.icon
                                                                        className={'text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0'}
                                                                        aria-hidden="true"
                                                                    /> */}
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

        <div className="sticky top-0 z-40 flex items-center justify-between gap-x-6 bg-[#081635] px-4 py-4 shadow-sm sm:px-6">
          <button type="button" className="-m-2.5 p-2.5 text-white" onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="text-white flex gap-5">
            <button onClick={()=>setSelectedUI("classic")} className={`${selectedUI === "classic" && "text-[#D6BA4D]"}`}>Classic</button>
            <button onClick={()=>setSelectedUI("advanced")} className={`${selectedUI === "advanced" && "text-[#D6BA4D]"}`}>Advanced</button>
            <button onClick={()=>setSelectedUI("json")} className={`${selectedUI === "json" && "text-[#D6BA4D]"}`}>Json</button>

          </div>
        </div>

        <main className="pb-10 h-full bg-[#081635]">
          {render()}
        </main>
      </div>

    </>
  );
}
