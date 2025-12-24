import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NewsletterSignup from "../components/NewsletterSignup";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #7c3aed, #020617 45%)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HERO */}
        <section style={{ textAlign: "center", marginBottom: 100 }}>
          <h1 style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1 }}>
            Build <span style={{ color: "#a78bfa" }}>limitless</span>
            <br />
            communities. Faster.
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 20,
              color: "#cbd5f5",
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            Create profiles, publish blogs, manage members, and grow your
            community — all from one powerful platform.
          </p>

          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 16,
              justifyContent: "center",
            }}
          >
            {!user && (
              <Link to="/register">
                <button style={primaryBtn}>Get Started</button>
              </Link>
            )}
            <Link to="/blogs">
              <button style={ghostBtn}>Explore Blogs</button>
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        {(!user || user.role !== "admin") && <NewsletterSignup />}

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 80,
            textAlign: "center",
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          © 2025 Community Platform · Built with ❤️
        </footer>
      </div>
    </div>
  );
}

const primaryBtn = {
  padding: "16px 36px",
  borderRadius: 16,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  color: "#020617",
  fontWeight: 800,
  fontSize: 18,
  border: "none",
  cursor: "pointer",
};

const ghostBtn = {
  padding: "16px 36px",
  borderRadius: 16,
  background: "transparent",
  color: "#c7d2fe",
  border: "1px solid rgba(255,255,255,0.15)",
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
};
