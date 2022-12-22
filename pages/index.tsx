import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Dimmer, Loader } from "semantic-ui-react";
import { motion } from "framer-motion";
import css from "styled-jsx/css";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

type allBreed = {
  message: {
    [key: string]: string[];
  };
  status: string;
};

// const fetchCatImage = async (): Promise<SearchCatImage> => {
//   const res = await fetch("https://api.thecatapi.com/v1/images/search");
//   const result = await res.json();
//   return result[0];
// };

const fetchAllBreed = async (): Promise<allBreed> => {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const result = await res.json();
  console.log(result);
  return result;
};
const Home: NextPage<any> = ({ initialCatImageUrl, allBreedList }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const mainBreeds = allBreedList.message;
  // const handleClick = async () => {
  //   setIsLoading(true);
  //   const catImage = await fetchCatImage();
  //   setCatImageUrl(catImage.url);
  //   setIsLoading(false);
  // };

  const handleClickImage = (src: string) => {
    console.log("src", src);
  };

  const iamge1 =
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg";
  const iamge2 = "https://images.dog.ceo/breeds/hound-afghan/n02088094_185.jpg";

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <h1>猫画像のアプリ</h1>
    //   {isLoading ? (
    //     <Dimmer active>
    //       <Loader />
    //     </Dimmer>
    //   ) : (
    //     <img src={catImageUrl} alt="猫画像" width={500} height="auto" />
    //   )}
    //   <button style={{ marginTop: "18" }} onClick={handleClick}>
    //     今日の猫
    //   </button>
    // </div>
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <motion.div
          animate={{
            x: 0,
            backgroundColor: "#ee0c0c",
            boxShadow: "10px 10px 0 rgba(255, 255, 255, 0.2)",
            position: "fixed",
            transitionEnd: {
              display: "none",
            },
          }}
        />
        <div onClick={() => handleClickImage(iamge1)}>
          <img src={iamge1} alt="" width={500} height={500} />
        </div>
        <div onClick={() => handleClickImage(iamge2)}>
          <img src={iamge2} alt="" width={500} height={500} />
        </div>
      </div>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<any> = async () => {
  const allBread = await fetchAllBreed();
  return {
    props: {
      allBreedList: allBread,
    },
  };
};
