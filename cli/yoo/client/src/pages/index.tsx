import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";
import { useRouter } from "next/router"

import {
  initializeUser
} from '../utils/callInstructions'
import {
  addFriend
} from '../utils/callInstructions'
import {
  addStatus
} from '../utils/callInstructions'
import {
  createVideo
} from '../utils/callInstructions'


const Home: NextPage = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });

// React UseStates hooks for managing args 
//for initializeUser
const [name_for_initializeUser , setname_for_initializeUser] = useState()
const [age_for_initializeUser , setage_for_initializeUser] = useState()
const [gender_for_initializeUser , setgender_for_initializeUser] = useState()
const [profileUrl_for_initializeUser , setprofileUrl_for_initializeUser] = useState()
const [description_for_initializeUser , setdescription_for_initializeUser] = useState()
const [country_for_initializeUser , setcountry_for_initializeUser] = useState()
//for addFriend
const [name_for_addFriend , setname_for_addFriend] = useState()
const [age_for_addFriend , setage_for_addFriend] = useState()
const [gender_for_addFriend , setgender_for_addFriend] = useState()
const [profileUrl_for_addFriend , setprofileUrl_for_addFriend] = useState()
const [description_for_addFriend , setdescription_for_addFriend] = useState()
const [country_for_addFriend , setcountry_for_addFriend] = useState()
//for addStatus
const [status_for_addStatus , setstatus_for_addStatus] = useState()
const [name_for_addStatus , setname_for_addStatus] = useState()
const [profileUrl_for_addStatus , setprofileUrl_for_addStatus] = useState()
//for createVideo
const [content_for_createVideo , setcontent_for_createVideo] = useState()
const [userName_for_createVideo , setuserName_for_createVideo] = useState()
const [description_for_createVideo , setdescription_for_createVideo] = useState()
const [profileUrl_for_createVideo , setprofileUrl_for_createVideo] = useState()

//handler functions for inputs feilds
const namehandler_for_initializeUser = (e) => {
  setname_for_initializeUser(e.target.value)
}
const agehandler_for_initializeUser = (e) => {
  setage_for_initializeUser(e.target.value)
}
const genderhandler_for_initializeUser = (e) => {
  setgender_for_initializeUser(e.target.value)
}
const profileUrlhandler_for_initializeUser = (e) => {
  setprofileUrl_for_initializeUser(e.target.value)
}
const descriptionhandler_for_initializeUser = (e) => {
  setdescription_for_initializeUser(e.target.value)
}
const countryhandler_for_initializeUser = (e) => {
  setcountry_for_initializeUser(e.target.value)
}
const namehandler_for_addFriend = (e) => {
  setname_for_addFriend(e.target.value)
}
const agehandler_for_addFriend = (e) => {
  setage_for_addFriend(e.target.value)
}
const genderhandler_for_addFriend = (e) => {
  setgender_for_addFriend(e.target.value)
}
const profileUrlhandler_for_addFriend = (e) => {
  setprofileUrl_for_addFriend(e.target.value)
}
const descriptionhandler_for_addFriend = (e) => {
  setdescription_for_addFriend(e.target.value)
}
const countryhandler_for_addFriend = (e) => {
  setcountry_for_addFriend(e.target.value)
}
const statushandler_for_addStatus = (e) => {
  setstatus_for_addStatus(e.target.value)
}
const namehandler_for_addStatus = (e) => {
  setname_for_addStatus(e.target.value)
}
const profileUrlhandler_for_addStatus = (e) => {
  setprofileUrl_for_addStatus(e.target.value)
}
const contenthandler_for_createVideo = (e) => {
  setcontent_for_createVideo(e.target.value)
}
const userNamehandler_for_createVideo = (e) => {
  setuserName_for_createVideo(e.target.value)
}
const descriptionhandler_for_createVideo = (e) => {
  setdescription_for_createVideo(e.target.value)
}
const profileUrlhandler_for_createVideo = (e) => {
  setprofileUrl_for_createVideo(e.target.value)
}

// variables for accounts
const authority = ""
const systemProgram = ""
const clock = ""

const userProfile_for_initializeUser = ""
const userProfile_for_addFriend = ""
const addFriend_for_addFriend = ""
const userProfile_for_addStatus = ""
const statusAccount_for_addStatus = ""
const userProfile_for_createVideo = ""
const videoAccount_for_createVideo = ""


  return (
    <>
      <Head>
        <title>yoo</title>
        <meta name="description" content="yoo" />
      </Head>
    </>
  );
};

export default Home;
