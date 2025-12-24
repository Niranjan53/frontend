import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          fontFamily: "'Inter', 'Poppins', sans-serif",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            padding: "40px",
            borderRadius: "16px",
            background: "var(--card)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            textAlign: "center",
            width: "100%",
            maxWidth: "350px",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ position: "relative", margin: "0 auto 20px", width: 50, height: 50 }}>
            <div
              style={{
                width: 50,
                height: 50,
                border: "4px solid rgba(255,255,255,0.08)",
                borderTop: "4px solid var(--accent)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </div>

          <h4 style={{ color: "var(--text)", marginBottom: "8px", fontWeight: 600 }}>
            Syncing Session
          </h4>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", margin: 0 }}>
            Please wait a moment...
          </p>

          <style>
            {`
              @keyframes spin { to { transform: rotate(360deg); } }
              body { overflow: hidden; }
            `}
          </style>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}