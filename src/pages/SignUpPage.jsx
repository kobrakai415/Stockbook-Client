import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const ApiUrl = process.env.REACT_APP_MY_API

const SignUpPage = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");

    const signup = async () => {
        try {
            const newUser = {
                name: name,
                surname: surname,
                email: email,
                password: signupPassword,
            };
            const res = await fetch(`${ApiUrl}/users/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            console.log(res)
            if (res.ok) {
                const data = await res.json();

                console.log(data);
            } else {
                console.log()
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
       
                <Col md={{ span: 6, offset: 3 }}>

                    <Form>
                        <Form.Group className='mb-3' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type='text'
                                placeholder='Enter username'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='surname'>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                type='text'
                                placeholder='Enter username'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                placeholder='Enter email'
                            />
                            <Form.Text className='text-muted'>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='signupUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={signupUsername}
                                onChange={(e) => setSignupUsername(e.target.value)}
                                type='text'
                                placeholder='Enter username'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='signupPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                type='password'
                                placeholder='Password'
                            />
                        </Form.Group>
                    </Form>

                </Col>
            
    );
}

export default SignUpPage;
