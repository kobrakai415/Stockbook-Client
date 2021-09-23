import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, FormControl, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostContainer from './PostContainer';

const ApiUrl = process.env.REACT_APP_MY_API

const PostsSection = () => {
    const [addNew, setAddNew] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false)

    const { symbol } = useParams();
    const { data } = useSelector(state => state);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/posts/${symbol}`)

            if (res.status === 200) {
                console.log(res)
                setPosts(res.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();

    }, [])

    const createNewPost = async (e) => {
        try {
            setLoading(true)
            const form = e.currentTarget
            e.preventDefault()

            if (form.checkValidity() === false) {
                return
            }

            const body = {
                user: data.user._id,
                stock: data.overview.Name,
                ticker: data.overview.Symbol,
                title,
                content,

            }
            const res = await axios.post(`${ApiUrl}/posts/${symbol}`, body)

            console.log(res)


            if (res.status === 201) {
                let data = new FormData();
                data.append('postcover', image, image.name);

                const response = await axios.post(`${ApiUrl}/posts/${res.data._id}/uploadCover`, data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                })
                console.log(response)

                if (response.status === 200) {
                    setPosts(response.data.reverse())

                    setLoading(false)
                    setAddNew(false)
                    setTitle("")
                    setContent("")
                    setImage(null)

                    console.log(response)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Community blog</h1>
            <div className="light-bg p-4 mb-4 ">
                <div className="p-3 ">

                    <div className="d-flex align-items-center">
                        <img alt="profile" className="me-2" style={{ borderRadius: "50%", width: "48px", height: "48px" }} src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"></img>
                        <Form className="flex-grow-1">
                            <FormControl style={{ width: "100%", height: "48px", borderRadius: "35px" }} type="text" placeholder="Start a post" onClick={() => setAddNew(!addNew)} className="flex-grow-1 mr-sm-2" />
                        </Form>
                    </div>
                </div >
            </div >





            <Row>

                {posts.length > 0 && posts.map((item, index) => {
                    return <PostContainer key={item._id} post={item} />
                })}
            </Row>




            <Modal show={addNew} onHide={() => setAddNew(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new post</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ position: "relative" }} className="p-4">
                    <Form validated onSubmit={(e) => createNewPost(e)}>
                        <Form.Group className="py-2" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required={true} value={title} onChange={(e) => setTitle(e.target.value)} as="textarea" rows={1} placeholder="Give your post a title!" />
                        </Form.Group>
                        <Form.Group className="py-2" controlId="formBasicContent">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required={true} value={content} onChange={(e) => setContent(e.target.value)} as="textarea" rows={6} placeholder="What do you want to talk about?" />
                        </Form.Group>
                        <Form.Group className="py-2" controlId="formBasicImage">
                            <Form.Label>Upload image</Form.Label>
                            <Form.Control required={true} onChange={(e) => setImage(e.target.files[0])} type="file" />
                        </Form.Group>
                        <div className="d-flex py-2 justify-content-end">
                            <Button variant="secondary" onClick={() => setAddNew(false)}>
                                Close
                            </Button>
                            <Button className="login-page-buttons ms-3" type="submit" variant="primary" >
                                Post
                            </Button>
                        </div>
                    </Form>
                    {loading ? <Spinner className="loading-spinner" animation="border" variant="primary" /> : null}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


        </>
    );
}

export default PostsSection;
