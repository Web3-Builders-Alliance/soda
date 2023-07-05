import * as anchor from "@project-serum/anchor";
import { expect } from 'chai';

// Configure the client to use the local cluster.
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Yoo;

describe('tests', async () => {

  it('initializeUser', async () => {

    // args
    const name = ""; //string
    const age = ""; //string
    const gender = ""; //string
    const profileUrl = ""; //string
    const description = ""; //string
    const country = ""; //string

    // accounts
    const userProfileAccount = null;
    const authorityAccount = null;
        const clockAccount = null;

    const tx = await program.methods
      .initializeUser(name,age,gender,profileUrl,description,country,)
      .accounts({
          userProfile: userProfileAccount,
          authority: authorityAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: clockAccount,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('addFriend', async () => {

    // args
    const name = ""; //string
    const age = ""; //string
    const gender = ""; //string
    const profileUrl = ""; //string
    const description = ""; //string
    const country = ""; //string

    // accounts
    const userProfileAccount = null;
    const addFriendAccount = null;
    const authorityAccount = null;
    
    const tx = await program.methods
      .addFriend(name,age,gender,profileUrl,description,country,)
      .accounts({
          userProfile: userProfileAccount,
          addFriend: addFriendAccount,
          authority: authorityAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('addStatus', async () => {

    // args
    const status = ""; //string
    const name = ""; //string
    const profileUrl = ""; //string

    // accounts
    const userProfileAccount = null;
    const statusAccountAccount = null;
    const authorityAccount = null;
        const clockAccount = null;

    const tx = await program.methods
      .addStatus(status,name,profileUrl,)
      .accounts({
          userProfile: userProfileAccount,
          statusAccount: statusAccountAccount,
          authority: authorityAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: clockAccount,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

  it('createVideo', async () => {

    // args
    const content = ""; //string
    const userName = ""; //string
    const description = ""; //string
    const profileUrl = ""; //string

    // accounts
    const userProfileAccount = null;
    const videoAccountAccount = null;
    const authorityAccount = null;
    
    const tx = await program.methods
      .createVideo(content,userName,description,profileUrl,)
      .accounts({
          userProfile: userProfileAccount,
          videoAccount: videoAccountAccount,
          authority: authorityAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    expect(tx).to.have.lengthOf.greaterThan(0);
  });

});
