import "./NavBarMobile.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
//fix
export default function MobileAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={navigateToHome}>
          <ListItemText>Accueil</ListItemText>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem button onClick={navigateToProfil}>
              <ListItemText>Mon Profil</ListItemText>
            </ListItem>
            <ListItem button onClick={navigateToCard}>
              <ListItemText>Publier</ListItemText>
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText>Se déconnecter</ListItemText>
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={navigateToLogin}>
            <ListItemText>Se connecter</ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className="NavBarMobile">
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: "16px", display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
