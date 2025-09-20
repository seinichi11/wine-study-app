import "./styles.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Result from "./routes/Result";
import Flashcards from "./routes/Flashcards";
import About from "./routes/About";
import Feedback from "./routes/Feedback";
import NotFound from "./routes/NotFound";
import ArticlesIndex from "./routes/articles/Index";
import Burgundy from "./routes/articles/Burgundy";
import Chardonnay from "./routes/articles/Chardonnay";
import BordeauxClassification from "./routes/articles/BordeauxClassification";
import MapBordeaux from "./routes/maps/Bordeaux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      { path: "quiz/:topic", element: <Quiz /> },
      { path: "flashcards", element: <Flashcards /> },
      { path: "flashcards/:topic", element: <Flashcards /> },
      { path: "result", element: <Result /> },
      { path: "about", element: <About /> },
      { path: "feedback", element: <Feedback /> },
      { path: "*", element: <NotFound /> },
      { path: "articles", element: <ArticlesIndex /> },
      // articles
      { path: "articles/burgundy", element: <Burgundy /> },
      { path: "articles/chardonnay", element: <Chardonnay /> },
      {
        path: "articles/bordeaux-classification",
        element: <BordeauxClassification />,
      },
      // map
      { path: "maps/burgundy", element: <MapBordeaux /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);
