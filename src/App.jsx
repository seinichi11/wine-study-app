import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav style={{ padding: "12px 16px" }}>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </>
  );
}
