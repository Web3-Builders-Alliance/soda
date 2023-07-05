import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

import idl from "./idl.json";

export interface Wallet {
  signTransaction(
    tx: anchor.web3.Transaction
  ): Promise<anchor.web3.Transaction>;
  signAllTransactions(
    txs: anchor.web3.Transaction[]
  ): Promise<anchor.web3.Transaction[]>;
  publicKey: anchor.web3.PublicKey;
}

type ProgramProps = {
  connection: Connection;
  wallet?: Wallet;
};

export const useProgram = ({ connection, wallet }: ProgramProps) => {
  const [isProgramId, setIsProgramId] = useState(false);
  const [programId, setProgramId] = useState(
    "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"
  );

  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();
  const PROGRAM = idl.metadata.address;

  useEffect(() => {
    if (PROGRAM) {
      const programID = (PROGRAM);
      setProgramId(programID);
      setIsProgramId(true);
    } else {
      setProgramId(
        ("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS")
      );
      setIsProgramId(false);
    }
  },[isProgramId]);

  const submit = (programId : any) => {
    setProgramId(programId)
    setIsProgramId(true)
    console.log(programId)
    console.log(isProgramId)
  }

  const programIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramId(event.target.value)
  }

  useEffect(() => {
    updateProgram();
  }, [connection, wallet]);

  const updateProgram = () => {
    if (!wallet) return;
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
    });
    const program = new anchor.Program(idl as any, new PublicKey(programId), provider);
    setProgram(program);
  };

  return {
    program,
    isProgramId,
    setIsProgramId,
    programId,
    setProgramId,
    programIdHandler,
    submit
  };
};
