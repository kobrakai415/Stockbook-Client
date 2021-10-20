import React, { useState } from 'react';
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios'

const ApiUrl = process.env.REACT_APP_MY_API

const AccountPage = () => {


    const user = useSelector(state => state.data.user)
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [username, setUsername] = useState(user.username);

    const [edit, setEdit] = useState(false)

    const [loading, setLoading] = useState(false)


    const editProfile = async () => {
        try {

            const body = {
                name,
                surname,
                username
            }
            setLoading(true)
            const res = await axios.put(`${ApiUrl}/users`, body)
            console.log(res)
            if (res.status === 200) {

                setEdit(false)
                setLoading(false)

            }

        } catch (error) {
            console.log(error)
            setEdit(false)
            setLoading(false)
        }
    }


    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>
                <Col xs={12}>
                    <div>
                        <h1>My Profile</h1>


                        <div className="light-bg d-flex flex-column align-items-center p-4">
                            <div className="d-flex p-4 flex-column flex-md-row align-items-center ">
                                <div>

                                    <img className="img-fluid profile-img" style={{ borderRadius: "50%", width: "200px", height: "200px" }} src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png" />
                                </div>
                                <div className="p-4">
                                    <h2>@{user.username}</h2>
                                    <span className="text-muted">{user.name + " " + user.surname}</span>
                                </div>
                            </div>

                            <div className="d-flex my-4 justify-content-center">

                                <div className="d-flex flex-column flex-md-row align-items-center mx-3 follow-stats">
                                    <h3 className="mx-2">{user.followers.length} </h3>
                                    <h3>Followers</h3>
                                </div>
                                <div className="d-flex flex-column flex-md-row align-items-center mx-3 follow-stats">
                                    <h3 className="mx-2">{user.following.length} </h3>
                                    <h3>following</h3>
                                </div>
                            </div>

                        </div>

                        <h1 className="mt-4">Edit Profile</h1>

                        <div className="light-bg my-4 ">

                            <Form style={{ minWidth: "270px", minHeight: "380px" }} validated className={'profile-form mx-auto d-flex flex-column p-2 p-md-5 ' + (edit ? "input-without-edit" : "input-edit")}>



                                <Form.Group className='mb-3 p-2' controlId='username'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        className="px-0"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type='text'
                                        disabled={!edit}

                                    />
                                </Form.Group>
                                <Form.Group className='mb-3 p-2' controlId='username'>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control
                                        className="px-0"
                                        required
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        type='text'
                                        disabled={!edit}

                                    />
                                </Form.Group>
                                <Form.Group className='mb-3 p-2' controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        className="px-0"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type='text'
                                        disabled={!edit}

                                    />
                                </Form.Group>
                                <div className="mx-auto">
                                    {edit ? <Button className="login-page-buttons" style={{ width: "100px", height: "32px" }} onClick={() => editProfile()} variant="primary">{loading ? <Spinner /> : "Save"}</Button>
                                        : <Button id="unfollow-button" onClick={() => setEdit(!edit)} variant="primary">Edit</Button>}
                                </div>
                            </Form>

                        </div>

                    </div>

                </Col>

            </Row>
        </Col>
    );
}

export default AccountPage;
