import { createStore } from "@odemian/react-store";
// import type { Role } from "../types/models.js";

export interface User {
    email: String
    id: number
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    id: NaN,
});

export const logout = () => {
    updateUser({
        email: "",
        id: NaN,
    });
};