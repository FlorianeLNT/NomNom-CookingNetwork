import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./EditProfil.css";

function EditProfil() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-firstName"
          label="Prénom"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="outlined-firstName"
          label="Nom"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="outlined-email"
          label="E-mail"
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-age"
          label="Âge"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-firstName"
          label="Occupation"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </Box>
  );
}
export default EditProfil;
