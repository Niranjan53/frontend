import { useEffect, useState } from "react";
import api from "../../api/api";

export default function MemberDirectory() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/users").then((res) => {
      setMembers(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  const filtered = members.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h1 style={title}>Community Members</h1>
        <p style={subtitle}>
          Discover and connect with people in the community
        </p>

        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div style={empty}>No members found</div>
      ) : (
        <div style={grid}>
          {filtered.map((m) => (
            <div key={m._id} style={card}>
              <div style={avatar}>
                {m.name?.charAt(0).toUpperCase()}
              </div>

              <div style={info}>
                <h3 style={name}>{m.name}</h3>
                <p style={email}>{m.email}</p>
              </div>

              <button style={viewBtn}>View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #7c3aed 0%, #020617 60%)",
  padding: "64px 24px",
  fontFamily: "Inter, sans-serif",
  color: "#e5e7eb",
};

const header = {
  maxWidth: 1200,
  margin: "0 auto 56px",
  textAlign: "center",
};

const title = {
  fontSize: 40,
  fontWeight: 900,
};

const subtitle = {
  color: "#94a3b8",
  fontSize: 16,
  marginTop: 8,
};

const searchInput = {
  marginTop: 24,
  width: "100%",
  maxWidth: 420,
  padding: "14px 18px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
};

const grid = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  gap: 28,
};

const card = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: 22,
  padding: 28,
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  transition: "transform .2s ease, box-shadow .2s ease",
};

const avatar = {
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  fontWeight: 900,
  color: "#020617",
  margin: "0 auto 18px",
};

const info = {
  marginBottom: 18,
};

const name = {
  fontSize: 18,
  fontWeight: 800,
};

const email = {
  fontSize: 13,
  color: "#94a3b8",
  wordBreak: "break-all",
};

const viewBtn = {
  padding: "10px 20px",
  borderRadius: 999,
  background: "rgba(124,58,237,0.2)",
  color: "#c7d2fe",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const empty = {
  textAlign: "center",
  color: "#94a3b8",
  padding: 80,
};
