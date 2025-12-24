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
        width: "100%",
        background: "linear-gradient(135deg,#020617,#0b1220)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        padding: "80px 20px",
        boxSizing: "border-box",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        
        {/* ================= HERO SECTION ================= */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: 100,
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 900,
                marginBottom: 22,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Build. Share.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#6366f1,#22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Connect.
              </span>
            </h1>

            <p
              style={{
                fontSize: 20,
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              A modern community platform where people create profiles, publish
              blogs, share ideas, and connect with others who love learning and
              collaboration.
            </p>

            <div
              style={{
                display: "flex",
                gap: 22,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {!user && (
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      padding: "16px 40px",
                      borderRadius: 999,
                      background:
                        "linear-gradient(135deg,#6366f1,#22d3ee)",
                      color: "#020617",
                      border: "none",
                      fontWeight: 900,
                      fontSize: 18,
                      cursor: "pointer",
                      boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow =
                        "0 20px 60px rgba(0,0,0,0.8)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 14px 40px rgba(0,0,0,0.7)";
                    }}
                  >
                    Get Started
                  </button>
                </Link>
              )}

              <Link to="/blogs" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "16px 38px",
                    borderRadius: 999,
                    background: "transparent",
                    color: "#c7d2fe",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  Explore Blogs
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= REGISTER CTA SECTION ================= */}
        {!user && (
          <section
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 32,
              padding: "64px 40px",
              textAlign: "center",
              marginBottom: 90,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.8)",
            }}
          >
            <h2
              style={{
                fontSize: 36,
                fontWeight: 900,
                marginBottom: 16,
              }}
            >
              Join the Community Today 🚀
            </h2>

            <p
              style={{
                fontSize: 18,
                color: "var(--muted)",
                maxWidth: 640,
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              Create your free account to write blogs, comment on posts, build
              your profile, and connect with like-minded people from around the
              world.
            </p>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "18px 46px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg,#22d3ee,#6366f1)",
                  color: "#020617",
                  fontWeight: 900,
                  fontSize: 20,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.8)",
                }}
              >
                Create Your Account
              </button>
            </Link>
          </section>
        )}

        {/* ================= NEWSLETTER ================= */}
        {(!user || user.role !== "admin") && (
          <div style={{ marginBottom: 70 }}>
            <NewsletterSignup />
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 32,
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          Made for social connection · Built with care
          <br />
          © 2025 Community Web. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
