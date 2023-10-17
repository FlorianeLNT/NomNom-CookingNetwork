import "./Profil.css";
import Button from "@mui/material/Button";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profil() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const navigateToEditProfil = () => {
    navigate("/editingprofil");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToProfil = () => {
    navigate("/profil");
  };

  const token = localStorage.getItem("token");

  if (!token) {
    navigateToProfil();
    return;
  }

  async function getUserData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
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

  return (
    <>
      <NavBar />
      <div className="my-profile">
        <div className="profil-info">
          <div className="profilCard">
            <h3>Mon Profil : </h3>
            <p>Prénom : {userInfo.firstname}</p>
            <p>Nom : {userInfo.lastname} </p>
            <p>Email : {userInfo.email}</p>
            <p>Âge : {userInfo.age} ans</p>
            <p>Occupation : {userInfo.occupation}</p>
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
        </div>
      </div>
    </>
  );
}

export default Profil;
