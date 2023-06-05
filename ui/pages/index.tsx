import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { Editor } from "@/components/Editor";
import { emit, listen } from '@tauri-apps/api/event'
import { s } from "@tauri-apps/api/dialog-15855a2f";

type Err = {
  message?: String;
};

export default function Home() {
  const [error, setError] = useState<Err | false>();
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

  const exportData = async () => {
    const idl = JSON.stringify({
      version: "0.1.0",
      name,
      instructions,
      accounts,
      types,
      events,
      errors,
    });

    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      });
      console.log(result);
      setBaseFolder(result);
      invoke("generate", { baseFolder: result, idl, templateFolder }).then(console.log).catch(console.error);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTemplateFolder = async () => {
    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a template folder",
      });
      console.log(result);
      setTemplateFolder(result);
    } catch (e) {
      console.error(e);
    }
  };

  const openIDLFile = async () => {
    try {
      const result = await open({
        multiple: false,
        directory: false,
        title: "Select an IDL file",
        filters: [
          {
            name: "IDL",
            extensions: ["json"],
          },
        ],

      });
      console.log(result);
      if (typeof result !== "string") return;
      const idl = await readTextFile(result);
      console.log(idl);
      const parsed = JSON.parse(idl);
      if (parsed.name) setName(parsed.name);
      if (parsed.instructions) setInstructions(parsed.instructions);
      if (parsed.accounts) setAccounts(parsed.accounts);
      if (parsed.types) setTypes(parsed.types);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.errors) setErrors(parsed.errors);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      const unlistenOpen = await listen('open_idl', (event) => openIDLFile())
      const unlistenChange = await listen('change_template', (event) =>  handleTemplateFolder())
      return () => {
        unlistenOpen()
        unlistenChange()
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const unlistenGenerate = await listen('generate_project', (event) =>  exportData())
      return () => {
        unlistenGenerate()
      }
    })()
  }, [templateFolder])
  
  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error && (
        <div className="p-5 text-red text-center bg-white w-full absolute top-40">
          <h1>{error?.message ?? "ups something goes wrong"}</h1>
          <button
            className="p-2 m-2 mx-auto bg-purple-900 text-white mt-5"
            onClick={() => setError(false)}
          >
            Close
          </button>
        </div>
      )}
      <main className="bg-neutral-900 py-5 flex flex-col justify-center min-h-screen">
        <Editor
          name={name}
          setName={setName}
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
            onClick={openIDLFile}
          >
            Open IDL file
          </button>
        </div>
      </main>
    </>
  );
}
