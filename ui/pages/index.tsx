import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "@/components/Editor";
import { TauriEvent, listen } from "@tauri-apps/api/event";
import { about, cleanProject, generateProjectFiles, nameSetter, openIDLFile, saveIDLFile, selectTemplateFolder } from "@/helpers";
import Layout from "@/components/Layout";
import { useIDL } from "@/context/IDL";

export default function Home() {
  // const [name, setName] = useState<string>("Project's Name");
  // const [instructions, setInstructions] = useState<any>([
  //   {
  //     name: "initialize",
  //   },
  // ]);
  // const [accounts, setAccounts] = useState<any>([]);
  // const [types, setTypes] = useState<any>([]);
  // const [events, setEvents] = useState<any>([]);
  // const [errors, setErrors] = useState<any>([]);
  const { IDL, setIDL } = useIDL()
  const [templateFolder, setTemplateFolder] = useState<any>(undefined);
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  // const [version, setVersion] = useState<string | undefined>("0.1.0");
  // const [metadata, setMetadata] = useState<any>(undefined);

  const exportData = generateProjectFiles(IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata, templateFolder, setTemplateFolder, setBaseFolder);
  const handleTemplateFolder = selectTemplateFolder(setTemplateFolder);
  const openIDL = openIDLFile(IDL, setIDL);
  const newProject = cleanProject(setIDL);
  const generateIDL = saveIDLFile(setBaseFolder, IDL.version , IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);

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

      {/* <main className="bg-neutral-900 py-5 flex flex-col justify-center min-h-screen">
        <div className="flex">
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
            New IDL
          </button>
          <button
            type="button"
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200 "
            onClick={generateIDL}
          >
            Save IDL
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
            className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200"
            onClick={exportData}
          >
            Create Project
          </button>
        </div> */}
        <Layout openIDL={openIDL} newProject={newProject} generateIDL={generateIDL} handleTemplateFolder={handleTemplateFolder} exportData={exportData}>
          <Editor />
        </Layout>
      {/* </main> */}
    </>
  );
}
