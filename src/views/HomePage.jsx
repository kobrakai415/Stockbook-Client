import { Row, Col } from 'react-bootstrap';
import SearchPage from './SearchPage';


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

export default HomePage;
