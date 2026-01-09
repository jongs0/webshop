import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../../stores/UserStore";
import { API_URL } from "../../App";
import type { AppUserDTO, Adress } from "../../types/models";

type Props = {
  onEdit: () => void;
};

const UserDetailComponent = ({ onEdit }: Props) => {
  const userStore = currentUser();

  const { data: user, isLoading, error } = useQuery<AppUserDTO>({
    queryKey: ["profile", userStore.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/${userStore.id}`, {
        headers: {
          Authorization: userStore.authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      return response.json();
    },
    enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
  });

  if (!Number.isFinite(userStore.id)) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Fout bij ophalen user</p>;
  if (!user) return <p>Geen gebruikersdata gevonden</p>;

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
            User Details
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
                Email
              </label>
              <input
                type="text"
                value={user?.email ?? ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  outline: "none",
                  cursor: "default",
                }}
                onFocus={(e) => e.target.blur()}
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
                First Name
              </label>
              <input
                type="text"
                value={user?.firstName ?? ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  outline: "none",
                  cursor: "default",
                }}
                onFocus={(e) => e.target.blur()}
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
                Last Name
              </label>
              <input
                type="text"
                value={user?.lastName ?? ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  outline: "none",
                  cursor: "default",
                }}
                onFocus={(e) => e.target.blur()}
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
                  Street
                </label>
                <input
                  type="text"
                  value={user?.address?.street ?? ""}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    outline: "none",
                    cursor: "default",
                  }}
                  onFocus={(e) => e.target.blur()}
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
                  House Number
                </label>
                <input
                  type="text"
                  value={user?.address?.houseNumber?.toString() ?? ""}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    outline: "none",
                    cursor: "default",
                  }}
                  onFocus={(e) => e.target.blur()}
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
                  Postal Code
                </label>
                <input
                  type="text"
                  value={user?.address?.postalCode ?? ""}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    outline: "none",
                    cursor: "default",
                  }}
                  onFocus={(e) => e.target.blur()}
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
                  City
                </label>
                <input
                  type="text"
                  value={user?.address?.city ?? ""}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    outline: "none",
                    cursor: "default",
                  }}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
        </div>

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
            onClick={onEdit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default UserDetailComponent;