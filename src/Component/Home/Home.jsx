import "./Home.css";
import NavBar from "../NavBar/NavBar";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import PostedCard from "../PostedCard/PostedCard";

function Home() {
  return (
    <>
      <NavBar />
      <NavBarMobile />
      <PostedCard />
    </>
  );
}
export default Home;
