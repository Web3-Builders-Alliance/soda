import { web3 } from "@project-serum/anchor";

export const initialize = (program, owner, vaultState, vaultAuth, vault, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .initialize()
          .accounts({
            owner,
            vaultState,
            vaultAuth,
            vault,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const deposit = (program, amount, owner, vaultState, vaultAuth, vault, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .deposit( amount,)
          .accounts({
            owner,
            vaultState,
            vaultAuth,
            vault,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const withdraw = (program, amount, owner, vaultState, vaultAuth, vault, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .withdraw( amount,)
          .accounts({
            owner,
            vaultState,
            vaultAuth,
            vault,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const depositSpl = (program, amount, owner, ownerAta, vaultState, vaultAuth, vaultAta, tokenMint, tokenProgram, associatedTokenProgram, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .depositSpl( amount,)
          .accounts({
            owner,
            ownerAta,
            vaultState,
            vaultAuth,
            vaultAta,
            tokenMint,
            tokenProgram,
            associatedTokenProgram,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const withdrawSpl = (program, amount, owner, ownerAta, vaultState, vaultAuth, vaultAta, tokenMint, tokenProgram, associatedTokenProgram, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .withdrawSpl( amount,)
          .accounts({
            owner,
            ownerAta,
            vaultState,
            vaultAuth,
            vaultAta,
            tokenMint,
            tokenProgram,
            associatedTokenProgram,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

