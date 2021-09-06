import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostContainer from './PostContainer';

const ApiUrl = process.env.REACT_APP_MY_API

const Posts = () => {
    const [addNew, setAddNew] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);

    const { symbol } = useParams();
    const { data } = useSelector(state => state);


    useEffect(() => {
        fetchPosts()

    }, [])

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/posts/${symbol}`)
            
            if(res.status === 200) {
                console.log(res)
                setPosts(res.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    const createNewPost = async () => {
        try {
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
                    setAddNew(false)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="pt-3">
            <h3>Community thoughts</h3>
            <div className="pt-4">

                <div className="d-flex align-items-center">
                    <img alt="" className="me-2" style={{ borderRadius: "50%", width: "48px", height: "48px" }} src="https://media.giphy.com/media/TdMVH60kJvTMI/source.gif"></img>
                    <Form className="flex-grow-1" inline>
                        <FormControl style={{ width: "100%", height: "48px", borderRadius: "35px" }} type="text" placeholder="Start a post" onClick={() => setAddNew(!addNew)} className="flex-grow-1 mr-sm-2" />
                    </Form>
                </div>
            </div >

            <Row>

                {posts.length > 0 && posts.map((item, index) => {
                    return <PostContainer key={index} post={item} />
                })}
            </Row>




            <Modal show={addNew} onHide={() => setAddNew(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required={true} validation={true} as="textarea" rows={1} min={10} placeholder="Give your post a title!" />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={content} onChange={(e) => setContent(e.target.value)} required={true} as="textarea" rows={6} placeholder="What do you want to talk about?" />
                        </Form.Group>
                        <Form.Group controlId="formBasicImage">
                            <Form.Label>Upload image</Form.Label>
                            <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddNew(false)}>
                        Close
                    </Button>
                    <Button onClick={createNewPost} variant="primary" >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Posts;
