import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import SearchPage from './SearchPage';

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({


})
const HomePage = () => {



    return (
        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>
                <Col md={5}>
                <SearchPage/>

                </Col>
            </Row>
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
