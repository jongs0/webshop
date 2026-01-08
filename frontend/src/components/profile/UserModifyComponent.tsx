import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currentUser, updateUser } from "../../stores/UserStore";
import { API_URL } from "../../App";
import type { AppUserDTO } from "../../types/models";

type Props = {
  onDone: () => void;
};

const UserModifyComponent = ({ onDone }: Props) => {
  const user = currentUser();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Record<string, any>>({
    email: "",
    firstName: "",
    lastName: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
  });

  useEffect(() => {
    if (!user || !user.id || Number.isNaN(user.id)) {
      return;
    }

    const fetchUser = async () => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (user.authHeader) {
          headers.Authorization = user.authHeader;
        } else if (user.email === "admin@webshop.com") {
          headers.Authorization = `Basic ${btoa("admin@webshop.com:admin123")}`;
        }

        const res = await fetch(`${API_URL}/user/${user.id}`, {
          headers: headers,
        });

        if (res.ok) {
          const data: AppUserDTO = await res.json();
          setFormData({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            address: {
              street: data.address?.street || "",
              houseNumber: data.address?.houseNumber || "",
              postalCode: data.address?.postalCode || "",
              city: data.address?.city || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user?.id, user?.authHeader]);

  const mutation = useMutation({
    mutationFn: async (userData: Record<string, any>) => {
      if (!user || !user.id || Number.isNaN(user.id)) {
        throw new Error("User not logged in. Please log in first.");
      }

      const updateData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (user.authHeader) {
        headers.Authorization = user.authHeader;
      } else if (user.email === "admin@webshop.com") {
        headers.Authorization = `Basic ${btoa("admin@webshop.com:admin123")}`;
      }

      const response = await fetch(`${API_URL}/user/${user.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser: AppUserDTO = await response.json();

      updateUser({
        email: updatedUser.email,
        id: updatedUser.id,
        authHeader: user.authHeader,
      });

      return updatedUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      setTimeout(() => {
        onDone();
      }, 100);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!user || !user.id || Number.isNaN(user.id)) {
      alert("You must be logged in to edit your profile. Please log in first.");
      return;
    }
    mutation.mutate(formData);
  };

  if (!user || !user.id || Number.isNaN(user.id)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 200px)",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Edit User</h3>
          <p style={{ color: "red" }}>
            You must be logged in to edit your profile. Please log in first.
          </p>
          <button onClick={onDone}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 200px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
            Edit User
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Email - zelfde breedte als andere velden */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                flex: 1,
              }}
            >
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  color: "#000",
                }}
              />
            </div>
            <div style={{ flex: 1 }}></div>
          </div>

          {/* First Name & Last Name */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                flex: 1,
              }}
            >
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  color: "#000",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                flex: 1,
              }}
            >
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
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  color: "#000",
                }}
              />
            </div>
          </div>

          {/* Address Section */}
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "16px",
              marginTop: "8px",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Address
            </h3>

            {/* Street - zelfde breedte als andere velden */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                }}
              >
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
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}></div>
            </div>

            {/* House Number & Postal Code */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                }}
              >
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
                  type="text"
                  name="address.houseNumber"
                  value={formData.address.houseNumber}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                }}
              >
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
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000",
                  }}
                />
              </div>
            </div>

            {/* City - zelfde breedte als andere velden */}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                }}
              >
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
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {mutation.isError && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
            }}
          >
            <p style={{ margin: 0, color: "red", fontSize: "14px" }}>
              Error: {(mutation.error as Error).message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            paddingTop: "16px",
            marginTop: "16px",
            borderTop: "1px solid #eee",
          }}
        >
          <button
            onClick={onDone}
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
            disabled={mutation.isPending}
            style={{
              padding: "10px 20px",
              backgroundColor: mutation.isPending ? "#6c757d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: mutation.isPending ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              opacity: mutation.isPending ? 0.6 : 1,
            }}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModifyComponent;