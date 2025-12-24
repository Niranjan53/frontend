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
    <div style={page}>
      <div style={card}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={title}>My Profile</h1>
          <p style={subtitle}>Manage your information and privacy</p>
        </div>

        {/* AVATAR */}
        <div
          style={avatarWrapper}
          onClick={() => fileInputRef.current.click()}
        >
          {photo ? (
            <img src={photo} alt="profile" style={avatarImg} />
          ) : (
            <span style={avatarText}>UPLOAD PHOTO</span>
          )}
        </div>

        <h2 style={name}>{profile.name}</h2>
        <p style={email}>{profile.email}</p>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        {/* BIO */}
        <div style={{ marginTop: 32 }}>
          <label style={label}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell the community about yourself..."
            style={textarea}
          />
        </div>

        {/* PRIVACY */}
        <div style={privacyBox}>
          <label style={privacyLabel}>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              style={checkbox}
            />
            <span>
              {isPrivate ? "Private Profile" : "Public Profile"}
            </span>
          </label>
          <small style={privacyText}>
            {isPrivate
              ? "Only you can view your profile"
              : "Visible to all community members"}
          </small>
        </div>

        {/* SAVE */}
        <button style={saveBtn} onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #7c3aed 0%, #020617 60%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  fontFamily: "Inter, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 520,
  background: "rgba(255,255,255,0.06)",
  borderRadius: 28,
  padding: 44,
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(16px)",
  color: "#e5e7eb",
  textAlign: "center",
};

const header = { marginBottom: 24 };

const title = {
  fontSize: 34,
  fontWeight: 900,
};

const subtitle = {
  color: "#94a3b8",
  fontSize: 15,
};

const avatarWrapper = {
  width: 130,
  height: 130,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "24px auto",
  overflow: "hidden",
};

const avatarImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const avatarText = {
  color: "#020617",
  fontWeight: 900,
  fontSize: 13,
};

const name = {
  fontSize: 22,
  fontWeight: 800,
};

const email = {
  color: "#94a3b8",
  fontSize: 14,
};

const label = {
  display: "block",
  textAlign: "left",
  marginBottom: 8,
  fontWeight: 700,
};

const textarea = {
  width: "100%",
  minHeight: 120,
  padding: 14,
  borderRadius: 14,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#fff",
  resize: "none",
};

const privacyBox = {
  marginTop: 28,
  padding: 16,
  borderRadius: 16,
  background: "rgba(255,255,255,0.04)",
};

const privacyLabel = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontWeight: 700,
};

const checkbox = { width: 18, height: 18 };

const privacyText = {
  fontSize: 12,
  color: "#94a3b8",
};

const saveBtn = {
  width: "100%",
  marginTop: 28,
  padding: "14px",
  borderRadius: 18,
  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  color: "#020617",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
};
