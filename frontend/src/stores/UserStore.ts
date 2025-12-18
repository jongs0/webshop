import { createStore } from "@odemian/react-store";

interface User {
    email: String
    password: String
    id: number | null
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    password: "",
    id: null
});

export const logout = () => {
    updateUser({
        email: "",
        password: "",
        id: null
    });
};