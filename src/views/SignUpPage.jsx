import React, { useState } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const ApiUrl = process.env.REACT_APP_MY_API

const SignUpPage = ({ routerProps }) => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [startingBalance, setChecked] = useState(null);

    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()


    const submitForm = async (e) => {
        try {
            e.preventDefault()

            const form = e.currentTarget

            if (form.checkValidity() === false) return
            if (startingBalance === null) return


            const newUser = {
                name,
                surname,
                username,
                email,
                password: signupPassword,
                startingBalance,
                balance: startingBalance
            };
            const res = await axios.post(`${ApiUrl}/users/register`, newUser)
            console.log(res)

            if (res.status === 201) {


                dispatch({
                    type: "SET_USER",
                    payload: res.data
                })

                dispatch({
                    type: 'SET_AUTHENTICATED',
                    payload: true
                })

                routerProps.history.push("/")
            } else {
                console.log(res.errors)


            }
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data.messages)
            setShow(true)
        }
    };



    return (

        <Container
            fluid className="d-flex flex-column justify-content-center align-items-center login-page"

        >


            {errors.length > 0 && show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <div>
                    {errors.map((item, index) => {
                        console.log(item)
                        return <span key={index}> {item} </span>
                    })}
                </div>
            </Alert> : null}


            <Form onSubmit={(e) => submitForm(e)} className='register-form p-4 p-md-5 '>
                <div className="mb-3 d-flex align-items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 512 512" width="60"><g id="Flat"><path d="m432 112v-88h-88v32h32l-96 96-80-80-120 120 24 24 96-96 80 80 120-120v32z" fill="#f35244" /><path d="m40 424h80v32h-80z" fill="#fca713" /><path d="m104 456h80v32h-80z" fill="#fca713" /><path d="m104 392h80v32h-80z" fill="#fca713" /><path d="m200 424h80v32h-80z" fill="#fca713" /><g fill="#f4c067"><path d="m184 456h80v32h-80z" /><path d="m184 392h80v32h-80z" /><path d="m120 424h80v32h-80z" /><path d="m120 360h80v32h-80z" /><path d="m24 456h80v32h-80z" /><path d="m24 392h80v32h-80z" /></g><path d="m264 424h184v64h-184z" fill="#80c326" /><path d="m426.56543 424a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 424h32v64h-32z" fill="#fca713" /><path d="m296 360h184v64h-184z" fill="#80c326" /><path d="m458.56543 360a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m368 360h32v64h-32z" fill="#fca713" /><path d="m264 296h184v64h-184z" fill="#80c326" /><path d="m426.56543 296a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 296h32v64h-32z" fill="#fca713" /><path d="m240 392h24v32h-24z" fill="#f5b142" /><path d="m240 424h24v32h-24z" fill="#ed8515" /><path d="m240 456h24v32h-24z" fill="#f5b142" /><path d="m160 456h24v32h-24z" fill="#ed8515" /><path d="m176 424h24v32h-24z" fill="#fca713" /><path d="m160 392h24v32h-24z" fill="#ed8515" /><path d="m80 456h24v32h-24z" fill="#f5b142" /><path d="m96 424h24v32h-24z" fill="#ed8515" /><path d="m80 392h24v32h-24z" fill="#f5b142" /><path d="m184 360h24v32h-24z" fill="#f5b142" /><path d="m160 208h32v128h-32z" fill="#4db7e5" /><path d="m240 232h32v40h-32z" fill="#4db7e5" /><path d="m320 208h32v64h-32z" fill="#4db7e5" /><path d="m400 144h32v128h-32z" fill="#4db7e5" /><path d="m112 248h-32v120l32-32z" fill="#4db7e5" /></g></svg>

                    <h1 className="mb-0 ms-2 logo-title">$tockBook</h1>

                </div>
                <div className="mb-3">

                    <h3>Sign Up</h3>
                </div>
                <Form.Group className='mb-2 p-1' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Enter first name'
                    />
                </Form.Group>
                <Form.Group className='mb-2 p-1' controlId='surname'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        type='text'
                        placeholder='Enter surname'
                    />
                </Form.Group>
                <Form.Group className='mb-2 p-1' controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type='text'
                        placeholder='Enter username'
                    />
                </Form.Group>
                <Form.Group className='mb-2 p-1' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter email'
                    />
                  
                </Form.Group>
                <Form.Group className='mb-2 p-1' controlId='signupPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                    />
                </Form.Group>
                <Form.Group required className='mb-2 p-1'>
                    <Form.Label>Starting Balance</Form.Label>
                    <div >
                        <Form.Check
                            inline
                            label="$1000"
                            name="group1"
                            type={"radio"}
                            onChange={() => setChecked(1000)}
                        />
                        <Form.Check
                            inline
                            label="$5000"
                            name="group1"
                            type={"radio"}
                            onChange={() => setChecked(5000)}
                        />
                        <Form.Check
                            inline
                            label="$10000"
                            name="group1"
                            type={"radio"}
                            onChange={() => setChecked(10000)}

                        />
                    </div>
                    {startingBalance === null ? <Form.Text className='text-muted'>
                        Please select a starting balance!
                    </Form.Text> : null}
                </Form.Group>
                <div className="p-1">
                    <Link to="/login">
                        <Button
                            className="login-page-buttons"
                        >Back to Login</Button>
                    </Link>
                    <Button
                        className='login-page-buttons ms-3'
                        variant='primary'
                        type='submit'>
                        Sign Up
                    </Button>
                </div>
            </Form>




        </Container>
    );
}

export default SignUpPage;
