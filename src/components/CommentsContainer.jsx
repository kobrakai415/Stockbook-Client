import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import dateDiff from '../helpers/dateDiff';


const CommentsContainer = ({ comment, index }) => {

    useEffect(() => {
        console.log((index) / 2 === 0)
    }, [])

    return (
        <Card className={"p-1 m-2 " + ((index) % 2 === 0 ? "ms-5" : "me-5")} bg="light" >

            <div className="d-flex justify-content-between p-2">
                <div className="d-flex flex-row align-items-center">
                    <div className="comment-user p-1 me-3">
                        <h6>{comment.user.name} {comment.user.surname}</h6>
                    </div>
                    <span>{comment.comment}</span>
                </div>

                <span>{dateDiff(comment.createdAt)}</span>
            </div >
        </Card>
    );
}

export default CommentsContainer;
