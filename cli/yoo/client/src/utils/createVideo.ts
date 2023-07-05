import { web3 } from "@project-serum/anchor";

export const createVideo = (program, content, userName, description, profileUrl, userProfile, videoAccount, authority, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .createVideo( content, userName, description, profileUrl,)
          .accounts({
            userProfile,
            videoAccount,
            authority,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};
