import React from "react";

export default function Community() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#020617)",
        padding: "80px 20px",
        color: "#e5e7eb",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 20 }}>
          Community Hub
        </h1>

        <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 40 }}>
          A space where creators, learners, and innovators connect and grow.
        </p>

        <div style={glassCard}>
          <h2 style={{ fontSize: 26, marginBottom: 12 }}>What you can do</h2>
          <ul style={{ color: "#cbd5f5", lineHeight: 1.8 }}>
            <li>Create and manage your profile</li>
            <li>Publish blogs and tutorials</li>
            <li>Connect with other members</li>
            <li>Control privacy and visibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const glassCard = {
  background: "rgba(255,255,255,0.04)",
  borderRadius: 24,
  padding: 36,
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
};
