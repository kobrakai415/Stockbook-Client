import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const ApiUrl = process.env.REACT_APP_MY_API

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const details = {
                email: username,
                password: password,
            };
            const res = await fetch(`${ApiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(details),
            });

            if (res.ok) {
                const data = await res.json();
                
            } else {
                alert("Wrong credentials, try again!");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        
                <Col md={{ span: 6, offset: 3 }}>
                    <Form className='p-5'>
                        <Form.Group className='mb-3' controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type='text'
                                placeholder='Enter username'
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                placeholder='Password'
                            />
                        </Form.Group>

                        <Button onClick={login} variant='primary' type='button'>
                            Login
                        </Button>
                        <Button
                        to="/register"
                            className='ms-3'
                            variant='primary'
                            type='button'>
                            SignUp
                        </Button>
                    </Form>
                </Col>
           
    );
}

export default LoginPage;
