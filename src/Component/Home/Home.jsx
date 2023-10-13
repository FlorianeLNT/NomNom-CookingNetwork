import "./Home.css";
import NavBar from "../NavBar/NavBar";
import InputPost from "../InputPost/InputPost";
import PostedCard from "../PostedCard/PostedCard";
import { useEffect, useState } from "react";
import Login from "../Login/Login";

function Home() {
  return (
    <>
      <NavBar />
      <PostedCard />
    </>
  );
}
export default Home;
