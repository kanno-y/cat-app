import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import "semantic-ui-css/semantic.min.css";
import { Dimmer, Loader } from "semantic-ui-react";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};
const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };

  const handleClickImage = () => {};
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
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div onClick={handleClickImage}>
          <img
            src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg"
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div onClick={handleClickImage}>
          <img
            src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
