import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Welcome back</h1>
        <p style={subtitle}>Log in to your community account</p>

        {error && <p style={errorMsg}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={primaryBtn}>Login</button>
        </form>

        <div style={footer}>
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            Don’t have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const page = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #7c3aed, #020617 55%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 420,
  background: "rgba(255,255,255,0.06)",
  borderRadius: 26,
  padding: 40,
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(16px)",
  color: "#e5e7eb",
};

const title = { fontSize: 32, fontWeight: 900 };
const subtitle = { color: "#94a3b8", marginBottom: 32 };

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#fff",
  marginBottom: 16,
};

const primaryBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: 16,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  color: "#020617",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  marginTop: 12,
};

const footer = {
  marginTop: 24,
  textAlign: "center",
  fontSize: 14,
  color: "#94a3b8",
};

const errorMsg = {
  background: "rgba(239,68,68,0.15)",
  padding: 10,
  borderRadius: 10,
  marginBottom: 16,
  color: "#fecaca",
};
