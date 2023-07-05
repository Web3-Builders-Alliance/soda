import { web3 } from "@project-serum/anchor";

export const addStatus = (program, status, name, profileUrl, userProfile, statusAccount, authority, systemProgram, clock,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .addStatus( status, name, profileUrl,)
          .accounts({
            userProfile,
            statusAccount,
            authority,
            systemProgram,
            clock,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};
