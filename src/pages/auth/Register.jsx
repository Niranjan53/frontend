import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setMsg("Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setMsg("User already exists");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Create account</h1>
        <p style={subtitle}>Join the community today</p>

        {msg && <p style={info}>{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button style={primaryBtn}>Create Account</button>
        </form>

        <p style={footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
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
  maxWidth: 440,
  background: "rgba(255,255,255,0.06)",
  borderRadius: 26,
  padding: 42,
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

const info = {
  background: "rgba(34,197,94,0.15)",
  padding: 10,
  borderRadius: 10,
  marginBottom: 16,
  color: "#bbf7d0",
};
