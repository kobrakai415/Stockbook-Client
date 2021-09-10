import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchPage from './SearchPage';
import { finnhubClient } from '../finnhub';
import NewsContainer from '../components/NewsContainer';

const HomePage = () => {

    const [newsArray, setNewsArray] = useState([]);


    useEffect(() => {

        finnhubClient.marketNews("general", {}, (error, data, response) => {
            console.log(data)
            setNewsArray(data)
        });
    }, []);

    return (
        <Col className="height-90" xs={12} md={9} lg={10}>
            <Row>
                <Col xs={5}>
                    <SearchPage />

                </Col>
                <Col xs={7}>

                    {newsArray.length > 0 && newsArray.slice(0,6).map((item, index) => {
                        return <NewsContainer item={item} index={index} key={item.id} />
                    })}

                </Col>

            </Row>
        </Col>
    );
}

export default HomePage;
