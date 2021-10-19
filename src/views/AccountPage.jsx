import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AccountPage = () => {


    const user = useSelector(state => state.data.user)
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [username, setUsername] = useState(user.username);

    const [edit, setEdit] = useState(false)






    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>
                <Col xs={12}>
                    <div>
                        <h1>My Profile</h1>


                        <div className="light-bg d-flex flex-column align-items-center p-4">
                            <div className="d-flex flex-column flex-md-row align-items-center ">
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


                        <div className="light-bg my-4 ">

                            <Form style={{ minWidth: "270px", minHeight: "380px" }} validated className={'profile-form mx-auto d-flex flex-column ' + (edit ?  "" : "input-edit")}>



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
                                <div>
                                    <Button onClick={() => setEdit(!edit)} variant="primary">Edit</Button>
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
