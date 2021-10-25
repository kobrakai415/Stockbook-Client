import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ApiUrl = process.env.REACT_APP_MY_API

const AddUserContainer = ({ user }) => {

    const following = useSelector(state => state.data.user.following)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(following, "following")

    }, [following]);

    const follow = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/network/${user._id}/follow`)

            if (res.status === 200) {
                dispatch({
                    type: 'SET_FOLLOWERS_AND_FOLLOWING',
                    payload: res.data
                })
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
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <div className="no-decoration p-2 d-flex justify-content-between align-items-center">
            <Link to={`/user/${user._id}`}>
                <div className="d-flex text-truncate flex-row flex-md-column flex-xl-row">
                    <img alt="profile" className="me-3" style={{ borderRadius: "50%", width: "45px", height: "45px" }} src={user.image || "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"}></img>
                    <span className="mb-0 py-2 text-truncate">{user.username}</span>
                </div>
            </Link>
            {/* <img className="add-user-button" style={{ borderRadius: "50%", width: "35px", height: "35px" }} src="/add-user.png" alt="Follow user" /> */}

            {following && following.find(item => item === user._id) ?
                <Button id="unfollow-button" className="rounded" onClick={unfollow}>Unfollow</Button>
                : <Button style={{ width: "100px", borderColor: "rgb(55, 187, 148)" }} className="btn-primary rounded login-page-buttons" onClick={follow}>Follow</Button>}
        </div>
    );
}

export default AddUserContainer;
