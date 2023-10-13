import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToProfil = () => {
    navigate("/profil");
  };
  // const navigateToEditProfil = () => {
  //   navigate("/editprofil");
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigateToHome();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#6b041f", height: "10vh" }}
      >
        <Toolbar>
          <MenuItem
            onClick={navigateToHome}
            variant="h6"
            component="div"
            sx={{ fontSize: "2rem" }}
          >
            Accueil
          </MenuItem>
          {isAuthenticated ? (
            <>
              <MenuItem sx={{ fontSize: "2em" }} onClick={navigateToProfil}>
                Mon Profil
              </MenuItem>
              <MenuItem sx={{ fontSize: "2em" }} onClick={handleLogout}>
                Déconnexion
              </MenuItem>
              {/* <MenuItem onClick={navigateToEditProfil}>
                Modifier Profil
              </MenuItem> */}
            </>
          ) : (
            <MenuItem sx={{ fontSize: "2rem" }} onClick={navigateToLogin}>
              Connexion
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//aaa
