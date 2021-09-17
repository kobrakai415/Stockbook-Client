import React, { useState } from 'react';
import { Col, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAuthenticated, setUser } from '../redux/actions';
import axios from 'axios';


const ApiUrl = process.env.REACT_APP_MY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setAuthenticated: (boolean) => dispatch(setAuthenticated(boolean))
})

const LoginPage = ({ routerProps: { history }, setUser, setAuthenticated }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = async (e) => {
        e.preventDefault()
        try {
            const form = e.currentTarget

            if (form.checkValidity() === false) {
                return
            }

            const details = {
                email: email,
                password: password,
            };

            const res = await axios.post(`${ApiUrl}/users/login`, details, { withCredentials: true })
            if (res.statusText === "OK") {
                setAuthenticated(true)
                setUser(res.data)
                console.log(res.data)
                history.push("/")

            } else {
                alert("Wrong credentials, try again!");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center login-page"
            style={{ minHeight: "100vh" }}
        >


            <Form validated onSubmit={(e) => login(e)} className=' p-md-5 p-4 register-form d-flex flex-column'>

                <div className="p-2">
                    <h1 className="mb-3">$tockBook</h1>
                    <h3>Sign in</h3>
                </div>

                <Form.Group className='mb-3 p-2' controlId='username'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter email'
                    />
                </Form.Group>

                <Form.Group className='mb-3 p-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        minLength={4}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Enter password'
                    />
                </Form.Group>
                <div className="p-2">

                    <Button className="login-page-buttons" type="submit" variant='primary'>
                        Login
                    </Button>
                    <Link to="/register">
                        <Button

                            className="login-page-buttons ms-3"
                            variant='primary'
                            type='button'>
                            SignUp
                        </Button>
                    </Link>
                </div>

            </Form>


        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
