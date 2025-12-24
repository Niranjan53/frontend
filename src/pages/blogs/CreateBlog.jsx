import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      await api.post("/blogs", { title, content, status });
      navigate("/blogs");
    } catch {
      alert("Failed to create blog");
    }
  };

  return (
    <div style={page}>
      <div style={editorCard}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={heading}>Write a New Blog</h1>
          <p style={subHeading}>
            Share your knowledge, ideas, and experiences with the community
          </p>
        </div>

        {/* TITLE */}
        <input
          placeholder="Blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={titleInput}
        />

        {/* STATUS */}
        <div style={metaRow}>
          <label style={label}>Visibility</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={select}
          >
            <option value="draft">Draft (Private)</option>
            <option value="published">Publish (Public)</option>
          </select>
        </div>

        {/* CONTENT */}
        <textarea
          placeholder="Start writing your blog here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={contentBox}
        />

        {/* ACTIONS */}
        <div style={actions}>
          <button onClick={submit} style={publishBtn}>
            {status === "published" ? "Publish Blog" : "Save Draft"}
          </button>

          <button
            onClick={() => navigate("/blogs")}
            style={cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #7c3aed 0%, #020617 55%)",
  display: "flex",
  justifyContent: "center",
  padding: "64px 20px",
  fontFamily: "Inter, sans-serif",
  color: "#e5e7eb",
};

const editorCard = {
  width: "100%",
  maxWidth: 900,
  background: "rgba(255,255,255,0.06)",
  borderRadius: 28,
  padding: 42,
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
};

const header = {
  marginBottom: 32,
};

const heading = {
  fontSize: 36,
  fontWeight: 900,
};

const subHeading = {
  color: "#94a3b8",
  fontSize: 15,
};

const titleInput = {
  width: "100%",
  padding: "18px 20px",
  borderRadius: 18,
  fontSize: 26,
  fontWeight: 800,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  marginBottom: 24,
};

const metaRow = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 24,
};

const label = {
  fontWeight: 700,
  color: "#c7d2fe",
};

const select = {
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e5e7eb",
};

const contentBox = {
  width: "100%",
  minHeight: 300,
  padding: 20,
  fontSize: 16,
  lineHeight: 1.7,
  borderRadius: 20,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e5e7eb",
  resize: "vertical",
  marginBottom: 32,
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 16,
};

const publishBtn = {
  padding: "14px 28px",
  borderRadius: 999,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  border: "none",
  fontWeight: 900,
  cursor: "pointer",
  color: "#020617",
};

const cancelBtn = {
  padding: "14px 22px",
  borderRadius: 999,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#94a3b8",
  cursor: "pointer",
};
