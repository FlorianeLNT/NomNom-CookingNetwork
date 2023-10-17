import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import SignUp from "./Component/Signup/Signup";
import CreateCard from "./Component/createCard/createCard";
import Profil from "./Component/Profil/Profil";
import EditProfil from "./Component/EditProfil/EditProfil";
import UserProfil from "./Component/UserProfil/UserProfil";

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
    {
      path: "/post",
      element: <CreateCard />,
    },
    {
      path: "/profil",
      element: <Profil />,
    },
    {
      path: "/editingprofil",
      element: <EditProfil />,
    },
    {
      path: "/user/:userId",
      element: <UserProfil />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
//fix
