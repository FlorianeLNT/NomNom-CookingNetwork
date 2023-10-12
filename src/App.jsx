import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NavBar from "./Component/NavBar/NavBar";
import SignUp from "./Component/Signup/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    // {
    //   path: "/profil",
    //   element: <Profil />,
    // },
    // {
    //   path: "/editprofil",
    //   element: <editProfil />,
    // },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
