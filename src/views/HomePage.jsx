import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import SearchPage from './SearchPage';
const ApiUrl = process.env.REACT_APP_MY_API


const HomePage = () => {

    return (
        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>
                <Col md={5}>
                    <SearchPage />

                </Col>
                <button onClick={() => axios.post(`${ApiUrl}/users/refreshToken`, { withCredentials: true })}>Refresh token</button>
            </Row>
        </Col>
    );
}

export default HomePage;
