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

  if (!localStorage.getItem("token")) {
    navigateToProfil();
    return null; // Ajout d'un return null ici pour éviter une erreur
  }

  async function getUserData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
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
      <div>
        <div className="profilCardMobile">
          <h3>
            <u>Mon Profil :</u>
          </h3>
          <p>
            <u>Prénom : </u>
            {firstname}
          </p>
          <p>
            <u>Nom :</u> {lastname}
          </p>
          <p>
            <u>Email :</u>
          </p>{" "}
          <p>{email}</p>
          {age && (
            <p>
              <u>Âge :</u> {age} ans
            </p>
          )}
          {occupation && (
            <>
              <p>
                <u>Occupation(s) :</u>
              </p>{" "}
              <span>{occupation}</span>
            </>
          )}
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
        <div className="profilCard">
          <h3>
            <u>Mon Profil:</u>
          </h3>
          <p>
            <u>Prénom:</u> {firstname}
          </p>
          <p>
            <u>Nom:</u> {lastname}
          </p>
          <p>
            <u>Email:</u> {email}
          </p>
          {age && (
            <p>
              {" "}
              <u>Âge:</u> {age} ans
            </p>
          )}
          {occupation && (
            <p>
              <u> Occupation(s) :</u> {occupation}
            </p>
          )}
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
    );
  };

  return (
    <>
      <NavBar />
      <NavBarMobile />
      <div className="profil-info">
        {Object.keys(userInfo).length > 0 ? (
          renderUserInfos()
        ) : (
          <p>Chargement des informations...</p>
        )}
      </div>
    </>
  );
}

export default Profil;
