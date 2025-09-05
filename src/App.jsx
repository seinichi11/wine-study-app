import { Link, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ScrollToTop />
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#111",
          color: "#fff",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          style={{ color: "#fff", fontWeight: "700", textDecoration: "none" }}
        >
          🍷 Wine Study
        </Link>
      </header>

      <main style={{ flex: 1, paddingTop: "64px" }}>
        <Outlet />
      </main>
      <footer
        style={{ textAlign: "center", padding: "16px", fontSize: "14px" }}
      >
        <a href="/about" style={{ marginRight: 12 }}>
          About
        </a>
        <a href="/feedback" style={{ marginRight: 12 }}>
          Feedback
        </a>
        <a
          href="https://www.buymeacoffee.com/yourname"
          target="_blank"
          rel="noopener noreferrer"
        >
          ☕ 応援はこちら
        </a>
      </footer>
    </div>
  );
}
