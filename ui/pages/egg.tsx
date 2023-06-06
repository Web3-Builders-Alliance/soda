import Head from "next/head";

export default function Egg() {
  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-neutral-900 py-5 flex flex-col justify-center min-h-screen">
        Egg
      </main>
    </>
  );
}
