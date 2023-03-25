import { Section } from "@/components/section";
import Head from "next/head";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

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
  const exportData = () => {
    const idl = JSON.stringify({
      version: "0.1.0",
      name,
      instructions,
      accounts,
      types,
      events,
      errors,
    });

    invoke("generate", { idl }).then(console.log).catch(console.error);
  };

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
        <input
          placeholder="Project's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-5 mb-5 m-5 bg-black text-white text-center text-base font-mono rounded-md ring-2 ring-neutral-700"
        />
        {[
          {
            name: "Instructions",
            item: instructions,
            setItem: setInstructions,
            initExpanded: true,
          },
          {
            name: "Accounts",
            item: accounts,
            setItem: setAccounts,
            initExpanded: false,
          },
          {
            name: "Types",
            item: types,
            setItem: setTypes,
            initExpanded: false,
          },
          {
            name: "Events",
            item: events,
            setItem: setEvents,
            initExpanded: false,
          },
          {
            name: "Errors",
            item: errors,
            setItem: setErrors,
            initExpanded: false,
          },
        ].map(({ item, setItem, name, initExpanded }) => (
          <Section
            key={name}
            name={name}
            content={item}
            setContent={setItem}
            initExpanded={initExpanded}
          />
        ))}
        <button
          type="button"
          className="mx-auto px-5 py-2 my-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200  "
          onClick={exportData}
        >
          Create Project
        </button>
      </main>
    </>
  );
}
