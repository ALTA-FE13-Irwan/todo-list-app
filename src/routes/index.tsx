import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { FC } from "react";
import axios from "axios";

import Home from "../pages";
import Detail from "../pages/DetailTodo";

axios.defaults.baseURL = "https://api.todoist.com/rest/v2/tasks";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <Detail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
