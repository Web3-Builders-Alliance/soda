import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { Editor } from "@/components/Editor";
import { emit, listen } from "@tauri-apps/api/event";
import { message } from "@tauri-apps/api/dialog";
import { ask } from '@tauri-apps/api/dialog';

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

  const exportData = async () => {
    const idl = JSON.stringify({
      version,
      name,
      instructions,
      accounts,
      types,
      events,
      errors,
      metadata,
    });

    try {
      let template = templateFolder;
      if (templateFolder === undefined) {
        await message(
          "You need to select a template folder before generate the project",
          "Select a Template folder",
        );
        template = await open({
          multiple: false,
          directory: true,
          title: "Select a template folder",
        });
        setTemplateFolder(template);
        await message(
          "Select in wich folder you want to generate the project",
          "Select a output folder",
        );
      }
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      });
      setBaseFolder(result);

      invoke("generate", { baseFolder: result, idl, templateFolder: template })
        .then(async () => {
          await message(`Output path: ${result}/${name}`, "Project generated");
        })
        .catch(async (e) => {
          await message(e, { title: "Error", type: "error" });
        });
    } catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to export data.",
        type: "error",
      });
    }
  };

  const handleTemplateFolder = async () => {
    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a template folder",
      });
      async () => {
        await message(`Template path: ${result}`, "Template Seleccionado");
      };
      setTemplateFolder(result);
    } catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to open the template folder.",
        type: "error",
      });
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
      if (typeof result !== "string") {
        await message(
          `The type resulted of the selection is ${typeof result}`,
          {
            title: "Something fail while tryng to open an IDL File.",
            type: "error",
          }
        );
      } else {
        const idl = await readTextFile(result);
        console.log(idl);
        const parsed = JSON.parse(idl);
        if (parsed.name) setName(parsed.name);
        if (parsed.instructions) setInstructions(parsed.instructions);
        if (parsed.accounts) setAccounts(parsed.accounts);
        if (parsed.types) setTypes(parsed.types);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.errors) setErrors(parsed.errors);
        if (parsed.metadata) setMetadata(parsed.metadata);
      }
    } catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to open an IDL File.",
        type: "error",
      });
    }
  };

  const newProject = async () => {
    const confirm = await ask('Are you sure?', 'This will close your previus project');
    if (!confirm) return;
    setVersion("0.1.0");
    setName("Project's Name");
    setInstructions([
      {
        name: "initialize",
      },
    ]);
    setAccounts([]);
    setTypes([]);
    setEvents([]);
    setErrors([]);
    setMetadata(undefined);
  };

  const generateIDL = async () => {
    try {
      const result = await open({
        multiple: false,
        directory: true,
        title: "Select a target folder",
      });
      setBaseFolder(result);
      invoke("generate_idl_file", {
        baseFolder: result,
        idl: JSON.stringify({
          version,
          name,
          instructions,
          accounts,
          types,
          events,
          errors,
          metadata,
        }),
      })
        .then(async () => {
          await message(`Output path: ${result}/idl.json`, "Project generated");
        })
        .catch(async (e) => {
          await message(e, { title: "Error", type: "error" });
        });
    } catch (e) {
      await message(`${e}`, {
        title: "Something fail while tryng to generate an IDL File.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const unlisten = await listen("open_idl", (event) => openIDLFile());
      return () => {
        unlisten();
      };
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const unlisten = await listen("change_template", (event) =>
        handleTemplateFolder()
      );
      return () => {
        unlisten();
      };
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const unlisten = await listen("generate_project", (event) =>
        exportData()
      );
      return () => {
        unlisten();
      };
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const unlisten = await listen("new_project", (event) => newProject());
      return () => {
        unlisten();
      };
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const unlisten = await listen("generate_idl", (event) => generateIDL());
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
