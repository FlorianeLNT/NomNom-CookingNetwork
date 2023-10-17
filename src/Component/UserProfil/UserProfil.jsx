import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <NavBar />
      <div className="my-profile">
        <div className="profil-info">
          <div className="profilCard">
            <h3>Informations sur l'utilisateur : </h3>
            <p>Prénom : {userInfo.firstname}</p>
            <p>Nom : {userInfo.lastname} </p>
            <p>Âge : {userInfo.age} ans</p>
            <p>Occupation : {userInfo.occupation}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfil;
