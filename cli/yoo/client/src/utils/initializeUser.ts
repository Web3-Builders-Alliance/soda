import { web3 } from "@project-serum/anchor";

export const initializeUser = (program, name, age, gender, profileUrl, description, country, userProfile, authority, systemProgram, clock,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .initializeUser( name, age, gender, profileUrl, description, country,)
          .accounts({
            userProfile,
            authority,
            systemProgram,
            clock,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};
