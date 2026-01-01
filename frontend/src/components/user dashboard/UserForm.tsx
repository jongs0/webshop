import type { AppUserDTO, AppUserUpdateDTO } from "../../../types/models";

interface UserFormProps {
  user: Record<string, any>;
  onChange: (key: string, value: any) => void;
  disabled?: boolean;
}

const UserForm = ({ user, onChange, disabled = false }: UserFormProps) => {
  const handleChange = (key: string, value: any) => {
    onChange(key, value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={user.email || ""}
          onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
          disabled={disabled}
          required
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
            backgroundColor: disabled ? "#f5f5f5" : "white",
            color: "#000",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            First Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={user.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            disabled={disabled}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Last Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={user.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            disabled={disabled}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginTop: "8px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>Address</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Street <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={user.address?.street || ""}
            onChange={(e) => handleChange("address", { ...user.address, street: e.target.value })}
            disabled={disabled}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              House Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              value={user.address?.houseNumber || ""}
              onChange={(e) =>
                handleChange("address", {
                  ...user.address,
                  houseNumber: Number(e.target.value),
                })
              }
              disabled={disabled}
              required
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                backgroundColor: disabled ? "#f5f5f5" : "white",
                color: "#000",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Postal Code <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={user.address?.postalCode || ""}
              onChange={(e) =>
                handleChange("address", {
                  ...user.address,
                  postalCode: e.target.value.toUpperCase(),
                })
              }
              disabled={disabled}
              required
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                backgroundColor: disabled ? "#f5f5f5" : "white",
                color: "#000",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            City <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={user.address?.city || ""}
            onChange={(e) => handleChange("address", { ...user.address, city: e.target.value })}
            disabled={disabled}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;

