import type { AppUserDTO } from "../../../types/models";

interface UserListComponentProps {
  users: AppUserDTO[];
  onSelectUser: (user: AppUserDTO) => void;
  onDeleteUser: (userId: number) => void;
}

const UserListComponent = ({ users, onSelectUser, onDeleteUser }: UserListComponentProps) => {
  const handleDelete = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDeleteUser(userId);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Users</h2>
      </div>

      <div style={{ overflowX: "auto", flex: 1 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                First Name
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Last Name
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#6c757d",
                  }}
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  style={{
                    borderBottom: "1px solid #dee2e6",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>{user.id}</td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057", fontWeight: "500" }}>
                    {user.email}
                  </td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>
                    {user.firstName}
                  </td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>
                    {user.lastName}
                  </td>
                  <td 
                    style={{ padding: "12px 12px 12px 24px", color: "#495057" }}
                    onClick={(e) => handleDelete(e, user.id)}
                  >
                    <button
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={(e) => handleDelete(e, user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListComponent;

