import "./NavBar.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToProfil = () => {
    navigate("/profil");
  };
  const navigateToCard = () => {
    navigate("/post");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigateToHome();
  };
  return (
    <div className="NavBar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#6b041f",
            height: "10vh",
            flexDirection: "row",
          }}
        >
          <Toolbar>
            <MenuItem
              onClick={navigateToHome}
              variant="h6"
              component="div"
              sx={{ fontSize: "1.3rem" }}
            >
              Accueil
            </MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem
                  sx={{ fontSize: "1.3rem" }}
                  onClick={navigateToProfil}
                >
                  Mon Profil
                </MenuItem>
                <MenuItem sx={{ fontSize: "1.3rem" }} onClick={navigateToCard}>
                  Publier
                </MenuItem>
                <MenuItem sx={{ fontSize: "1.3rem" }} onClick={handleLogout}>
                  Se déconnecter
                </MenuItem>
              </>
            ) : (
              <MenuItem sx={{ fontSize: "1.3rem" }} onClick={navigateToLogin}>
                Se connecter
              </MenuItem>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
