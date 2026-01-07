import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "react-router";
import ProfileNavbar from "../components/profile/ProfileNavbar";
import UserDetailComponent from "../components/profile/UserDetailComponent";
import UserModifyComponent from "../components/profile/UserModifyComponent";
import { currentUser } from "../stores/UserStore";
import { API_URL } from "../App";
import type { AppUserDTO } from "../types/models";

type UserMode = "view" | "edit";

const ProfilePage = () => {
  const [userMode, setUserMode] = useState<UserMode>("view");
  const userStore = currentUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Bepaal activeView op basis van de route
  const activeView = location.pathname.includes("/orders") ? "orders" : "user";

  const { data: user, isLoading, error } = useQuery<AppUserDTO>({
    queryKey: ["profile", userStore.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/${userStore.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": userStore.authHeader,
        },
      });
      if (!response.ok) throw new Error("Not authenticated");
      return response.json();
    },
    enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
  });

  if (!userStore.authHeader) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Profiel laden...</p>;
  if (error) return <p>Fout bij ophalen gebruiker</p>;
  if (!user) return <p>Geen gebruikersdata gevonden</p>;

  const handleViewChange = (view: "user" | "orders") => {
    if (view === "orders") {
      navigate("/profile/orders");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <ProfileNavbar
        activeView={activeView}
        onChangeView={handleViewChange}
      />

      {/* Als we op /profile zijn, toon user details */}
      {location.pathname === "/profile" && (
        <>
          {userMode === "view" && (
            <UserDetailComponent onEdit={() => setUserMode("edit")} />
          )}
          {userMode === "edit" && (
            <UserModifyComponent onDone={() => setUserMode("view")} />
          )}
        </>
      )}

      {/* Render child routes (orders) */}
      <Outlet />
    </div>
  );
};

export default ProfilePage;

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// import ProfileNavbar from "../components/profile/ProfileNavbar";
// import UserDetailComponent from "../components/profile/UserDetailComponent";
// import UserModifyComponent from "../components/profile/UserModifyComponent";
// import UserOrderHistoryComponent from "../components/profile/UserOrderHistoryComponent";

// import { currentUser } from "../stores/UserStore";
// import { API_URL } from "../App";

// type ProfileView = "user" | "orders";
// type UserMode = "view" | "edit";

// type AppUserDTO = {
//   id: number;
//   firstName: string;
//   lastName?: string;
//   email: string;
//   role: string;
// };

// const ProfilePage = () => {
//   const [activeView, setActiveView] = useState<ProfileView>("user");
//   const [userMode, setUserMode] = useState<UserMode>("view");
//   const userStore = currentUser();

// const { data: user, isLoading, error } = useQuery<AppUserDTO>({
//   queryKey: ["profile", userStore.id],
//   queryFn: async () => {
//     const response = await fetch(`${API_URL}/user/${userStore.id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": userStore.authHeader,
//       },
//     });
//     if (!response.ok) throw new Error("Not authenticated");
//     return response.json();
//   },
//   enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
// });


//   if (!userStore.authHeader) return <p>Niet ingelogd</p>;
//   if (isLoading) return <p>Profiel laden...</p>;
//   if (error) return <p>Fout bij ophalen gebruiker</p>;
//   if (!user) return <p>Geen gebruikersdata gevonden</p>;

//   return (
//  <div className="profile">
//             <h2>Profile</h2>
//             {/* <UserDetailComponent/>
//             <UserModifyComponent/>
//             <UserOrderHistoryComponent/>
//             <UserOrderDetailComponent/>  */}
//             <ProfileNavbar
//                 activeView={activeView}
//                 onChangeView={setActiveView}
//             />

//             {/* USER */}
//             {activeView === "user" && userMode === "view" && (
//                 <UserDetailComponent onEdit={() => setUserMode("edit")} />
//             )}

//             {activeView === "user" && userMode === "edit" && (
//                 <UserModifyComponent onDone={() => setUserMode("view")} />
//             )}

//             {/* ORDERS */}
//             {activeView === "orders" && <UserOrderHistoryComponent />}
//         </div>
//   );
// };

// export default ProfilePage;