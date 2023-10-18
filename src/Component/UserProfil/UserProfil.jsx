import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function UserProfil() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();

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
    return;
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
      `https://social-network-api.osc-fr1.scalingo.io/nom-nom/user/${userId}`,
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
    const { firstname, lastname, age, occupation } = userInfo;

    return (
      <div className="profilCard">
        <h3>Informations sur l'utilisateur : </h3>
        <p>Prénom : {firstname}</p>
        <p>Nom : {lastname}</p>
        {age && <p>Âge : {age} ans</p>}
        {occupation && <p>Occupation : {occupation}</p>}
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="my-profile">
        <div className="profil-info">{renderUserInfos()}</div>
      </div>
    </>
  );
}

export default UserProfil;
