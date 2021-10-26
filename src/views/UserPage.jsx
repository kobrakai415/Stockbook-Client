import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import PostContainer from '../components/PostContainer';
import PostThumbnail from '../components/PostThumbnail';
import { useSelector, useDispatch } from 'react-redux';


const ApiUrl = process.env.REACT_APP_MY_API

const UserPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { following, followers } = useSelector(state => state.data.user)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState(null)
    const [postsLoading, setPostsLoading] = useState(false)

    useEffect(() => {
        fetchUser()
        fetchUserPosts()
    }, [id]);

    const fetchUserPosts = async () => {
        try {
            setPostsLoading(true)
            const res = await axios.get(`${ApiUrl}/posts/${id}/user`)

            console.log(res.status)
            if (res.status === 200) {
                setPosts(res.data)
                setPostsLoading(false)
            }
        } catch (error) {
            setPosts([])
            setPostsLoading(false)
            console.log(error)
        }
    }

    const fetchUser = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${ApiUrl}/users/${id}`)
            console.log(res)

            if (res.status === 200) {
                setUser(res.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const follow = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/network/${user._id}/follow`)

            if (res.status === 200) {
                dispatch({
                    type: 'SET_FOLLOWERS_AND_FOLLOWING',
                    payload: res.data
                })
                fetchUser()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unfollow = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/network/${user._id}/unfollow`)

            if (res.status === 200) {
                dispatch({
                    type: 'SET_FOLLOWERS_AND_FOLLOWING',
                    payload: res.data
                })
                fetchUser()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>
                <Col xs={12}>
                    <h1>Profile</h1>

                    {user ? <div className="light-bg d-flex flex-column align-items-center p-4">
                        <div className="d-flex p-4 flex-column flex-md-row align-items-center ">
                            <img className="img-fluid profile-img" style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={user.image} />
                            <div className="p-4">
                                <div className="d-flex flex-row align-items-center pb-2 ">
                                    <h2 className="mb-0">@{user.username}</h2>
                                    {/* <img onClick={() => setEditModal(true)} id="settings-logo" src="/settings.png" alt="settings" /> */}
                                </div>
                                <span className="text-muted">{user.name + " " + user.surname}</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            {following && following.find(item => item === user._id) ?
                                <Button id="unfollow-button"  onClick={unfollow}>Unfollow</Button>
                                : <Button id="follow-button" onClick={follow}>Follow</Button>}
                        </div>
                        {user.bio ? <div >
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
                                <h3>Following</h3>
                            </div>
                        </div>
                    </div>
                        : null}

                </Col>

                <h1 className="mt-4">Posts</h1>

                {posts && posts.length === 0 ? <div className=" my-4 position-relative d-flex flex-column align-items-center  ">
                    <img className="img-fluid mb-2" height="200px" src="/bear.png" alt="no-posts" />
                    <h3>This user has no posts!</h3>
                </div>
                    : null}

                {
                    posts && posts.length > 0 ?
                        <>
                            {posts.map(item => <PostThumbnail key={item._id} post={item} />)}
                        </>
                        : null
                }

            </Row>
        </Col>
    );
}

export default UserPage;
