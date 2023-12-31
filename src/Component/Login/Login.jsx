import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="/"
        sx={{ color: "black", "&:hover": { color: "#921738" } }}
      >
        Nom Nom Cooking Network
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const navigateToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/nom-nom/login",
      options
    );

    const data = await response.json();
    console.log(data);

    if (data.success === true) {
      const token = data.token;
      localStorage.setItem("token", token);
      setShowAlert(true);
      setTimeout(() => {
        navigateToHome();
      }, 1000);
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            onClick={navigateToHome}
            className="avatar"
            sx={{
              m: 1,
              bgcolor: "#6b041f",
              "&:hover": { backgroundColor: "#921738" },
            }}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Addresse E-Mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#6b041f",
                "&:hover": { backgroundColor: "#921738" },
              }}
            >
              Se connecter
            </Button>
            {showAlert && (
              <Alert severity="success">
                Vous êtes connecté, redirection vers l'acceuil
              </Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "#6b041f",
                    textDecoration: "none",
                    "&:hover": { color: "#921738" },
                  }}
                >
                  Mot de passe oublié
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    color: "#6b041f",
                    textDecoration: "none",
                    "&:hover": { color: "#921738" },
                  }}
                >
                  {"Créez un compte"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {message && <div>{message}</div>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
