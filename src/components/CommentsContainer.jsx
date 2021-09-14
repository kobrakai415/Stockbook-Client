import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import dateDiff from '../helpers/dateDiff';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ApiUrl = process.env.REACT_APP_MY_API

const CommentsContainer = ({ comment, index, updatePost }) => {

    const user = useSelector(state => state.data.user)

    useEffect(() => {
        console.log((index) / 2 === 0)
    }, [])

    const deleteComment = async () => {
        try {
            const res = await axios.delete(`${ApiUrl}/comments/${comment._id}`)
            console.log(res)
            if (res.status === 200) {
                console.log(res.data.comments.reverse())
                updatePost(res.data)
            }
        } catch (error) {

        }
    }
    return (
        <Card className={"p-1 m-2 " + ((index) % 2 === 0 ? "ms-5" : "me-5")} bg="dark" >

            <div className="d-flex flex-column justify-content-between p-2">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row justify-content-between align-items-center p-1 me-3">
                        <img alt="" className="me-2" style={{ borderRadius: "50%", width: "24px", height: "24px", border: "black solid 1px" }} src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"></img>
                        <h6 className="mb-0">{comment.user.name} {comment.user.surname}</h6>

                    </div>
                    {user._id === comment.user._id && <AiFillCloseCircle className="ms-3 mt-1 close-position" onClick={deleteComment} />}
                </div>
                <span>{comment.comment}</span>
                <div className="d-flex justify-content-end">
                    <div>

                    </div>
                    <span className="ms-2">{dateDiff(comment.createdAt)}</span>
                </div>
            </div >
        </Card>
    );
}

export default CommentsContainer;
