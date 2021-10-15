import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ApiUrl = process.env.REACT_APP_MY_API

const AddUserContainer = ({ user }) => {

    const following = useSelector(state => state.data.user.following)
    const dispatch = useDispatch()

    
    const follow = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/${user._id}/follow`)

            if (res.status === 200) {

            }
        } catch (error) {
            console.log(error)
        }
    }

    const unfollow = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/${user._id}/unfollow`)

            if (res.status === 200) {

            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="py-2 d-flex justify-content-between align-items-center">
            <div>
                <img alt="profile" className="me-2" style={{ borderRadius: "50%", width: "48px", height: "48px" }} src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"></img>
                <span>{user.username}</span>
            </div>
            {/* <img className="add-user-button" style={{ borderRadius: "50%", width: "35px", height: "35px" }} src="/add-user.png" alt="Follow user" /> */}

            {following.find(item => item === user._id) ?
                <Button id="dropdown-basic-button" style={{ color: "white", width: "90px" }} onClick={unfollow}>Unfollow</Button>
                : <Button style={{ width: "90px" }} className="btn-primary login-page-buttons" onClick={follow}>Follow</Button>}

        </div>
    );
}

export default AddUserContainer;
