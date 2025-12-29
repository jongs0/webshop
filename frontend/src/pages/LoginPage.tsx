import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";
import { API_URL } from "../App";
import { updateUser } from "../stores/UserStore";
import { currentUser } from "../stores/UserStore";
import { useNavigate } from "react-router";

interface LoginData {
    email: string,
    password: string
}

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const isValidEmail =
        formData.email.length === 0 ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const user = currentUser();
    const navigate = useNavigate();

    const loginRequest = useMutation({
        mutationFn: async (loginData: LoginData) => {
            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(`${loginData.email}:${loginData.password}`)}`
                    }
                });
            console.log("???");
            // console.log(await response.json());
            if (!response) throw new Error("Failed to login.")
            else console.log("Login request succesfully made.")
            return response.json();
        },
        onSuccess: (response) => {
            console.log("Name: ", response.name, " ID: ", response.id);
            if (response.name !== undefined) {
                updateUser(response)
                setFormData({ email: "", password: "" })
                setLoginError(null)
            } else if (response.message !== undefined) {
                setLoginError("No user found with that name or password.")
            }
        },
        onError: (response) => {
            console.log("onError", response)
            console.log("Something went wrong.")
            setLoginError("No user found with that email or password");
        }
    })

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setHasSubmitted(true)

        if (!formData.email || !formData.password) {
            setLoginError("Please provide your login details to continue");
            return;
        }

        loginRequest.mutate(formData)
    };

    const handleChange = (event: any) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData({ ...formData, [fieldName]: fieldValue })
        console.log(formData)
    }

    return (
        <>
            <Header />

            <div
                style={{
                    minHeight: "calc(64vh - 160px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: "40px",
                }}
            >
                <div
                    style={{
                        width: "360px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    {user?.email ? (
                        <>
                            <h3 style={{ textAlign: "center" }}>
                                You are already logged in
                            </h3>
                            <p style={{ textAlign: "center", opacity: 0.85 }}>
                                Welcome back!
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 style={{ textAlign: "center" }}>Login</h3>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                    opacity: 0.85,
                                }}
                            >
                                Enter your email and password to continue
                            </p>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </Form.Group>

                                {!isValidEmail && (
                                    <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
                                        Please enter a valid email address
                                    </p>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </Form.Group>

                                {loginError && (
                                    <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
                                        {loginError}
                                    </p>
                                )}

                                <div style={{ display: "flex", gap: "12px" }}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        style={{ width: "50%", height: "40px" }}
                                        disabled={loginRequest.isPending || !isValidEmail}
                                    >
                                        {loginRequest.isPending ? "Logging in..." : "Login"}
                                    </Button>

                                    <Button
                                        variant="primary"
                                        style={{ width: "50%", height: "40px" }}
                                        onClick={() => navigate("/signup")}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginPage;

const inputStyle: React.CSSProperties = {
    height: "40px",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    caretColor: "white",

    border: "1px solid rgba(0, 0, 0, 0.3)", // ← THIS
};