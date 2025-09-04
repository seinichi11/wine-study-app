import "./styles.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Result from "./routes/Result";
import Flashcards from "./routes/Flashcards";
import About from "./routes/About";
import Feedback from "./routes/Feedback";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      { path: "result", element: <Result /> },
      { path: "flashcards", element: <Flashcards /> },
      { path: "about", element: <About /> },
      { path: "feedback", element: <Feedback /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
