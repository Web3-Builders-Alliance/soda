import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";
import { useRouter } from "next/router"

const Home: NextPage = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });

  return (
    <>
      <Head>
        <title>deposit</title>
        <meta name="description" content="deposit" />
      </Head>
    </>
  );
};

export default Home;
