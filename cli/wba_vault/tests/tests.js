import * as anchor from "@project-serum/anchor";
import { expect } from 'chai';

// Configure the client to use the local cluster.
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Wba_vault;

describe('tests', async () => {

  it('initialize', async () => {

    // args

    // accounts
    const ownerAccount = null;
    const vaultStateAccount = null;
    const vaultAuthAccount = null;
    const vaultAccount = null;
    
    const tx = await program.methods
      .initialize()
      .accounts({
          owner: ownerAccount,
          vaultState: vaultStateAccount,
          vaultAuth: vaultAuthAccount,
          vault: vaultAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('deposit', async () => {

    // args
    const amount = 0; //u64

    // accounts
    const ownerAccount = null;
    const vaultStateAccount = null;
    const vaultAuthAccount = null;
    const vaultAccount = null;
    
    const tx = await program.methods
      .deposit(amount,)
      .accounts({
          owner: ownerAccount,
          vaultState: vaultStateAccount,
          vaultAuth: vaultAuthAccount,
          vault: vaultAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('withdraw', async () => {

    // args
    const amount = 0; //u64

    // accounts
    const ownerAccount = null;
    const vaultStateAccount = null;
    const vaultAuthAccount = null;
    const vaultAccount = null;
    
    const tx = await program.methods
      .withdraw(amount,)
      .accounts({
          owner: ownerAccount,
          vaultState: vaultStateAccount,
          vaultAuth: vaultAuthAccount,
          vault: vaultAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('depositSpl', async () => {

    // args
    const amount = 0; //u64

    // accounts
    const ownerAccount = null;
    const ownerAtaAccount = null;
    const vaultStateAccount = null;
    const vaultAuthAccount = null;
    const vaultAtaAccount = null;
    const tokenMintAccount = null;
    const tokenProgramAccount = null;
    const associatedTokenProgramAccount = null;
    
    const tx = await program.methods
      .depositSpl(amount,)
      .accounts({
          owner: ownerAccount,
          ownerAta: ownerAtaAccount,
          vaultState: vaultStateAccount,
          vaultAuth: vaultAuthAccount,
          vaultAta: vaultAtaAccount,
          tokenMint: tokenMintAccount,
          tokenProgram: tokenProgramAccount,
          associatedTokenProgram: associatedTokenProgramAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('withdrawSpl', async () => {

    // args
    const amount = 0; //u64

    // accounts
    const ownerAccount = null;
    const ownerAtaAccount = null;
    const vaultStateAccount = null;
    const vaultAuthAccount = null;
    const vaultAtaAccount = null;
    const tokenMintAccount = null;
    const tokenProgramAccount = null;
    const associatedTokenProgramAccount = null;
    
    const tx = await program.methods
      .withdrawSpl(amount,)
      .accounts({
          owner: ownerAccount,
          ownerAta: ownerAtaAccount,
          vaultState: vaultStateAccount,
          vaultAuth: vaultAuthAccount,
          vaultAta: vaultAtaAccount,
          tokenMint: tokenMintAccount,
          tokenProgram: tokenProgramAccount,
          associatedTokenProgram: associatedTokenProgramAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

});
