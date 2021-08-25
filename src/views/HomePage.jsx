import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({


})
const HomePage = () => {


    // useEffect(() => {

    //     setInterval(() => {
    //         refreshToken()
    //     }, 873000)
    // }, [])

    // const refreshToken = async () => {

    // }


    return (
        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>

                <div>
                    Hello
                </div>
            </Row>
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
