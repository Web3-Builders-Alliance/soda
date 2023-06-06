import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "@/components/Editor";
import { TauriEvent, listen } from "@tauri-apps/api/event";
import { cleanProject, egg, generateProjectFiles, openIDLFile, saveIDLFile, selectTemplateFolder } from "@/helpers";

export default function Home() {
  const [name, setName] = useState<string>("Project's Name");
  const [instructions, setInstructions] = useState<any>([
    {
      name: "initialize",
    },
  ]);
  const [accounts, setAccounts] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const [errors, setErrors] = useState<any>([]);
  const [templateFolder, setTemplateFolder] = useState<any>(undefined);
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  const [version, setVersion] = useState<string | undefined>("0.1.0");
  const [metadata, setMetadata] = useState<any>(undefined);
  
  const exportData = generateProjectFiles(version, name, instructions, accounts, types, events, errors, metadata, templateFolder, setTemplateFolder, setBaseFolder);
  const handleTemplateFolder = selectTemplateFolder(setTemplateFolder);
  const openIDL = openIDLFile(setName, setInstructions, setAccounts, setTypes, setEvents, setErrors, setMetadata);
  const newProject = cleanProject(setVersion, setName, setInstructions, setAccounts, setTypes, setEvents, setErrors, setMetadata);
  const generateIDL = saveIDLFile(setBaseFolder, version, name, instructions, accounts, types, events, errors, metadata);
  const handleName = (name: string) => {
    console.log(name);
    console.log(process.env.egg ?? "soda");
    console.log(name === process.env.egg ?? "soda")
    name === (process.env.egg ?? "soda") ? egg() : setName(name)};
  
  useEffect(() => {
    (async () => {
      const unlisten = await listen( TauriEvent.MENU, (event) => {
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
          default:
            break;
        }
      });
      return () => {
        unlisten();
      };
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-neutral-900 py-5 flex flex-col justify-center min-h-screen">
        <Editor
          name={name}
          setName={handleName}
          instructions={instructions}
          setInstructions={setInstructions}
          accounts={accounts}
          setAccounts={setAccounts}
          types={types}
          setTypes={setTypes}
          events={events}
          setEvents={setEvents}
          errors={errors}
          setErrors={setErrors}
        />
        <div className="flex">
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200"
            onClick={exportData}
          >
            Create Project
          </button>
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200"
            onClick={handleTemplateFolder}
          >
            Select a template
          </button>
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200 "
            onClick={openIDL}
          >
            Open IDL file
          </button>
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200 "
            onClick={newProject}
          >
            New Project
          </button>
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200 "
            onClick={generateIDL}
          >
            Save IDL
          </button>
        </div>
      </main>
    </>
  );
}
