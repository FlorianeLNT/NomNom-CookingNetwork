import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";

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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
