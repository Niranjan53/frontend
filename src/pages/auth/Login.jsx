import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    background: "transparent",
    color: "var(--text)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--card)",
          padding: "40px 36px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(156,163,175,0.06)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 30,
              margin: "0 auto 16px auto",
              boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
            }}
          >
            <span role="img" aria-label="login">
              🔒
            </span>
          </div>

          <h2
            style={{
              fontSize: "26px",
              fontWeight: 800,
              margin: "0 0 8px 0",
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", margin: 0 }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "rgba(242,139,139,0.06)",
              color: "#f28b8b",
              border: "1px solid rgba(242,139,139,0.12)",
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--muted)",
            }}
          >
            Email Address
          </label>
          <input
            className="login-input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              style={{
                fontSize: "13px",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Forgot?
            </Link>
          </div>

          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.04)",
              background: "var(--accent)",
              color: "#0b0b0b",
              fontWeight: 800,
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.03)";
              e.target.style.boxShadow =
                "0 12px 40px rgba(0,0,0,0.7)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.6)";
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            marginTop: "28px",
            textAlign: "center",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Create one
          </Link>
        </p>
      </div>

      <style>
        {`
          .login-input:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 6px rgba(156,163,255,0.06);
          }
        `}
      </style>
    </div>
  );
}
