import axios from 'axios';
import { useState } from 'react';
import { Card, Col, Form, FormControl, Modal, Button } from 'react-bootstrap';
import dateDiff from '../helpers/dateDiff';
import { useSelector } from 'react-redux';
import CommentsContainer from './CommentsContainer';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ApiUrl = process.env.REACT_APP_MY_API

const PostContainer = ({ post }) => {

    const [newComment, setNewComment] = useState(false);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [updatedPost, setUpdatedPost] = useState(post);

    const user = useSelector(state => state.data.user)

    const postComment = async () => {
        try {

            const body = {
                comment,
                user: user._id
            }

            const res = await axios.post(`${ApiUrl}/comments/${updatedPost._id}`, body)

            console.log(res.data.comments.reverse())
            if (res.status === 201) {
                setUpdatedPost(res.data)
                setNewComment(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleLike = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/posts/${updatedPost._id}/like`)
            console.log(res)
            if (res.status === 200) {
                setUpdatedPost(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col xs={12}>
            <Card className="m-3 ">
                <div className="pb-3 p-3">
                    <h2>{updatedPost.title}</h2>

                    <span>{updatedPost.ticker}</span>

                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Card.Img src={updatedPost.image} alt="post" />
                </div>

                <div className="p-3">

                    <p>{updatedPost.content}</p>
                </div>

                <div className="d-flex flex-row justify-content-between p-3">
                    <div>

                        <div>
                            <span>Author: </span>
                            <span>{updatedPost.user.name + " " + updatedPost.user.surname}</span>

                        </div>
                        <div>
                            <span>Posted: </span>
                            <span>{dateDiff(updatedPost.createdAt)}</span>
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center">
                        <div className="m-3">
                            {updatedPost.likes.find(like => like === user._id) ? <AiFillHeart onClick={toggleLike} style={{ fontSize: "20px" }} /> : <AiOutlineHeart onClick={toggleLike} style={{ fontSize: "20px" }} />}
                        </div>

                        <div className="d-flex flex-column">

                            <span>{updatedPost.likes.length} Likes</span>
                            <span>{updatedPost.comments.length} Comments</span>
                        </div>

                    </div>
                </div>


                <div className="p-3">
                    <div className="d-flex align-items-center">
                        <img alt="" className="me-2" style={{ borderRadius: "50%", width: "48px", height: "48px" }} src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"></img>
                        <Form className="flex-grow-1" >
                            <FormControl style={{ width: "100%", height: "48px", borderRadius: "35px" }} type="text" placeholder="Make a comment" onClick={() => setNewComment(!newComment)} className="flex-grow-1 mr-sm-2" />
                        </Form>
                    </div>
                </div >


                {showComments && updatedPost.comments.length > 0 && <div className="mt-3">
                    {updatedPost.comments.length > 0 &&

                        updatedPost.comments.reverse().map((comment, index) => {
                            return <CommentsContainer updatePost={setUpdatedPost} comment={comment} key={index} index={index} />
                        })
                    }
                </div>}

                {updatedPost.comments.length > 0 ? <div className="d-flex justify-content-end p-3">
                    <span onClick={() => setShowComments(!showComments)}>{showComments ? "Hide Comments" : "Show Comments"}</span>
                </div> : <div className="p-2"> Be the first to comment on this post! </div>}

            </Card>

            <Modal show={newComment} onHide={() => setNewComment(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Make a new comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} required={true} validation={true} as="textarea" rows={1} min={10} placeholder="Type your comment here!" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setNewComment(false)}>
                        Close
                    </Button>
                    <Button disabled={comment.length < 1} onClick={postComment} variant="primary" >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>

        </Col>
    );
}

export default PostContainer;
