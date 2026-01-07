import { createStore } from "@odemian/react-store";
// import type { Role } from "../types/models.js";

interface User {
    email: string,
    id: number,
    authHeader: string
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    id: NaN,
    authHeader: ""
});

export const logout = () => {
    updateUser({
        email: "",
        id: NaN,
        authHeader: ""
    });
};