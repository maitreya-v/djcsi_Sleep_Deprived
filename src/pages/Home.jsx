import React, { Fragment, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import familyVideo from "../assets/videos/familyVideo.mp4";
import monuments from "../assets/videos/monuments.mp4";
import beach from "../assets/videos/beach.mp4";
import temple from "../assets/videos/temple.mp4";
import event from "../assets/videos/events.mp4";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom";
import { beaches, temples } from "./PreferenceData"
import {Box, Typography} from '@mui/material'
import Quality from '../assets/images/badge.png';
import Innovation from '../assets/images/innovation.png';
import CustomerService from '../assets/images/support.png';
import Sustainability from '../assets/images/sustainable.png';
import Team from '../assets/images/team.png';
import { motion } from "framer-motion";
import testimonials from '../components/Testimonials.json'
import Card from '../components/Card'
import axios from "axios";
// import ExtensionApp from './extension/extensionApp'
// import {Typography} from '@mui/material'
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  FeatureGroup,
  withLeaflet,
} from "react-leaflet";

import { BiMapPin, BiMap } from "react-icons/bi";
// import { events } from "./eventData";
// import { CometChat } from "@cometchat-pro/chat";
import { Dialog, Transition } from "@headlessui/react";
import L from "leaflet";
import mark from "../assets/images/markers.png";
import { useTranslation } from "react-i18next";
import Footer from "./FooterHome";



const Background = ({ backgroundVideo, theme }) => {
  return (
    <video autoPlay loop muted className={`absolute -z-10 w-full h-auto`}>
      <source src={backgroundVideo} type="video/mp4" />
    </video>
  );
};

const Home = () => {
  const [destination, setDestination] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [filteredList2, setFilteredList2] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [packages, setPackages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();


  // useEffect(()=>{
  //   const postObj={
  //     'url':'www.ucoz.com'
  //   }
  //   axios.post('https://efd8-136-232-1-174.ngrok-free.app/api/web_block/',postObj).then((res)=>{
  //     console.log(res.data.status)
  //   })
  // })

  const [theme, setTheme] = useState("emerald");
  useEffect(() => {
    localStorage.setItem("color", theme);
  }, [theme])
  
  localStorage.setItem("color",theme);
//   useEffect(() => {
//     CometChat.getLoggedinUser().then(  
//       (user) => {
//         console.log("user details:", { user });
//       },
//       (error) => {
//         console.log("error getting details:", { error });
//       }
//     );

//     let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
//     usersRequest.fetchNext().then((userList) => {
//       console.log(userList);
//     });
//   }, []);
  useEffect(() => {
    let filtered = beaches.filter((item) =>
      item.location.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredList(filtered);
  }, [destination]);

  useEffect(() => {
    let filtered = temples.filter((item) =>
      item.location.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredList2(filtered);
  }, [destination]);
  return (
    <div className={`w-full h-full relative `}>
      {/* <ExtensionApp/> */}
      {/* {theme == "amber" ? (
        <Background backgroundVideo={monuments} theme={theme} />
      ) : theme == "sky" ? (
        <Background backgroundVideo={beach} theme={theme} />
      ) : theme == "red" ? (
        <Background backgroundVideo={temple} theme={theme} />
      ) : theme == "violet" ? (
        <Background backgroundVideo={event} theme={theme} />
      ) : (
        <Background backgroundVideo={mountain} theme={theme} />
      )} */}
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "amber" ? "hidden" : "block"
          }`}
      >
        <source src={monuments} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "sky" ? "hidden" : "block"
          }`}
      >
        <source src={beach} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "violet" ? "hidden" : "block"
          }`}
      >
        <source src={event} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "red" ? "hidden" : "block"
          }`}
      >
        <source src={temple} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "emerald" ? "hidden" : "block"
          }`}
      >
        <source src={familyVideo} type="video/mp4" />
      </video>
      <div className="bg-gray-800/40 h-screen">
        <div className="text-gray-100">
          <Navbar color={theme} />
        </div>
        {/* <iframe width="700" height="450" src="https://www.airpano.com/embed.php?3D=polar-urals" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" framespacing="0" allowfullscreen> </iframe> */}
      
          {/* data-aos */}

        {/* <div
          data-aos="zoom-in-up"
          // data-aos-duration="2000"
          className="flex flex-col items-center py-36 px-60 gap-6 h-full"
        >
          <h1 className="text-6xl text-gray-100 font-bold text-center leading-snug">
            {t("Explore the world with your perfect travel companion")}
          </h1>
          <h1 className="text-xl text-gray-300 font-medium text-center leading-normal">
            {t("Join our community of adventurous singles and start your next journey together!")}
          </h1>
          <Link to="/register" className="">
            <button
              className={`text-gray-100 text-lg capitalize px-10 py-6 ${theme == "emerald"
                ? "bg-emerald-500"
                : theme == "amber"
                  ? "bg-amber-500"
                  : theme == "sky"
                    ? "bg-sky-500"
                    : theme == "red"
                      ? "bg-red-500"
                      : theme == "violet"
                        ? "bg-violet-500"
                        : "bg-purple-500"
                } rounded-full`}
            >
              {t("Get Started")}
            </button>
          </Link>
        </div> */}


        {/* framer motion */}

        <motion.div
   initial={{ opacity: 0, scale: 0 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 1, ease: "easeInOut" }}
  className="flex flex-col items-center py-36 px-60 gap-6 h-full"
>
  <h1 className="text-6xl text-gray-100 font-bold text-center leading-snug">
    {t(" A Comprehensive Control Application for Your Child's Digital Life")}
  </h1>
  <h1 className="text-xl text-gray-300 font-medium text-center leading-normal">
    {t("Join Our Community of Responsible Parents and Ensure Your Child's Safe Digital Journey Together!")}
  </h1>
  <Link to="/register" className="">
    <button
      className={`text-gray-100 text-lg capitalize px-10 py-6 ${theme == "emerald"
        ? "bg-[#a4a9fc]"
        : theme == "amber"
          ? "bg-amber-500"
          : theme == "sky"
            ? "bg-sky-500"
            : theme == "red"
              ? "bg-red-500"
              : theme == "violet"
                ? "bg-violet-500"
                : "bg-purple-500"
      } rounded-full`}
    >
      {t("Get Started")}
    </button>
  </Link>
</motion.div>

      </div>
      <div
        className={` px-36 bg-gradient-to-t from-white
     ${theme == "emerald"
            ? "bg-[#cdcffd]"
            : theme == "amber"
              ? "bg-amber-200"
              : theme == "sky"
                ? "bg-sky-200"
                : theme == "red"
                  ? "bg-red-200"
                  : theme == "violet"
                    ? "bg-violet-200"
                    : "bg-purple-200"
          }`}
      >
        <div className="flex flex-col items-center py-8">
          <h2 className="font-bold text-3xl py-8">{t("What's unique?")} </h2>
          <div className="flex items-center justify-between gap-8 mt-4">
            <button
              data-aos="zoom-in-up"
              // onClick={() => setTheme("emerald")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-emerald-100 text-xl font-semibold gap-2 focus:outline focus:shadow-emerald-700/70"  
            >
              <img
                className="w-28"
                
                src={Quality}
                alt="moun"
              />
              {t("Quality")}
            </button>
            <button
              data-aos="zoom-in-up"
              // onClick={() => setTheme("red")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-red-100 text-xl font-semibold gap-2 delay-150 focus:outline focus:shadow-red-700/70"
            >
              <img
                className="w-28"
                src={Innovation}
                alt="moun"
              />
              {t("Innovation")}
            </button>
            <button
              data-aos="zoom-in-up"
              // onClick={() => setTheme("sky")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-sky-100 text-xl font-semibold gap-2 delay-150 focus:outline focus:shadow-sky-700/70"
            >
              <img
                src={CustomerService}
                className="w-28"
                alt="moun"
              />{" "}
              {t("Customer Service")}{" "}
            </button>
            <button
              data-aos="zoom-in-up"
              // onClick={() => setTheme("violet")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-violet-100 text-xl font-semibold gap-2 focus:outline focus:shadow-violet-700/70"
            >
              <img
                className="w-28"
                src={Sustainability}
                alt="moun"
              />
              {t("Sustainability")}
            </button>
            <button
              data-aos="zoom-in-up"
              // onClick={() => setTheme("amber")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-amber-100 text-xl font-semibold gap-2 focus:outline focus:shadow-amber-700/70"
            >
              <img
                src={Team}
                className="w-28"
                alt="moun"
              />
              {t("Team")}{" "}
            </button>
          </div>
        </div>
        <div className="">
          <div className="w-full h-full py-24">
            {/* <h1 className="text-black uppercase mb-2">Upcoming events</h1> */}
            <h1 className="text-black text-4xl font-bold mb-12">
              {/* {t("Search your")}{" "} */}
              <span
                className={`underline ${theme == "emerald"
                  ? "decoration-[#a4a9fc]"
                  : theme == "amber"
                    ? "decoration-amber-500"
                    : theme == "sky"
                      ? "decoration-sky-500"
                      : theme == "red"  
                        ? "decoration-red-500"
                        : theme == "violet"
                          ? "decoration-violet-500"
                          : "decoration-purple-500"
                  } underline-offset-4`}
              >
                {t("Testimonials")}
              </span>
            </h1>
          

        {/* <p>hi</p> */}

        <Box display='grid' gridTemplateColumns='repeat(12,1fr)' gridAutoRows='140px' height='40vh' gap='40px' data-aos="zoom-in-up">
        {
          // console.log(testimonials)

             testimonials.testimonials.map((item)=>(
          <Box gridColumn='span 4'>
              <Card 
            id={item.id}
            name={item.name}
            testimonial={item.testimonial}
            image_link={item.image_link}

            />
          </Box>
           ))
        }
          </Box>


          </div>
        </div>
        
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
