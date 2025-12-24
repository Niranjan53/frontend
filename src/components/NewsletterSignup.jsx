import { useState } from "react";
import api from "../api/api";

export default function NewsletterSignup({
  compact = false,
  style = {},
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/newsletter/subscribe", { email });
      setMessage(res.data.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className={`hover-card fade-in ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: "var(--card)",
        padding: 22,
        borderRadius: 14,
        maxWidth: 420,
        margin: compact ? 0 : "28px auto",
        border: "1px solid var(--border)",
        ...style,
      }}
    >
      <h3
        style={{
          marginBottom: 8,
          color: "var(--accent)",
          fontWeight: 800,
        }}
      >
        Join the Community Dispatch
      </h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        required
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.04)",
          width: "100%",
          fontSize: 15,
          background: "transparent",
          color: "var(--text)",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          background: "var(--accent)",
          color: "#071428",
          border: "none",
          borderRadius: 10,
          padding: "10px 18px",
          fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Joining..." : "Join Dispatch"}
      </button>

      {message && (
        <div
          style={{
            color: message.toLowerCase().includes("subscribed")
              ? "#7bd389"
              : "#f28b8b",
            marginTop: 8,
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}
