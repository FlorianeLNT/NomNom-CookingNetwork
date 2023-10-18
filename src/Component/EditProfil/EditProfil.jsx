import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./EditProfil.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

function EditProfil() {
  const location = useLocation();
  const { userInfo } = location.state;
  const [firstName, setFirstName] = useState(userInfo.firstname);
  const [lastName, setLastName] = useState(userInfo.lastname);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(userInfo.age);
  const [hobby, setHobby] = useState(userInfo.occupation);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const navigateToProfil = () => {
    navigate("/profil");
  };

  async function handleEdit() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        age: age,
        occupation: hobby,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/user",
      options
    );

    if (response.ok) {
      setShowAlert(true);
      setTimeout(() => {
        navigateToProfil();
      }, 2000);
    }
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
    } else {
      navigateToLogin();
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <NavBar />
      <NavBarMobile />
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="inputEdit">
          <div className="inputCard">
            <TextField
              required
              id="outlined-firstName"
              label="Prénom"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id="outlined-lastName"
              label="Nom"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              id="outlined-email"
              label="E-mail"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-age"
              label="Âge"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              id="outlined-Hobby"
              label="Hobby"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
            />
            <div className="bouton-modif">
              <Button
                className="button-save"
                variant="contained"
                onClick={handleEdit}
                sx={{
                  backgroundColor: "#6b041f",
                  "&:hover": { backgroundColor: "#921738" },
                }}
              >
                Enregistrer
              </Button>
              <Button
                className="button-save"
                variant="contained"
                onClick={navigateToProfil}
                sx={{
                  backgroundColor: "#6b041f",
                  "&:hover": { backgroundColor: "#921738" },
                  marginLeft: "5px",
                }}
              >
                Annuler
              </Button>
              {showAlert && (
                <Alert severity="success">
                  Votre profil a été mis à jour !
                </Alert>
              )}{" "}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
export default EditProfil;
