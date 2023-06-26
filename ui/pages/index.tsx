import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "@/components/Editor";
import { TauriEvent, listen } from "@tauri-apps/api/event";
import { about, cleanProject, generateProjectFiles, nameSetter, openIDLFile, saveIDLFile, selectTemplateFolder } from "@/helpers";
import Layout from "@/components/Layout";
import { useIDL } from "@/context/IDL";

export default function Home() {

  const { IDL, setIDL } = useIDL()
  const [templateFolder, setTemplateFolder] = useState<any>(undefined);
  const [baseFolder, setBaseFolder] = useState<any>(undefined);
  const exportData = generateProjectFiles(IDL.name, templateFolder, setTemplateFolder, setBaseFolder);
  const handleTemplateFolder = selectTemplateFolder(setTemplateFolder);
  const openIDL = openIDLFile(IDL, setIDL);
  const newProject = cleanProject(setIDL);
  const generateIDL = saveIDLFile(setBaseFolder, IDL.version, IDL.name, IDL.instructions, IDL.accounts, IDL.types, IDL.events, IDL.errors, IDL.metadata);

  // useEffect(() => {
  //   (async () => {
  //     const unlisten = await listen(TauriEvent.MENU, (event) => {
  //       switch (event?.payload
  //       ) {
  //         case "new_project":
  //           newProject();
  //           break;
  //         case "open_idl":
  //           openIDL();
  //           break;
  //         case "change_template":
  //           handleTemplateFolder();
  //           break;
  //         case "generate_project":
  //           exportData();
  //           break;
  //         case "generate_idl":
  //           generateIDL();
  //           break;
  //         case "about":
  //           about();
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //     return () => {
  //       unlisten();
  //     };
  //   })();
  // }, []);

  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate Solana projects from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout openIDL={openIDL} newProject={newProject} generateIDL={generateIDL} handleTemplateFolder={handleTemplateFolder} exportData={exportData}>
        <Editor generateIDL={generateIDL}/>
      </Layout>
    </>
  );
}
