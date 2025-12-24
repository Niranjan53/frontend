import { useEffect, useRef, useState } from "react";
import api from "../../api/api";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setProfile(res.data);
      setBio(res.data.bio || "");
      setPhoto(res.data.profilePhoto || "");
      setIsPrivate(res.data.isPrivate || false);
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const updateProfile = async () => {
    try {
      const res = await api.put("/users/me", {
        bio,
        profilePhoto: photo,
        isPrivate,
      });
      setProfile(res.data);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--bg)",
        padding: "48px 20px",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: "var(--card)",
          borderRadius: 28,
          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "36px 32px",
            background:
              "linear-gradient(135deg, rgba(156,163,255,0.18), rgba(99,102,241,0.12))",
          }}
        >
          <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 6 }}>
            My Profile
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Manage your personal information and visibility
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: 32 }}>
          {/* AVATAR + INFO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            <div
              onClick={() => fileInputRef.current.click()}
              className="profile-avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(156,163,175,0.06)",
                border: "4px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
              title="Click to upload photo"
            >
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontWeight: 700, color: "var(--accent)" }}>
                  ADD PHOTO
                </span>
              )}
            </div>

            <div>
              <h3 style={{ marginBottom: 4, fontWeight: 700 }}>
                {profile.name}
              </h3>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>
                {profile.email}
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* BIO */}
          <label style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell others about yourself..."
            style={{
              width: "100%",
              minHeight: 120,
              padding: 14,
              borderRadius: 14,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "var(--text)",
              marginBottom: 24,
            }}
          />

          {/* PRIVACY */}
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              background: "rgba(255,255,255,0.04)",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <div>
              <strong>
                {isPrivate ? "Private Profile" : "Public Profile"}
              </strong>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                {isPrivate
                  ? "Only you can see your profile"
                  : "Visible to community members"}
              </p>
            </div>
          </div>

          {/* SAVE */}
          <button
            onClick={updateProfile}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 16,
              background: "var(--accent)",
              color: "#0b0b0b",
              fontWeight: 800,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <style>
        {`
          .profile-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 16px 32px rgba(79,70,229,0.15);
          }
        `}
      </style>
    </div>
  );
}
