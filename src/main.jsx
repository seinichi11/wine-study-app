import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Result from "./routes/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "quiz", element: <Quiz /> },
      { path: "result", element: <Result /> }
      // flashcards は後で追加
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
