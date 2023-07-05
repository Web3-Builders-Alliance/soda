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

