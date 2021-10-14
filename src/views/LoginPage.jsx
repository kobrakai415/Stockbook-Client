import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAuthenticated, setUser } from '../redux/actions';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ApiUrl = process.env.REACT_APP_MY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setAuthenticated: (boolean) => dispatch(setAuthenticated(boolean))
})

const LoginPage = ({ routerProps: { history }, setUser, setAuthenticated }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const login = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const form = e.currentTarget

            if (form.checkValidity() === false) {
                return
            }

            const details = {
                email: email,
                password: password,
            };

            const res = await axios.post(`${ApiUrl}/users/login`, details, { withCredentials: true })
            console.log(res)
            if (res.status === 200) {
                setAuthenticated(true)
                setUser(res.data)
                console.log(res.data)
                history.push("/")
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            alert("Wrong credentials, try again!");
        }

    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center login-page"
            style={{ minHeight: "100vh" }}
        >


            <Form style={{ minWidth: "270px", minHeight: "380px" }} validated onSubmit={(e) => login(e)} className=' p-md-5 p-4 register-form d-flex flex-column'>
                <> <div className="p-2 d-flex align-items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 512 512" width="60"><g id="Flat">
                        <path d="m432 112v-88h-88v32h32l-96 96-80-80-120 120 24 24 96-96 80 80 120-120v32z" fill="#f35244" /><path d="m40 424h80v32h-80z" fill="#fca713" /><path d="m104 456h80v32h-80z" fill="#fca713" /><path d="m104 392h80v32h-80z" fill="#fca713" /><path d="m200 424h80v32h-80z" fill="#fca713" /><g fill="#f4c067"><path d="m184 456h80v32h-80z" /><path d="m184 392h80v32h-80z" /><path d="m120 424h80v32h-80z" /><path d="m120 360h80v32h-80z" /><path d="m24 456h80v32h-80z" /><path d="m24 392h80v32h-80z" /></g><path d="m264 424h184v64h-184z" fill="#80c326" /><path d="m426.56543 424a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 424h32v64h-32z" fill="#fca713" /><path d="m296 360h184v64h-184z" fill="#80c326" /><path d="m458.56543 360a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m368 360h32v64h-32z" fill="#fca713" /><path d="m264 296h184v64h-184z" fill="#80c326" /><path d="m426.56543 296a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 296h32v64h-32z" fill="#fca713" /><path d="m240 392h24v32h-24z" fill="#f5b142" /><path d="m240 424h24v32h-24z" fill="#ed8515" /><path d="m240 456h24v32h-24z" fill="#f5b142" /><path d="m160 456h24v32h-24z" fill="#ed8515" /><path d="m176 424h24v32h-24z" fill="#fca713" /><path d="m160 392h24v32h-24z" fill="#ed8515" /><path d="m80 456h24v32h-24z" fill="#f5b142" /><path d="m96 424h24v32h-24z" fill="#ed8515" /><path d="m80 392h24v32h-24z" fill="#f5b142" /><path d="m184 360h24v32h-24z" fill="#f5b142" /><path d="m160 208h32v128h-32z" fill="#4db7e5" /><path d="m240 232h32v40h-32z" fill="#4db7e5" /><path d="m320 208h32v64h-32z" fill="#4db7e5" /><path d="m400 144h32v128h-32z" fill="#4db7e5" /><path d="m112 248h-32v120l32-32z" fill="#4db7e5" /></g></svg>

                    <h1 className="mb-0 ms-2 logo-title">$tockBook</h1>
                </div>


                    <div className="p-2">
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

                        {loading ?

                            <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)" >
                                <Skeleton count={1} height={40} />
                            </SkeletonTheme> : <>

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
                            </>}
                    </div>
                </>

            </Form>


        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
