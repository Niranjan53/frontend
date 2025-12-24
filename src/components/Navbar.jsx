import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--panel)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ fontWeight: 900, fontSize: 22 }}>
          Community<span style={{ color: "var(--accent)" }}>Hub</span>
        </Link>

        {/* LINKS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <Link to="/blogs">Blogs</Link>
          <Link to="/members">Members</Link>

          {user && <Link to="/profile">Profile</Link>}

          {user?.role === "admin" && (
            <Link to="/admin" style={{ color: "var(--accent)" }}>
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Register</button>
              </Link>
            </>
          ) : (
            <button className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
