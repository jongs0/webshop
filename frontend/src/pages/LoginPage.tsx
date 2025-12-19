import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";
import { API_URL } from "../App";
import { updateUser } from "../stores/UserStore";

interface LoginData {
    email: string,
    password: string
}

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });

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
            } else if (response.message !== undefined) {
                // setErrorMessage(response.message) hebben wij error handling?
            }
        },
        onError: (response) => {
            console.log("onError",response)
            console.log("Something went wrong.")
        }
    })

    const handleSubmit = (event : any) => {
        event.preventDefault();
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
            <Form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div />
                <Form.Group>
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <p />
                <Button variant="primary" href="register"
                    >
                    Register
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Footer />
        </>
    )
}

export default LoginPage;