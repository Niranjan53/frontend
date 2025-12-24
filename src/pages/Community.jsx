import React from "react";

export default function Community() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg,#020617,#0b1220)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        padding: "80px 24px",
        boxSizing: "border-box",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* HERO SECTION */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 80,
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Welcome to the{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#6366f1,#22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Community
            </span>
          </h1>

          <p
            style={{
              fontSize: 20,
              color: "var(--muted)",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            A modern platform where creators, learners, and builders connect,
            share ideas, publish blogs, and grow together.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 32,
            marginBottom: 80,
          }}
        >
          {[
            {
              title: "Create Profile",
              desc: "Build a personal profile with bio, photo, and privacy controls.",
              icon: "👤",
            },
            {
              title: "Write Blogs",
              desc: "Publish blogs, tutorials, and experiences to share your knowledge.",
              icon: "✍️",
            },
            {
              title: "Engage",
              desc: "Comment, discuss, and collaborate with community members.",
              icon: "💬",
            },
            {
              title: "Safe Community",
              desc: "Admins ensure respectful discussion and quality content.",
              icon: "🛡️",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 24,
                padding: "36px 32px",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 28px 60px rgba(0,0,0,0.8)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.6)";
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 18 }}>{f.icon}</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* COMMUNITY ROLES */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 28,
            padding: "48px 40px",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 900,
              marginBottom: 18,
              textAlign: "center",
            }}
          >
            Who Makes This Community?
          </h2>

          <p
            style={{
              color: "var(--muted)",
              fontSize: 18,
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Our platform is powered by people who believe in learning,
            collaboration, and positive engagement.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                role: "Admins",
                desc: "Moderate content, manage users, and keep the platform healthy.",
              },
              {
                role: "Members",
                desc: "Create blogs, comment, and connect with others.",
              },
              {
                role: "Everyone",
                desc: "Contribute respectfully and help grow the community.",
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  padding: 28,
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    marginBottom: 8,
                    color: "var(--accent)",
                  }}
                >
                  {r.role}
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
