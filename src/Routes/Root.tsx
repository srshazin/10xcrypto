import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import TokenDetails from "./TokenDetails/TokenDetails";
import { AnimatePresence } from "motion/react";
export const Root = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/token/:symbol",
      element: <TokenDetails />,
    },
  ]);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};
