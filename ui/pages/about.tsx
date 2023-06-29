import Head from "next/head";
import Image from "next/image";
import { open } from "@tauri-apps/api/shell";

export default function About() {
  return (
    <>
      <Head>
        <title>Soda</title>
        <meta name="description" content="Generate your project from an UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[black] flex flex-col justify-center min-h-screen text-white">
        <Image
          src="/soda.svg"
          alt="soda"
          width={200}
          height={200}
          className="mx-auto"
        />

        <div className="p-5 ml-5">
          <div
            onClick={() => {
              open("https://twitter.com/marchedev");
            }}
            className="cursor-pointer"
          >
            <strong>Juan Patricio Marchetto</strong> Creator && Dev && User
          </div>

          <div
            onClick={() => {
              open("https://twitter.com/agosende");
            }}
            className="cursor-pointer"
          >
            <strong>Agustin Gosende</strong> BD & Mental Craftsman
          </div>

          <div
            onClick={() => {
              open("https://twitter.com/mic_y_mouse");
            }}
            className="cursor-pointer"
          >
            <strong>Santiago Vallesi</strong> Storytelling & Prompter
          </div>

          <div>
            <strong>Sergio Ariel Solis</strong> Front End Dev
          </div>

          <div>
            <strong>Juan Ferrand</strong> Design
          </div>

          <div>
            <strong>Jeff Rothstein</strong> Advisor
          </div>

          <div>
            <strong>Nathaniel Hughes</strong> Advisor
          </div>

          <div
            onClick={() => {
              open("https://twitter.com/007Ahzam");
            }}
            className="cursor-pointer"
          >
            <strong>Ahzam Akhtar</strong> Contributor
          </div>

          <div
            onClick={() => {
              open("https://twitter.com/mikehale");
            }}
            className="cursor-pointer"
          >
            <strong>Mike Hale</strong> Contributor
          </div>

          <h4 className="text-xl mt-5">Incubators</h4>

          <div
            onClick={() => {
              open("https://twitter.com/ComeBuidlwithUs");
            }}
            className="cursor-pointer"
          >
            <strong>Web3 Builders Alliance</strong>
          </div>

          <div
            onClick={() => {
              open("https://cooperativamental.com/en-EN");
            }}
            className="cursor-pointer"
          >
            <strong>Cooperativa Mental</strong>
          </div>
        </div>
        <h2 className="text-2xl text-center my-5">Powered by</h2>
        <Image
          src="/solana.svg"
          alt="soda"
          width={500}
          height={500}
          className="mx-auto cursor-pointer"
          onClick={() => {
            open("https://solana.org/");
          }}
        />
      </main>
    </>
  );
}
