import { Section } from "@/components/section";
import Head from "next/head";
import { useState } from "react";

type Err = {
  message?: String;
};

export default function Home() {
  const [error, setError] = useState<Err | false>();
  const [name, setName] = useState<string>("name");
  const [instructions, setInstructions] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [accounts, setAccounts] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const [errors, setErrors] = useState<any>([]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({
        version: "0.1.0",
        name,
        instructions,
        accounts,
        types,
        events,
        errors,
      })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "idl.json";

    link.click();
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
      <main className="bg-gray-800">
        {[
          { name: instructions, item: instructions, setItem: setInstructions },
          { name: types, item: types, setItem: setTypes },
          { name: accounts, item: accounts, setItem: setAccounts },
          { name: events, item: events, setItem: setEvents },
          { name: errors, item: errors, setItem: setErrors },
        ].map(({ item, setItem, name }) => (
          <Section key={name} content={item} setContent={setItem} />
        ))}
        <button type="button" onClick={exportData}>
          Download IDL
        </button>
      </main>
    </>
  );
}
