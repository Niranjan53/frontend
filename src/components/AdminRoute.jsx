import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw", // Force full viewport width
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6", // Slightly deeper gray for better contrast
          fontFamily: "'Inter', 'Poppins', sans-serif",
          position: "fixed", // Ensures it covers the whole screen regardless of parent
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            padding: "40px",
            borderRadius: "16px",
            background: "#ffffff",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          {/* Modern Gradient Spinner */}
          <div
            className="spinner"
            style={{
              width: 50,
              height: 50,
              border: "5px solid #f3f3f3",
              borderTop: "5px solid #4f46e5", // Indigo color
              borderRight: "5px solid #818cf8", // Lighter indigo for gradient effect
              borderRadius: "50%",
              margin: "0 auto 20px",
              animation: "spin 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite",
            }}
          />
          
          <h3 style={{ color: "#111827", margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: 600 }}>
            Securing Connection
          </h3>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>
            Verifying administrative privileges...
          </p>

          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              body { margin: 0; padding: 0; }
            `}
          </style>
        </div>
      </div>
    );
  }

  // Functional logic remains identical
  return user && user.role === "admin" 
    ? <>{children}</> 
    : <Navigate to="/" />;
}