import Frame from "pages/Frame";
import Mockup from "pages/Mockup";
import Sample from "pages/Sample";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "frame", element: <Frame /> },
      { path: "mockup", element: <Mockup /> },
      { path: "sample", element: <Sample /> },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
