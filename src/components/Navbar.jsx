import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const linkStyle = {
    textDecoration: "none",
    color: "var(--muted)",
    fontWeight: 600,
    padding: "8px 12px",
    borderRadius: 10,
    transition: "all 0.18s cubic-bezier(.2,.9,.3,1)",
  };

  const activeStyle = {
    backgroundColor: "rgba(156,163,175,0.06)",
    color: "var(--accent)",
    fontWeight: 700,
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  };

  return (
    <nav
      style={{
        width: "100%",
        padding: "0 32px",
        height: "70px",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--panel)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Section */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link
            to="/"
            style={{
              ...linkStyle,
              fontWeight: 800,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img src="/src/assets/logo.png" alt="Community" style={{ height: 26 }} />
          </Link>

          <Link
            to="/community"
            style={{ ...linkStyle, fontWeight: 700, fontSize: "1.1rem" }}
          >
            Community Website
          </Link>

          <div style={{ display: "flex", gap: 8 }}>
            <Link
              to="/"
              className="nav-link"
              style={location.pathname === "/" ? { ...linkStyle, ...activeStyle } : linkStyle}
            >
              Home
            </Link>
            <Link
              to="/members"
              className="nav-link"
              style={location.pathname === "/members" ? { ...linkStyle, ...activeStyle } : linkStyle}
            >
              Members
            </Link>
            <Link
              to="/blogs"
              className="nav-link"
              style={location.pathname === "/blogs" ? { ...linkStyle, ...activeStyle } : linkStyle}
            >
              Blogs
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <ThemeToggle />

          {user ? (
            <>
              <Link to="/profile" style={linkStyle} className="header-btn">
                Dashboard
              </Link>

              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="header-btn"
                  style={{
                    ...linkStyle,
                    backgroundColor: "rgba(99,102,241,0.06)",
                    color: "var(--accent)",
                    border: "1px solid rgba(99,102,241,0.06)",
                    padding: "8px 14px",
                  }}
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={logout}
                className="header-btn"
                style={{
                  marginLeft: 8,
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.04)",
                  backgroundColor: "transparent",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle} className="header-btn">
                Sign In
              </Link>
              <Link
                to="/register"
                className="header-btn"
                style={{
                  ...linkStyle,
                  backgroundColor: "var(--accent)",
                  color: "#07070a",
                  padding: "8px 18px",
                  borderRadius: 12,
                  fontWeight: 800,
                }}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .nav-link:hover {
            background-color: rgba(255,255,255,0.02);
            color: var(--accent) !important;
          }

          .header-btn {
            transition: transform 0.15s ease, box-shadow 0.12s ease;
          }

          .header-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 18px rgba(2,6,23,0.25);
          }
        `}
      </style>
    </nav>
  );
}
