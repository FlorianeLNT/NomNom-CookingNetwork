import "./Profil.css";
import Button from "@mui/material/Button";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
function Profil() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const navigateToEditProfil = () => {
    navigate("/editingprofil", { state: { userInfo } });
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToProfil = () => {
    navigate("/profil");
  };

  const userToken = localStorage.getItem("token");

  if (!userToken) {
    navigateToProfil();
    return;
  }

  async function getUserData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    };

    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/user",
      options
    );

    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
    } else {
      navigateToLogin();
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const renderUserInfos = () => {
    const { firstname, lastname, email, age, occupation } = userInfo;

    return (
      <div className="profilCard">
        <h3>Mon Profil : </h3>
        <p>Prénom : {firstname}</p>
        <p>Nom : {lastname}</p>
        <p>Email : {email}</p>
        {age && <p>Âge : {age} ans</p>}
        {occupation && <p>Occupation : {occupation}</p>}
        <Button
          className="button-modifier"
          variant="contained"
          onClick={navigateToEditProfil}
          sx={{
            backgroundColor: "#6b041f",
            "&:hover": { backgroundColor: "#921738" },
          }}
        >
          Modifier
        </Button>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <NavBarMobile />
      <div className="my-profile">
        <div className="profil-info">
          {Object.keys(userInfo).length > 0 ? (
            renderUserInfos()
          ) : (
            <p>Chargement des informations...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profil;
