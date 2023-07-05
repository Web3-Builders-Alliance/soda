import { web3 } from "@project-serum/anchor";

export const addFriend = (program, name, age, gender, profileUrl, description, country, userProfile, addFriend, authority, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .addFriend( name, age, gender, profileUrl, description, country,)
          .accounts({
            userProfile,
            addFriend,
            authority,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};
