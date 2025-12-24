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
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px 32px",
        backgroundColor: "var(--bg)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        boxSizing: "border-box",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* HEADER */}
        <header style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            Member Directory
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Connect with other members in the community
          </p>
        </header>

        {/* SEARCH */}
        <div
          style={{
            position: "relative",
            marginBottom: "40px",
            maxWidth: "500px",
          }}
        >
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.06)",
              fontSize: "15px",
              outline: "none",
              background: "transparent",
              color: "var(--text)",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid var(--accent)";
              e.target.style.boxShadow =
                "0 0 0 6px rgba(156,163,255,0.06)";
            }}
            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.06)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* MEMBERS GRID */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "var(--muted)",
              background: "var(--card)",
              borderRadius: "16px",
              border: "1px solid var(--border)",
            }}
          >
            No members match your search criteria.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((m) => (
              <div
                key={m._id}
                className="member-card hover-card"
                style={{
                  background: "var(--card)",
                  padding: "24px",
                  borderRadius: "20px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  transition: "transform 0.2s",
                }}
              >
                {/* AVATAR */}
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(156,163,175,0.06)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {m.name.charAt(0).toUpperCase()}
                </div>

                {/* INFO */}
                <div style={{ overflow: "hidden" }}>
                  <h4
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "17px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {m.name}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--muted)",
                      fontSize: "13px",
                      wordBreak: "break-all",
                    }}
                  >
                    {m.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          .member-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
}
