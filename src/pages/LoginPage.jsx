import React, { useState } from 'react';
import { Col, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login, setUser } from '../redux/actions';

const ApiUrl = process.env.REACT_APP_MY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    loginUser: (history, email, password) => dispatch(login(history, email, password)),
    setUser: (user) => dispatch(setUser(user))
})

const LoginPage = ({ routerProps: { history }, loginUser, setUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const login = async (e) => {
        e.preventDefault()
        try {

            const details = {
                email: email,
                password: password,
            };
            console.log(details)

            const res = await fetch(`${ApiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(details),
            });
            console.log(res)
    
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                history.push("/")
                setUser(data)

            } else {
                alert("Wrong credentials, try again!");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >

            <Col md={4} >
                <Form onSubmit={(e) => login(e)} className='register-form p-md-5 p-4'>
                    <h3>Sign in</h3>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='Enter email'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='Enter password'
                        />
                    </Form.Group>

                    <Button type="submit" variant='primary'>
                        Login
                    </Button>
                    <Link to="/register">
                        <Button

                            className='ms-3'
                            variant='primary'
                            type='button'>
                            SignUp
                        </Button>
                    </Link>
                </Form>
            </Col>

        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
