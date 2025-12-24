import { useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/reset-password", { email, password });
      setMsg("Password updated successfully");
    } catch {
      setMsg("Something went wrong");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
    outline: "none",
    fontSize: "14px",
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
        backgroundColor: "var(--bg)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        padding: "20px",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--card)",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            Reset Password
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", margin: 0 }}>
            Secure your account with a new password
          </p>
        </div>

        {msg && (
          <div
            style={{
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              backgroundColor: msg.includes("success")
                ? "rgba(123,211,137,0.06)"
                : "rgba(242,139,139,0.06)",
              color: msg.includes("success") ? "#7bd389" : "#f28b8b",
              fontSize: "14px",
              fontWeight: 500,
              border: `1px solid ${
                msg.includes("success")
                  ? "rgba(123,211,137,0.12)"
                  : "rgba(242,139,139,0.12)"
              }`,
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--muted)",
            }}
          >
            Email Address
          </label>
          <input
            className="auth-input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--muted)",
            }}
          >
            New Password
          </label>
          <input
            className="auth-input"
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
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.04)",
              backgroundColor: "var(--accent)",
              color: "#0b0b0b",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow =
                "0 12px 40px rgba(0,0,0,0.7)")
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.6)")
            }
          >
            Update Password
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link
            to="/login"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Back to Login
          </Link>
        </div>
      </div>

      <style>
        {`
          .auth-input:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 6px rgba(156,163,255,0.06);
          }
        `}
      </style>
    </div>
  );
}
