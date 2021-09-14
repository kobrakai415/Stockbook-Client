import React, { useState } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const ApiUrl = process.env.REACT_APP_MY_API

const SignUpPage = ({ routerProps }) => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [startingBalance, setChecked] = useState(null);

    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()


    const submitForm = async (e) => {
        try {
            e.preventDefault()

            const newUser = {
                name,
                surname,
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


            <Form onSubmit={(e) => submitForm(e)} className='register-form p-4 p-md-5'>
                <h1>$tockBook</h1>
                <h3>Sing Up</h3>
                <Form.Group className='mb-3 p-1' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Enter first name'
                    />
                </Form.Group>
                <Form.Group className='mb-3 p-1' controlId='surname'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        type='text'
                        placeholder='Enter surname'
                    />
                </Form.Group>
                <Form.Group className='mb-3 p-1' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter email'
                    />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3 p-1' controlId='signupPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                    />
                </Form.Group>
                <Form.Group required className='mb-3 p-1'>
                    <Form.Label>Starting Balance</Form.Label>
                    <div className="mb-3">
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
