import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";
import { useRouter } from "next/router";
import { PublicKey } from '@solana/web3.js'
import { initializeUser } from "../utils/callInstructions";
import { addFriend } from "../utils/callInstructions";
import { addStatus } from "../utils/callInstructions";
import { createVideo } from "../utils/callInstructions";


const Examples = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program, programId, setProgramId, isProgramId, setIsProgramId, submit, programIdHandler, } =
    useProgram({ connection, wallet });

  // React UseStates hooks for managing args
  //for initializeUser
  const [ff, setff] = useState("testin")
  const [name_for_initializeUser, setname_for_initializeUser] = useState();
  const [age_for_initializeUser, setage_for_initializeUser] = useState();
  const [gender_for_initializeUser, setgender_for_initializeUser] = useState();
  const [profileUrl_for_initializeUser, setprofileUrl_for_initializeUser] =
    useState();
  const [description_for_initializeUser, setdescription_for_initializeUser] =
    useState();
  const [country_for_initializeUser, setcountry_for_initializeUser] =
    useState();
  //for addFriend
  const [name_for_addFriend, setname_for_addFriend] = useState();
  const [age_for_addFriend, setage_for_addFriend] = useState();
  const [gender_for_addFriend, setgender_for_addFriend] = useState();
  const [profileUrl_for_addFriend, setprofileUrl_for_addFriend] = useState();
  const [description_for_addFriend, setdescription_for_addFriend] = useState();
  const [country_for_addFriend, setcountry_for_addFriend] = useState();
  //for addStatus
  const [status_for_addStatus, setstatus_for_addStatus] = useState();
  const [name_for_addStatus, setname_for_addStatus] = useState();
  const [profileUrl_for_addStatus, setprofileUrl_for_addStatus] = useState();
  //for createVideo
  const [content_for_createVideo, setcontent_for_createVideo] = useState();
  const [userName_for_createVideo, setuserName_for_createVideo] = useState();
  const [description_for_createVideo, setdescription_for_createVideo] =
    useState();
  const [profileUrl_for_createVideo, setprofileUrl_for_createVideo] =
    useState();

  //handler functions for inputs feilds
  const namehandler_for_initializeUser = (e) => {
    setname_for_initializeUser(e.target.value);
  };
  const agehandler_for_initializeUser = (e) => {
    setage_for_initializeUser(e.target.value);
  };
  const genderhandler_for_initializeUser = (e) => {
    setgender_for_initializeUser(e.target.value);
  };
  const profileUrlhandler_for_initializeUser = (e) => {
    setprofileUrl_for_initializeUser(e.target.value);
  };
  const descriptionhandler_for_initializeUser = (e) => {
    setdescription_for_initializeUser(e.target.value);
  };
  const countryhandler_for_initializeUser = (e) => {
    setcountry_for_initializeUser(e.target.value);
  };
  const namehandler_for_addFriend = (e) => {
    setname_for_addFriend(e.target.value);
  };
  const agehandler_for_addFriend = (e) => {
    setage_for_addFriend(e.target.value);
  };
  const genderhandler_for_addFriend = (e) => {
    setgender_for_addFriend(e.target.value);
  };
  const profileUrlhandler_for_addFriend = (e) => {
    setprofileUrl_for_addFriend(e.target.value);
  };
  const descriptionhandler_for_addFriend = (e) => {
    setdescription_for_addFriend(e.target.value);
  };
  const countryhandler_for_addFriend = (e) => {
    setcountry_for_addFriend(e.target.value);
  };
  const statushandler_for_addStatus = (e) => {
    setstatus_for_addStatus(e.target.value);
  };
  const namehandler_for_addStatus = (e) => {
    setname_for_addStatus(e.target.value);
  };
  const profileUrlhandler_for_addStatus = (e) => {
    setprofileUrl_for_addStatus(e.target.value);
  };
  const contenthandler_for_createVideo = (e) => {
    setcontent_for_createVideo(e.target.value);
  };
  const userNamehandler_for_createVideo = (e) => {
    setuserName_for_createVideo(e.target.value);
  };
  const descriptionhandler_for_createVideo = (e) => {
    setdescription_for_createVideo(e.target.value);
  };
  const profileUrlhandler_for_createVideo = (e) => {
    setprofileUrl_for_createVideo(e.target.value);
  };


  // variables for accounts
  const authority = "";
  const systemProgram = "";
  const clock = "";

  const userProfile_for_initializeUser = "";
  const userProfile_for_addFriend = "";
  const addFriend_for_addFriend = "";
  const userProfile_for_addStatus = "";
  const statusAccount_for_addStatus = "";
  const userProfile_for_createVideo = "";
  const videoAccount_for_createVideo = "";

  useEffect(()=> {
    alert("ffdffdf")
  },[])

  const tr = () => {
    console.log("ffdf")
  }

  return (
    <>
      <Head>
        <title>yoo</title>
        <meta name="description" content="yoo" />
      </Head>
      <div className="flex justify-center py-10">
        <h1 className="sm:text-3xl text-2xl font-extrabold mb-4 text-white">
          Call Instructions of Your IDL By a Clicking a Button {ff}
        </h1>
      </div>
      <div className="flex justify-center">
        <h1 className="sm:text-3xl text-2xl font-extrabold mb-4 text-white">
          Powered By SODA
        </h1>
      </div>

      <div className="flex justify-center">
        <button
        onClick={tr()}
          className="bg-white p-10"
        >cvvdvdvd</button>

      </div>

      {/* {isProgramId ? (
        <>
          <div>
            <div className="text-white flex flex-col text-2xl m-5 p-2 ">
              <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className=" mx-auto">
                      <div className="flex items-center space-x-5">
                        <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                            alt="ff"
                          />
                        </div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                          <h2 className="leading-relaxed mt-8">
                            For initializeUser instructions
                          </h2>
                          <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <p className="">name</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={name_for_initializeUser}
                              onChange={namehandler_for_initializeUser}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">age</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={age_for_initializeUser}
                              onChange={agehandler_for_initializeUser}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">gender</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={gender_for_initializeUser}
                              onChange={genderhandler_for_initializeUser}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">profileUrl</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={profileUrl_for_initializeUser}
                              onChange={profileUrlhandler_for_initializeUser}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">description</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={description_for_initializeUser}
                              onChange={descriptionhandler_for_initializeUser}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">country</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={country_for_initializeUser}
                              onChange={countryhandler_for_initializeUser}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                            onClick={() =>
                              initializeUser(
                                program,
                                name_for_initializeUser,
                                age_for_initializeUser,
                                gender_for_initializeUser,
                                profileUrl_for_initializeUser,
                                description_for_initializeUser,
                                country_for_initializeUser,
                                userProfile_for_initializeUser,
                                authority,
                                systemProgram,
                                clock
                              )
                            }
                          >
                            Call_initializeUser_instruction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col text-2xl m-5 p-2 ">
              <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className=" mx-auto">
                      <div className="flex items-center space-x-5">
                        <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                            alt="ff"
                          />
                        </div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                          <h2 className="leading-relaxed">
                            For addFriend instructions
                          </h2>
                          <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <p className="">name</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={name_for_addFriend}
                              onChange={namehandler_for_addFriend}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">age</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={age_for_addFriend}
                              onChange={agehandler_for_addFriend}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">gender</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={gender_for_addFriend}
                              onChange={genderhandler_for_addFriend}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">profileUrl</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={profileUrl_for_addFriend}
                              onChange={profileUrlhandler_for_addFriend}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">description</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={description_for_addFriend}
                              onChange={descriptionhandler_for_addFriend}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">country</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={country_for_addFriend}
                              onChange={countryhandler_for_addFriend}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                            onClick={() =>
                              addFriend(
                                program,
                                name_for_addFriend,
                                age_for_addFriend,
                                gender_for_addFriend,
                                profileUrl_for_addFriend,
                                description_for_addFriend,
                                country_for_addFriend,
                                userProfile_for_addFriend,
                                addFriend_for_addFriend,
                                authority,
                                systemProgram
                              )
                            }
                          >
                            Call_addFriend_instruction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col text-2xl m-5 p-2 ">
              <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className=" mx-auto">
                      <div className="flex items-center space-x-5">
                        <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                            alt="ff"
                          />
                        </div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                          <h2 className="leading-relaxed">
                            For addStatus instructions
                          </h2>
                          <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <p className="">status</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={status_for_addStatus}
                              onChange={statushandler_for_addStatus}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">name</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={name_for_addStatus}
                              onChange={namehandler_for_addStatus}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">profileUrl</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={profileUrl_for_addStatus}
                              onChange={profileUrlhandler_for_addStatus}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                            onClick={() =>
                              addStatus(
                                program,
                                status_for_addStatus,
                                name_for_addStatus,
                                profileUrl_for_addStatus,
                                userProfile_for_addStatus,
                                statusAccount_for_addStatus,
                                authority,
                                systemProgram,
                                clock
                              )
                            }
                          >
                            Call_addStatus_instruction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col text-2xl m-5 p-2 ">
              <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className=" mx-auto">
                      <div className="flex items-center space-x-5">
                        <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                            alt="ff"
                          />
                        </div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                          <h2 className="leading-relaxed">
                            For createVideo instructions
                          </h2>
                          <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <p className="">content</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={content_for_createVideo}
                              onChange={contenthandler_for_createVideo}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">userName</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={userName_for_createVideo}
                              onChange={userNamehandler_for_createVideo}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">description</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={description_for_createVideo}
                              onChange={descriptionhandler_for_createVideo}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="">profileUrl</p>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Enter"
                              value={profileUrl_for_createVideo}
                              onChange={profileUrlhandler_for_createVideo}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                            onClick={() =>
                              createVideo(
                                program,
                                content_for_createVideo,
                                userName_for_createVideo,
                                description_for_createVideo,
                                profileUrl_for_createVideo,
                                userProfile_for_createVideo,
                                videoAccount_for_createVideo,
                                authority,
                                systemProgram
                              )
                            }
                          >
                            Call_createVideo_instruction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        <h1 className="text-white">No program id found</h1>
        <input 
        placeholder="enter"
        value={programId}
        onChange={programIdHandler}
        />
        <button
        className="bg-white text-black" 
        onClick={()=>console.log("dssdds")}>ffff</button>
        </>
      )} */}
    </>
  );
};

export default Examples;
