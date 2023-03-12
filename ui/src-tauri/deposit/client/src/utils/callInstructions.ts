import { web3 } from "@project-serum/anchor";

export const initialize = (program, depositAccount, pdaAuth, depositAuth, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .initialize()
          .accounts({
            depositAccount,
            pdaAuth,
            depositAuth,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const depositNative = (program, amount, depositAccount, pdaAuth, solVault, depositAuth, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .depositNative( amount,)
          .accounts({
            depositAccount,
            pdaAuth,
            solVault,
            depositAuth,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const withdrawNative = (program, amount, depositAccount, pdaAuth, solVault, depositAuth, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .withdrawNative( amount,)
          .accounts({
            depositAccount,
            pdaAuth,
            solVault,
            depositAuth,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const depositSpl = (program, amount, depositAccount, pdaAuth, depositAuth, toTokenAcct, fromTokenAcct, tokenMint, tokenProgram, associatedTokenProgram, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .depositSpl( amount,)
          .accounts({
            depositAccount,
            pdaAuth,
            depositAuth,
            toTokenAcct,
            fromTokenAcct,
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

export const withdrawSpl = (program, amount, depositAccount, pdaAuth, depositAuth, toTokenAcct, fromTokenAcct, tokenMint, tokenProgram, associatedTokenProgram, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .withdrawSpl( amount,)
          .accounts({
            depositAccount,
            pdaAuth,
            depositAuth,
            toTokenAcct,
            fromTokenAcct,
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

export const newOrder = (program, limitPrice, market, openOrders, requestQueue, eventQueue, marketBids, marketAsks, orderPayerTokenAccount, openOrdersAuthority, coinVault, pcVault, tokenProgram, rent, dexProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .newOrder( limitPrice,)
          .accounts({
            market,
            openOrders,
            requestQueue,
            eventQueue,
            marketBids,
            marketAsks,
            orderPayerTokenAccount,
            openOrdersAuthority,
            coinVault,
            pcVault,
            tokenProgram,
            rent,
            dexProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const cancelOrder = (program, orderId, market, openOrders, requestQueue, eventQueue, marketBids, marketAsks, orderPayerTokenAccount, openOrdersAuthority, coinVault, pcVault, tokenProgram, rent, dexProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .cancelOrder( orderId,)
          .accounts({
            market,
            openOrders,
            requestQueue,
            eventQueue,
            marketBids,
            marketAsks,
            orderPayerTokenAccount,
            openOrdersAuthority,
            coinVault,
            pcVault,
            tokenProgram,
            rent,
            dexProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

