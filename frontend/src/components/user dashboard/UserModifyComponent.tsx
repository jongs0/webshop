import { useState, useEffect } from "react";
import UserForm from "./UserForm";

interface UserModifyComponentProps {
  user: Record<string, any>;
  onSave: (user: Record<string, any>) => void;
  onCancel: () => void;
}

const UserModifyComponent = ({ user, onSave, onCancel }: UserModifyComponentProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>Edit User</h2>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              padding: "0",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <UserForm user={formData} onChange={handleChange} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            paddingTop: "16px",
            borderTop: "1px solid #eee",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModifyComponent;

