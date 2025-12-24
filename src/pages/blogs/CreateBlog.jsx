import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/blogs", { title, content, status });
      navigate("/blogs");
    } catch {
      alert("Error saving blog. Please try again.");
    }
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    background: "transparent",
    color: "var(--text)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--muted)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--bg)",
        padding: "40px 20px",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        color: "var(--text)",
      }}
    >
      <div
        className="hover-card"
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "var(--card)",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          border: "1px solid var(--border)",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            New Blog Post
          </h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Share your ideas and insights with the community
          </p>
        </div>

        {/* TITLE */}
        <label style={labelStyle}>Headline</label>
        <input
          className="blog-input"
          placeholder="e.g., The Future of Reinforcement Learning"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputBaseStyle}
        />

        {/* STATUS */}
        <label style={labelStyle}>Visibility</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            ...inputBaseStyle,
            appearance: "none",
          }}
        >
          <option value="draft">Save as Draft (Private)</option>
          <option value="published">Publish (Public)</option>
        </select>

        {/* CONTENT */}
        <label style={labelStyle}>Content</label>
        <textarea
          className="blog-input"
          placeholder="Start writing your story here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          style={{
            ...inputBaseStyle,
            resize: "vertical",
            lineHeight: 1.7,
            minHeight: "220px",
            fontWeight: 500,
          }}
        />

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
          <button
            onClick={submit}
            style={{
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.04)",
              backgroundColor: "var(--accent)",
              color: "#0b0b0b",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
              flex: 2,
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.04)";
              e.target.style.boxShadow =
                "0 12px 40px rgba(0,0,0,0.7)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow =
                "0 8px 24px rgba(0,0,0,0.6)";
            }}
          >
            {status === "published" ? "Publish Post" : "Save Draft"}
          </button>

          <button
            onClick={() => navigate("/blogs")}
            style={{
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.04)",
              backgroundColor: "transparent",
              color: "var(--muted)",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <style>
        {`
          .blog-input:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
          }

          @media (max-width: 600px) {
            .blog-input {
              font-size: 14px !important;
              padding: 10px 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
