import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./EditProfil.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";

function EditProfil() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");

  const edit = async (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer" + token,
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        age: age,
        Hobby: hobby,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom//user",
      options
    );

    const data = await response.json();

    const token = data.token;
  };
  return (
    <div>
      <NavBar />
      <Box
        s
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="inputEdit">
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
            id="outlined-Hobby"
            label="Hobby"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
          <Button className="button-save" variant="contained" onClick={edit}>
            Enregistrer
          </Button>
        </div>
      </Box>
    </div>
  );
}
export default EditProfil;
