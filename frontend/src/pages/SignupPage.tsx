import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { AppUserCreateDTO, RegisterDTO } from "../types/models.js";
import { currentUser, updateUser } from "../stores/UserStore.ts"
// import { Form, FormSelect } from "react-bootstrap";
import { API_URL } from "../App.js";


const SignupPage = () => {

    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        tempPassword: "",
        verifiedPassword: "",
        street: "",
        houseNumber: 0,
        city: "",
        postalCode: ""
    });

    const passwordsMatch =
        register.tempPassword.length > 0 &&
        register.verifiedPassword.length > 0 &&
        register.tempPassword === register.verifiedPassword;

    const passwordLengthCheck = register.tempPassword.length >= 8

    const isEmail =
        register.email.includes("@");

    const navigate = useNavigate();

    const handleRegistration = useMutation({
        mutationFn: async (dto: RegisterDTO) => {
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Registration failed");
            return res.json();
        },

        onSuccess: (user) => {
            updateUser(user)
            navigate("/")
        },
        onError: () => {
            console.log("Registration failed: try again");
        }

    })

    return (

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>

            <div style={{ textAlign: "center" }}>Email</div>
            <input
                type="text"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                placeholder="Enter email"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!isEmail && register.email.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Not a valid email adress </p>
            )}

            <div style={{ textAlign: "center" }}>Password</div>
            <input
                type="password"
                value={register.tempPassword}
                onChange={(e) => setRegister({ ...register, tempPassword: e.target.value })}
                placeholder="Enter password"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!passwordLengthCheck && register.tempPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Passwords must be longer than 8 characters </p>
            )}

            {register.tempPassword.length === 0 && register.verifiedPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Enter a password </p>
            )}

            <div style={{ textAlign: "center" }}>Verify password</div>
            <input
                type="password"
                value={register.verifiedPassword}
                onChange={(e) => setRegister({ ...register, verifiedPassword: e.target.value })}
                placeholder="Verify password"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            {!passwordsMatch && register.tempPassword.length > 0 && register.verifiedPassword.length > 0 && (
                <p style={{ color: "red", textAlign: "center" }}> Passwords do not match </p>
            )}

            <div style={{ textAlign: "center" }}>Street</div>
            <input
                type="text"
                value={register.street}
                onChange={(e) => setRegister({ ...register, street: e.target.value })}
                placeholder="Street"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            <div style={{ textAlign: "center" }}>House No.</div>
            <input
                type="text"
                value={register.houseNumber}
                onChange={(e) => setRegister({ ...register, houseNumber: Number(e.target.value) })}
                placeholder=""
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            <div style={{ textAlign: "center" }}>City</div>
            <input
                type="text"
                value={register.city}
                onChange={(e) => setRegister({ ...register, city: e.target.value })}
                placeholder="City"
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            <div style={{ textAlign: "center" }}>Postal Code</div>
            <input
                type="text"
                value={register.postalCode}
                onChange={(e) => setRegister({ ...register, postalCode: e.target.value })}
                placeholder=""
                style={{
                    width: "300px",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "white",
                    border: "2px solid white",
                    margin: "0px"

                }}
            />

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>

                <button
                    disabled={handleRegistration.isPending || !passwordsMatch || register.email === ""}
                    onClick={() => {
                        const registerDto: RegisterDTO = {
                            appUser: {
                                email: register.email,
                                password: register.verifiedPassword,
                                firstName: register.firstName,
                                lastName: register.lastName
                            },
                            adress: {
                                street: register.street,
                                houseNumber: register.houseNumber,
                                postalCode: register.postalCode,
                                city: register.city
                            }
                        };

                        handleRegistration.mutate(registerDto);
                    }}

                    style={{
                        width: "140px",
                        height: "40px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                >
                    {handleRegistration.isPending ? "Registering..." : "Register"}
                </button>

                <button onClick={() => { navigate("/login"); }}
                    style={{
                        width: "140px",
                        height: "40px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>Go back</button>

            </div>
        </div>
    );
};

export default SignupPage