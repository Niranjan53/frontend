import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminDashboard() {
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [newsletterSendMsg, setNewsletterSendMsg] = useState("");
  const [newsletterSending, setNewsletterSending] = useState(false);

  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({});
  const [advancedStats, setAdvancedStats] = useState({});
  const [newsletterStats, setNewsletterStats] = useState({});
  const [userSearch, setUserSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data || []));
    api.get("/admin/blogs").then((res) => setBlogs(res.data || []));
    api.get("/admin/stats").then((res) => setStats(res.data || {}));
    api.get("/admin/stats/advanced").then((res) => setAdvancedStats(res.data || {}));
    api.get("/newsletter/stats/subscribers").then((res) => setNewsletterStats(res.data || {}));
  }, []);

  /* ================= ACTIONS ================= */
  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    }
  };

  const approveBlog = async (id) => {
    if (window.confirm("Approve this blog?")) {
      await api.put(`/admin/blogs/${id}/approve`);
      setBlogs(blogs.map((b) => (b._id === id ? { ...b, approved: true } : b)));
    }
  };

  const promoteToAdmin = async (id) => {
    if (window.confirm("Promote this user to admin?")) {
      await api.put(`/admin/users/${id}/role`, { role: "admin" });
      setUsers(users.map((u) => (u._id === id ? { ...u, role: "admin" } : u)));
    }
  };

  /* ================= FILTERS ================= */
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author?.name?.toLowerCase().includes(blogSearch.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div style={page}>
      <div style={container}>

        {/* HEADER */}
        <header style={header}>
          <h1 style={title}>Admin Dashboard</h1>
          <p style={subtitle}>Manage users, blogs, and newsletters</p>
        </header>

        {/* STATS */}
        <div style={statsGrid}>
          <Metric label="Users" value={stats.totalUsers} />
          <Metric label="Blogs" value={stats.totalBlogs} />
          <Metric label="Subscribers" value={newsletterStats.count} />
          <Metric label="Comments" value={advancedStats.totalComments} />
        </div>

        {/* NEWSLETTER */}
        <section style={card}>
          <h2 style={sectionTitle}>Send Newsletter</h2>

          <input
            placeholder="Newsletter subject"
            value={newsletterSubject}
            onChange={(e) => setNewsletterSubject(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Write newsletter content..."
            rows={5}
            value={newsletterContent}
            onChange={(e) => setNewsletterContent(e.target.value)}
            style={{ ...input, marginTop: 12 }}
          />

          <button
            style={primaryBtn}
            disabled={newsletterSending}
            onClick={(e) => {
              e.preventDefault();
              setNewsletterSending(true);
              api
                .post("/newsletter/send", {
                  subject: newsletterSubject,
                  content: newsletterContent,
                })
                .then((res) => {
                  setNewsletterSendMsg(res.data.message || "Newsletter sent");
                  setNewsletterSubject("");
                  setNewsletterContent("");
                })
                .catch(() => setNewsletterSendMsg("Failed to send"))
                .finally(() => setNewsletterSending(false));
            }}
          >
            {newsletterSending ? "Sending..." : "Send Newsletter"}
          </button>

          {newsletterSendMsg && <p style={muted}>{newsletterSendMsg}</p>}
        </section>

        {/* MANAGEMENT */}
        <div style={twoCol}>
          {/* USERS */}
          <section style={card}>
            <h2 style={sectionTitle}>Users</h2>
            <input
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              style={input}
            />
            <div style={list}>
              {filteredUsers.map((u) => (
                <Row
                  key={u._id}
                  title={u.name}
                  subtitle={u.email}
                  badge={u.role}
                  onDelete={() => deleteUser(u._id)}
                  onAction={u.role !== "admin" ? () => promoteToAdmin(u._id) : null}
                  actionLabel="Promote"
                />
              ))}
            </div>
          </section>

          {/* BLOGS */}
          <section style={card}>
            <h2 style={sectionTitle}>Blogs</h2>
            <input
              placeholder="Search blogs..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              style={input}
            />
            <div style={list}>
              {filteredBlogs.map((b) => (
                <Row
                  key={b._id}
                  title={b.title}
                  subtitle={`By ${b.author?.name || "Member"}`}
                  badge={b.approved ? "Approved" : "Pending"}
                  onDelete={() => deleteBlog(b._id)}
                  onAction={!b.approved ? () => approveBlog(b._id) : null}
                  actionLabel="Approve"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value }) {
  return (
    <div style={metric}>
      <p style={muted}>{label}</p>
      <h2 style={{ fontSize: 36, fontWeight: 900 }}>{value || 0}</h2>
    </div>
  );
}

function Row({ title, subtitle, badge, onDelete, onAction, actionLabel }) {
  return (
    <div style={row}>
      <div>
        <strong>{title}</strong>
        <div style={muted}>{subtitle}</div>
        <span style={badgeStyle}>{badge}</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {onAction && <button style={ghostBtn} onClick={onAction}>{actionLabel}</button>}
        <button style={dangerBtn} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0b1220)",
  color: "#e5e7eb",
  padding: "64px 24px",
  fontFamily: "Inter, sans-serif",
};

const container = { maxWidth: 1300, margin: "0 auto" };
const header = { marginBottom: 48 };
const title = { fontSize: 44, fontWeight: 900 };
const subtitle = { color: "#94a3b8", fontSize: 16 };

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
  marginBottom: 56,
};

const metric = {
  background: "rgba(255,255,255,0.04)",
  padding: 28,
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.06)",
};

const card = {
  background: "rgba(255,255,255,0.04)",
  padding: 32,
  borderRadius: 24,
  border: "1px solid rgba(255,255,255,0.06)",
  marginBottom: 40,
};

const sectionTitle = { fontSize: 24, fontWeight: 800, marginBottom: 18 };

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "#e5e7eb",
  marginBottom: 12,
};

const primaryBtn = {
  marginTop: 10,
  padding: "14px 18px",
  borderRadius: 14,
  background: "linear-gradient(135deg,#6366f1,#22d3ee)",
  color: "#020617",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
};

const twoCol = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 32,
};

const list = { display: "grid", gap: 12 };

const row = {
  background: "rgba(255,255,255,0.03)",
  padding: 16,
  borderRadius: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.06)",
};

const badgeStyle = {
  display: "inline-block",
  fontSize: 12,
  marginTop: 4,
  color: "#a5b4fc",
};

const ghostBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#c7d2fe",
  cursor: "pointer",
};

const dangerBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  background: "#ef4444",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const muted = { color: "#94a3b8", fontSize: 13 };
