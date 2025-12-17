import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface LoginData {
    email : string,
    password : string
}

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginData>({email:"",password:""});


    const handleChangeBootstrap = (event: any) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData({ ...formData, [fieldName]: fieldValue })
        console.log(formData)
    }

    return (
        <Form>
            <h1>LOGIN</h1>
            <div/>
            <Form.Group>
                 {/* <Form.Label>Email</Form.Label> */}
                <Form.Control name="email" type="email" placeholder="Email" onChange={handleChangeBootstrap}/>
            </Form.Group>
            <Form.Group>
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleChangeBootstrap}/>
            </Form.Group>
            <p/>
            <Button variant="primary" type="submit">Submit
            </Button>
        </Form>

    )
}

export default LoginPage;