import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/blogs").then((res) => setBlogs(res.data || []));
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>Community Blogs</h1>
            <p style={subtitle}>
              Discover stories, ideas, and experiences shared by the community
            </p>
          </div>

          <Link to="/blogs/create" style={{ textDecoration: "none" }}>
            <button style={createBtn}>✍ Create Blog</button>
          </Link>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search blogs or authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        {/* BLOG GRID */}
        <div style={grid}>
          {filteredBlogs.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No blogs found</p>
          ) : (
            filteredBlogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog._id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={card}>
                  <h3 style={cardTitle}>{blog.title}</h3>
                  <p style={cardExcerpt}>
                    {blog.content?.slice(0, 120)}...
                  </p>

                  <div style={cardFooter}>
                    <span style={author}>
                      ✍ {blog.author?.name || "Member"}
                    </span>
                    <span
                      style={{
                        ...status,
                        background: blog.approved
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(234,179,8,0.15)",
                        color: blog.approved ? "#22c55e" : "#eab308",
                      }}
                    >
                      {blog.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
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
  padding: "64px 24px",
  fontFamily: "Inter, sans-serif",
  color: "#e5e7eb",
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 16,
  marginBottom: 32,
};

const title = {
  fontSize: 38,
  fontWeight: 900,
};

const subtitle = {
  color: "#94a3b8",
  fontSize: 15,
};

const createBtn = {
  padding: "14px 22px",
  borderRadius: 18,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  border: "none",
  fontWeight: 900,
  cursor: "pointer",
  color: "#020617",
};

const searchInput = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e5e7eb",
  marginBottom: 36,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: 24,
};

const card = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: 24,
  padding: 26,
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const cardTitle = {
  fontSize: 20,
  fontWeight: 800,
  marginBottom: 10,
};

const cardExcerpt = {
  fontSize: 14,
  color: "#cbd5f5",
  lineHeight: 1.6,
  marginBottom: 18,
};

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const author = {
  fontSize: 13,
  color: "#94a3b8",
};

const status = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};
