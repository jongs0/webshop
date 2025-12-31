import { useNavigate } from "react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { RegisterDTO } from "../types/models";
import { updateUser } from "../stores/UserStore";
import { API_URL } from "../App";

const SignupPage = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tempPassword: "",
    verifiedPassword: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
  });

  const passwordsMatch =
    register.tempPassword.length > 0 &&
    register.verifiedPassword.length > 0 &&
    register.tempPassword === register.verifiedPassword;

  const passwordLengthCheck = register.tempPassword.length >= 8;
  const isEmail = register.email.includes("@");

  const isValidHouseNumber =
    register.houseNumber.length === 0 ||
    /^\d+$/.test(register.houseNumber);

  const isValidPostalCode =
    register.postalCode.length === 0 ||
    /^\d{4}[A-Za-z]{2}$/.test(register.postalCode);

  const handleRegistration = useMutation({
    mutationFn: async (dto: RegisterDTO) => {
      const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    },
    onSuccess: (user) => {
      updateUser(user);
      navigate("/");
    },
  });

  return (
    <div
      style={{
        minHeight: "calc(80vh - 80px)",
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
          gap: "10px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "6px" }}>
          Create account
        </h3>
        <p style={{ textAlign: "center", fontSize: "14px", opacity: 0.85 }}>
          Fill in your details below to create an account
        </p>

        <label>Name</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="First name"
            value={register.firstName}
            onChange={(e) =>
              setRegister({ ...register, firstName: e.target.value })
            }
            style={{ ...inputStyle, width: "50%" }}
          />
          <input
            type="text"
            placeholder="Last name"
            value={register.lastName}
            onChange={(e) =>
              setRegister({ ...register, lastName: e.target.value })
            }
            style={{ ...inputStyle, width: "50%" }}
          />
        </div>

        <label>Email</label>
        <input
          type="text"
          placeholder="Email address"
          value={register.email}
          onChange={(e) =>
            setRegister({ ...register, email: e.target.value })
          }
          style={inputStyle}
        />
        {!isEmail && register.email.length > 0 && (
          <p style={errorStyle}>Not a valid email address</p>
        )}

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={register.tempPassword}
          onChange={(e) =>
            setRegister({ ...register, tempPassword: e.target.value })
          }
          style={inputStyle}
        />
        {!passwordLengthCheck && register.tempPassword.length > 0 && (
          <p style={errorStyle}>Password must be at least 8 characters</p>
        )}

        <input
          type="password"
          placeholder="Confirm password"
          value={register.verifiedPassword}
          onChange={(e) =>
            setRegister({ ...register, verifiedPassword: e.target.value })
          }
          style={inputStyle}
        />
        {!passwordsMatch &&
          register.tempPassword.length > 0 &&
          register.verifiedPassword.length > 0 && (
            <p style={errorStyle}>Passwords do not match</p>
          )}

        <label>Address</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Street"
            value={register.street}
            onChange={(e) =>
              setRegister({ ...register, street: e.target.value })
            }
            style={{ ...inputStyle, width: "70%" }}
          />
          <input
            type="text"
            placeholder="No."
            value={register.houseNumber}
            onChange={(e) =>
              setRegister({ ...register, houseNumber: e.target.value })
            }
            style={{ ...inputStyle, width: "30%" }}
          />
        </div>
        {!isValidHouseNumber && (
          <p style={errorStyle}>Not a valid house number</p>
        )}

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="City"
            value={register.city}
            onChange={(e) =>
              setRegister({ ...register, city: e.target.value })
            }
            style={{ ...inputStyle, width: "60%" }}
          />
          <input
            type="text"
            placeholder="Postal code"
            value={register.postalCode}
            onChange={(e) =>
              setRegister({ ...register, postalCode: e.target.value })
            }
            style={{ ...inputStyle, width: "40%" }}
          />
        </div>
        {!isValidPostalCode && (
          <p style={errorStyle}>
            Postal code must be in the format 1234AA
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "14px",
          }}
        >
          <button
            className="btn btn-primary"
            disabled={
              handleRegistration.isPending ||
              !passwordsMatch ||
              !passwordLengthCheck ||
              !isEmail ||
              !isValidHouseNumber ||
              !isValidPostalCode
            }
            onClick={() => {
              const registerDto: RegisterDTO = {
                appUser: {
                  email: register.email,
                  password: register.verifiedPassword,
                  firstName: register.firstName,
                  lastName: register.lastName,
                },
                adress: {
                  street: register.street,
                  houseNumber: Number(register.houseNumber),
                  postalCode: register.postalCode.toUpperCase(),
                  city: register.city,
                },
              };

              handleRegistration.mutate(registerDto);
            }}
            style={{ width: "50%", height: "40px" }}
          >
            {handleRegistration.isPending ? "Registering..." : "Register"}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
            style={{ width: "50%", height: "40px" }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

const inputStyle: React.CSSProperties = {
  height: "40px",
  padding: "8px",
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: "black",
  caretColor: "white",

  border: "1px solid rgba(0, 0, 0, 0.3)", // ← THIS
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontSize: "12px",
  textAlign: "center",
};
