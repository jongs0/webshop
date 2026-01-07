import { useState, useEffect } from "react";
import type { AppUserDTO } from "../types/models";
import UserListComponent from "../components/user dashboard/UserListComponent";
import UserDetailAdminComponent from "../components/user dashboard/UserDetailAdminComponent";
import UserModifyComponent from "../components/user dashboard/UserModifyComponent";
import { API_URL } from "../App";
import { updateUser } from "../stores/UserStore";

const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Basic ${btoa("admin@webshop.com:admin123")}`,
};

type ViewMode = "view" | "edit" | null;

const UserDashboardPage = () => {
  const [users, setUsers] = useState<AppUserDTO[]>([]);
  const [selectedUser, setSelectedUser] = useState<AppUserDTO | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: authHeaders,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const data: AppUserDTO[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSelectUser = (user: AppUserDTO) => {
    setSelectedUser(user);
    setViewMode("view");
  };

  const handleEdit = () => {
    setViewMode("edit");
  };

  const handleSave = async (userData: Record<string, any>) => {
    if (!selectedUser?.id) return;

    setLoading(true);
    try {
      const updateData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
      };

      const response = await fetch(`${API_URL}/user/${selectedUser.id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser: AppUserDTO = await response.json();
      setSelectedUser(updatedUser);

      const responseUsers = await fetch(`${API_URL}/user`, {
        headers: authHeaders,
      });
      if (responseUsers.ok) {
        const updatedUsers: AppUserDTO[] = await responseUsers.json();
        setUsers(updatedUsers);
      }

      setViewMode("view");
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      const responseUsers = await fetch(`${API_URL}/user`, {
        headers: authHeaders,
      });
      if (responseUsers.ok) {
        const updatedUsers: AppUserDTO[] = await responseUsers.json();
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setViewMode(null);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setViewMode(null);
    setSelectedUser(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 100px)",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <UserListComponent
          users={users}
          onSelectUser={handleSelectUser}
          onDeleteUser={handleDelete}
        />
      </div>

      {viewMode === "view" && selectedUser && (
        <UserDetailAdminComponent
          user={selectedUser}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}

      {viewMode === "edit" && selectedUser && (
        <UserModifyComponent
          user={selectedUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;

