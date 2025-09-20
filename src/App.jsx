// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Link, Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import Bordeaux from "./routes/maps/Bordeaux";

const dev =
  (import.meta && import.meta.env && import.meta.env.DEV) ??
  process.env.NODE_ENV !== "production";

const TracerLazy = dev
  ? lazy(() => import("./routes/tools/PolygonTracer"))
  : null;

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
          gap: 16,
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}
        >
          🍷 Wine Study
        </Link>

        {/* ★ 本番ではリンク自体を出さない */}
        {dev && (
          <Link to="/tools/tracer" style={{ color: "#fff" }}>
            Polygon Tracer
          </Link>
        )}
      </header>

      <Routes>
        <Route path="/maps/bordeaux" element={<Bordeaux />} />
        {dev && TracerLazy && (
          <Route
            path="/tools/tracer"
            element={
              <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
                <TracerLazy />
              </Suspense>
            }
          />
        )}
      </Routes>

      <main style={{ flex: 1, paddingTop: "64px" }}>
        <Outlet />
      </main>

      <footer style={{ textAlign: "center", padding: 16, fontSize: 14 }}>
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
