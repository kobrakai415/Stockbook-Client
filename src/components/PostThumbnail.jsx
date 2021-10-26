import React, { useState } from 'react';
import { Col, Modal } from 'react-bootstrap';
import PostContainer from './PostContainer';

const PostThumbnail = ({ post }) => {

    const [postModal, setPostModal] = useState(false)


    return (
        <Col xs={12} md={6} lg={4}>
            <div onClick={() => setPostModal(true)} className="position-relative post-thumbnail">
                <img className="img-fluid" src={post.image} alt="post" />

                <div className=" post-thumbnail-overlay">
                    <div className="d-flex mb-2 align-items-center">
                        <img src={post.user.image} style={{ borderRadius: "50%", height: "40px", width: "40px" }} alt="user" />
                        <strong className="text-truncate ms-3" >{post.user.username}</strong>
                    </div>
                    <h5 className="text-truncate">{post.title}</h5>
                </div>

            </div>

            <Modal id="account-modal" show={postModal} onHide={() => setPostModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{post.user.username}s post </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0" >

                    <PostContainer post={post} key={post._id} />

                </Modal.Body>

            </Modal>

        </Col>
    );
}

export default PostThumbnail;
