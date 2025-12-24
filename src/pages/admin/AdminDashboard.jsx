import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [advancedStats, setAdvancedStats] = useState({});
  const [newsletterStats, setNewsletterStats] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState("");

  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data || {}));
    api.get("/admin/stats/advanced").then(res => setAdvancedStats(res.data || {}));
    api.get("/newsletter/stats/subscribers").then(res => setNewsletterStats(res.data || {}));
    api.get("/admin/blogs").then(res => setBlogs(res.data || []));
  }, []);

  /* ================= NEWSLETTER ================= */
  const sendNewsletter = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage("");

    try {
      await api.post("/newsletter/send", {
        subject: newsletterSubject,
        content: newsletterContent,
      });
      setMessage("Newsletter sent successfully");
      setNewsletterSubject("");
      setNewsletterContent("");
    } catch {
      setMessage("Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  /* ================= BLOG ACTIONS ================= */
  const approveBlog = async (id) => {
    if (window.confirm("Approve this blog?")) {
      await api.put(`/admin/blogs/${id}/approve`);
      setBlogs(
        blogs.map(b =>
          b._id === id ? { ...b, approved: true } : b
        )
      );
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter(b => b._id !== id));
    }
  };

  const filteredBlogs = blogs.filter(
    b =>
      b.title?.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author?.name?.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div style={page}>
      <div style={card}>

        {/* HEADER */}
        <h1 style={title}>Admin Dashboard</h1>
        <p style={subtitle}>Platform control & analytics</p>

        {/* STATS */}
        <div style={statsGrid}>
          <Stat label="Users" value={stats.totalUsers} />
          <Stat label="Blogs" value={stats.totalBlogs} />
          <Stat label="Subscribers" value={newsletterStats.count} />
          <Stat label="Comments" value={advancedStats.totalComments} />
        </div>

        {/* NEWSLETTER */}
        <Section title="📢 Send Newsletter">
          <form onSubmit={sendNewsletter}>
            <input
              placeholder="Newsletter subject"
              value={newsletterSubject}
              onChange={(e) => setNewsletterSubject(e.target.value)}
              style={input}
              required
            />
            <textarea
              placeholder="Write newsletter content..."
              rows={4}
              value={newsletterContent}
              onChange={(e) => setNewsletterContent(e.target.value)}
              style={{ ...input, marginTop: 14 }}
              required
            />
            <button style={button} disabled={sending}>
              {sending ? "Sending..." : "Send Newsletter"}
            </button>
            {message && <p style={msg}>{message}</p>}
          </form>
        </Section>

        {/* BLOG MANAGEMENT */}
        <Section title="📝 Manage Blogs">
          <input
            placeholder="Search blogs..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            style={input}
          />

          <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
            {filteredBlogs.length === 0 && (
              <p style={{ color: "#c4b5fd" }}>No blogs found</p>
            )}

            {filteredBlogs.map((b) => (
              <div key={b._id} style={blogItem}>
                <div>
                  <strong>{b.title}</strong>
                  <div style={blogMeta}>
                    By {b.author?.name || "Member"} ·{" "}
                    {b.approved ? "Approved" : "Pending"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  {!b.approved && (
                    <button style={smallBtn} onClick={() => approveBlog(b._id)}>
                      Approve
                    </button>
                  )}
                  <button style={dangerBtn} onClick={() => deleteBlog(b._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ label, value }) {
  return (
    <div style={statCard}>
      <span style={statLabel}>{label}</span>
      <h2 style={statValue}>{value || 0}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={section}>
      <h2 style={sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(1200px 600px at top, #7c3aed 0%, #020617 60%)",
  display: "flex",
  justifyContent: "center",
  padding: "40px 20px",
  fontFamily: "'Inter', sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 900,
  background: "rgba(124,58,237,0.18)",
  borderRadius: 28,
  padding: "48px 40px",
  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(14px)",
  color: "#e5e7eb",
};

const title = {
  fontSize: 36,
  fontWeight: 900,
  textAlign: "center",
};

const subtitle = {
  textAlign: "center",
  color: "#c4b5fd",
  marginBottom: 40,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
  gap: 20,
  marginBottom: 48,
};

const statCard = {
  background: "rgba(255,255,255,0.08)",
  borderRadius: 18,
  padding: 22,
  textAlign: "center",
};

const statLabel = { fontSize: 14, color: "#ddd6fe" };
const statValue = { fontSize: 32, fontWeight: 900 };

const section = {
  background: "rgba(2,6,23,0.55)",
  borderRadius: 20,
  padding: 28,
  marginBottom: 40,
};

const sectionTitle = {
  fontSize: 24,
  fontWeight: 800,
  marginBottom: 18,
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(2,6,23,0.6)",
  color: "#e5e7eb",
  outline: "none",
};

const button = {
  marginTop: 18,
  width: "100%",
  padding: "14px",
  borderRadius: 14,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  color: "#020617",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
};

const msg = { marginTop: 12, textAlign: "center", color: "#a5b4fc" };

const blogItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255,255,255,0.08)",
  padding: 16,
  borderRadius: 16,
};

const blogMeta = {
  fontSize: 13,
  color: "#c4b5fd",
};

const smallBtn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
  background: "#4ade80",
  cursor: "pointer",
};

const dangerBtn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
  background: "#f87171",
  cursor: "pointer",
};
