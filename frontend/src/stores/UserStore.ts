import { createStore } from "@odemian/react-store";
// import type { Role } from "../types/models.js";

interface User {
    email: String,
    id: number,
    authHeader: string,
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    id: NaN,
    authHeader: "",
});

export const logout = () => {
    updateUser({
        email: "",
        id: NaN,
        authHeader: "",
    });
};


// import { createStore } from "@odemian/react-store";
// // import type { Adress } from "../types/models.js";

// interface AppUser {
//     id: number | null;
//     // firstName: string;
//     // lastName: string;
//     email: string;
//     // role: Role | null;
//     // adress: Address | null;
// }

// // interface Address {
// //     id: number | null;
// //     street: string;
// //     houseNumber: number | null;
// //     postalCode: string;
// //     city: string;
// // }

// // enum Role {
// //     USER = "USER",
// //     ADMIN = "ADMIN",
// // }

// //ingelogde user opslaan
// export const [useUser, updateUser] = createStore<AppUser>({
//     id: null,
//     email: "",
// });

//     // firstName: "",
//     // lastName: "",
//     // role: null,
//     // adress: null,

// export const logout = () => {
//     updateUser({
//     id: null,
//     // firstName: "",
//     // lastName: "",
//     email: "",
//     // role: null,
//     // adress: null,
//     });
// };