import { useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/reset-password", { email, password });
      setMsg("Password updated successfully");
    } catch {
      setMsg("Reset failed");
    }
  };

  return (
    <div className="container fade-in" style={{ maxWidth: 420 }}>
      <h2 style={{ fontSize: 32, fontWeight: 900 }}>Reset Password</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary" style={{ width: "100%" }}>
          Update Password
        </button>
      </form>

      <Link to="/login" className="muted">
        Back to Login
      </Link>
    </div>
  );
}
