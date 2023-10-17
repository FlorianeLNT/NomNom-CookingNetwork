import "./Home.css";
import NavBar from "../NavBar/NavBar";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import PostedCard from "../PostedCard/PostedCard";
// import Search from "../Search/Search";

function Home() {
  return (
    <>
      <NavBar />
      <NavBarMobile />
      {/* <Search /> */}
      <PostedCard />
    </>
  );
}
export default Home;
