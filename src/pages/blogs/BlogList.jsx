import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function BlogList() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => setBlogs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCommentChange = (blogId, value) => {
    setCommentText((prev) => ({
      ...prev,
      [blogId]: value,
    }));
  };

  const addComment = async (blogId) => {
    if (!commentText[blogId]) {
      alert("Enter a comment");
      return;
    }
    try {
      await api.post(`/blogs/${blogId}/comments`, {
        text: commentText[blogId],
      });
      alert("Comment added");
      setCommentText((prev) => ({ ...prev, [blogId]: "" }));
    } catch {
      alert("Failed to add comment");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          background: "var(--bg)",
          color: "var(--accent)",
          fontWeight: 600,
        }}
      >
        Fetching community insights...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--bg)",
        padding: "40px 20px",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        color: "var(--text)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: 0,
              }}
            >
              Community Blogs
            </h2>
            <p style={{ color: "var(--muted)", marginTop: 4 }}>
              Stay updated with the latest ideas from members
            </p>
          </div>

          {user && (
            <Link to="/blogs/create" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.04)",
                  backgroundColor: "var(--accent)",
                  color: "#0b0b0b",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                }}
              >
                + Create Post
              </button>
            </Link>
          )}
        </div>

        {/* BLOG LIST */}
        {blogs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 60,
              background: "var(--card)",
              borderRadius: 20,
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            No blogs published yet. Be the first to share!
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              style={{
                background: "var(--card)",
                padding: 32,
                borderRadius: 22,
                marginBottom: 32,
                border: "1px solid var(--border)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
            >
              {/* AUTHOR */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(156,163,175,0.06)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {(blog.author?.name || "M").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {blog.author?.name || "Member"}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                {blog.title}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  fontSize: 16,
                }}
              >
                {blog.content}
              </p>

              {/* COMMENTS */}
              {user && (
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <input
                    className="blog-input"
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[blog._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(blog._id, e.target.value)
                    }
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "transparent",
                      color: "var(--text)",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => addComment(blog._id)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 12,
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style>
        {`
          .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px -8px rgba(79,70,229,0.18);
          }
          .blog-input:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 4px rgba(79,70,229,0.12);
          }
        `}
      </style>
    </div>
  );
}
