import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, Spinner, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

const ApiUrl = process.env.REACT_APP_MY_API

const AccountPage = () => {

    const user = useSelector(state => state.data.user)
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio)
    const [image, setImage] = useState(null)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [posts, setPosts] = useState(null)

    const dispatch = useDispatch()

    const editProfile = async () => {
        try {

            const body = {
                name,
                surname,
                username,
                bio
            }
            setLoading(true)
            const res = await axios.put(`${ApiUrl}/users`, body)
            console.log(res)
            if (res.status === 200) {

                setEdit(false)
                setLoading(false)
                dispatch({
                    type: 'UPDATE_USER',
                    payload: res.data
                })

            }

        } catch (error) {
            console.log(error)
            setEdit(false)
            setLoading(false)
        }
    }

    const handleImageUpload = async () => {
        try {
            setImageLoading(true)
            let data = new FormData();
            data.append('profilePic', image, image.name);
            const res = await axios.post(`${ApiUrl}/users/uploadImage`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })

            if (res.status === 200) {
                console.log(data)
                dispatch({
                    type: "UPLOAD_IMAGE",
                    payload: res.data
                })
                setImageLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/posts`)

            console.log(res)
            if (res.status === 200) {
                setPosts(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (image) handleImageUpload()
    }, [image]);

    useEffect(() => {

        fetchUserPosts()
    }, []);

    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>
                <Col xs={12}>
                    <div>
                        <h1>My Profile</h1>


                        <div className="light-bg d-flex flex-column align-items-center p-4">
                            <div className="d-flex p-4 flex-column flex-md-row align-items-center ">

                                <img className="img-fluid profile-img" style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={user.image} />

                                <div className="p-4">
                                    <div className="d-flex flex-row align-items-center pb-2 ">
                                        <h2 className="mb-0">@{user.username}</h2>
                                        <img onClick={() => setEditModal(true)} id="settings-logo" src="/settings.png" alt="settings" />
                                    </div>
                                    <span className="text-muted">{user.name + " " + user.surname}</span>
                                </div>
                            </div>
                            {user.bio ? <div>
                                <p>{user.bio}</p>
                            </div> : null}
                            <div className="d-flex my-4 justify-content-center">
                                <div className="d-flex  p-2 flex-column flex-md-row align-items-center mx-3 follow-stats">
                                    <h3 className="mx-2">0</h3>
                                    <h3>Posts</h3>
                                </div>
                                <div className="d-flex  p-2 flex-column flex-md-row align-items-center mx-3 follow-stats">
                                    <h3 className="mx-2">{user.followers.length} </h3>
                                    <h3>Followers</h3>
                                </div>
                                <div className="d-flex  p-2 flex-column flex-md-row align-items-center mx-3 follow-stats">
                                    <h3 className="mx-2">{user.following.length} </h3>
                                    <h3>following</h3>
                                </div>
                            </div>

                        </div>

                        <h1 className="mt-4">Posts</h1>

                        <div className="light-bg my-4 position-relative  ">


                        </div>



                        <Modal id="account-modal" show={editModal} onHide={() => setEditModal(false)} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>My Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ position: "relative" }} className="p-4">
                                <div className="d-flex flex-column align-items-center p-4">
                                    <div className="d-flex p-4 flex-column flex-md-row align-items-center ">
                                        <div className="position-relative">

                                            <label htmlFor="image-upload">
                                                {imageLoading ?
                                                    <Spinner animation="grow" role="status" variant="info" style={{ position: "absolute", top: "0px", right: "0px", height: "50px", width: "50px" }} />
                                                    : <img id="upload-profile-pic" src="/pencil.png" />}
                                            </label>
                                            <input id="image-upload" onChange={(e) => setImage(e.target.files[0])} className="d-none" type="file" ></input>

                                            <img className="img-fluid profile-img" style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={user.image} />
                                        </div>
                                        <div className="p-4">
                                            <div className="d-flex flex-row align-items-center pb-2 ">
                                                <h2 className="mb-0">@{user.username}</h2>

                                            </div>
                                            <span className="text-muted">{user.name + " " + user.surname}</span>
                                        </div>
                                    </div>
                                    {user.bio ? <div>
                                        <p>{user.bio}</p>
                                    </div> : null}
                                </div>
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
                                    <Form.Group className='mb-3 p-2' controlId='username'>
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control
                                            className="px-0"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            type='text'
                                            disabled={!edit}

                                        />
                                    </Form.Group>
                                    <div className="mx-auto">
                                        {edit ? <Button className="login-page-buttons" style={{ width: "100px", height: "44px" }} onClick={() => editProfile()} variant="primary">{loading ? <Spinner animation="border" role="status" /> : "Save"}</Button>
                                            : <Button id="unfollow-button" style={{ height: "44px" }} onClick={() => setEdit(!edit)} variant="primary">Edit</Button>}
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>


                    </div>

                </Col>

            </Row>
        </Col>
    );
}

export default AccountPage;
