import "./Home.css";
import NavBar from "../NavBar/NavBar";
import PostedCard from "../PostedCard/PostedCard";
import CreateCard from "../createCard/createCard";

function Home() {
  return (
    <>
      <NavBar />
      <CreateCard />
      <PostedCard />
    </>
  );
}
export default Home;
