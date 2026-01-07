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
    <div className="container form">
      <h3>User details</h3>
      <div className="left">
        <p>First name:</p>
        <input
          type="text"
          name="firstName"
          value={user?.firstName ?? "Empty"}
          readOnly
        />
        <p>Last name:</p>
        <input
          type="text"
          name="lastName"
          value={user?.lastName ?? "Empty"}
          readOnly
        />
      </div>
      <div className="left">
        <p>Email:</p>
        <input
          type="text"
          name="Email"
          value={user?.email ?? "Empty"}
          readOnly
        />
      </div>
      <p>Adress:</p>
      <div className="left">
        <input
          type="text"
          name="Street"
          value={user?.address?.street ?? "Empty"}
          readOnly
        />
        <input
          type="text"
          name="HouseNumber"
          value={user?.address?.houseNumber?.toString() ?? "Empty"}
          readOnly
        />
      </div>
      <div className="left">
        <input
          type="text"
          name="PostalCode"
          value={user?.address?.postalCode ?? "Empty"}
          readOnly
        />
        <input
          type="text"
          name="City"
          value={user?.address?.city ?? "Empty"}
          readOnly
        />
      </div>

      <button className="btn-primary" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
};

export default UserDetailComponent;