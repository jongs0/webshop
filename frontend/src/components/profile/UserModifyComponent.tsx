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
      <div className="container form">
        <h3>Edit User</h3>
        <p style={{ color: "red" }}>
          You must be logged in to edit your profile. Please log in first.
        </p>
        <button onClick={onDone}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container form">
      <h3>Edit User</h3>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <h4>Address</h4>
      <input
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
      />
      <input
        name="address.houseNumber"
        value={formData.address.houseNumber}
        onChange={handleChange}
        placeholder="House Number"
      />
      <input
        name="address.postalCode"
        value={formData.address.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
      />
      <input
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        placeholder="City"
      />
      <button onClick={handleSave} disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save"}
      </button>
      <button onClick={onDone}>Cancel</button>
      {mutation.isError && (
        <p style={{ color: "red" }}>
          Error: {(mutation.error as Error).message}
        </p>
      )}
    </div>
  );
};

export default UserModifyComponent;