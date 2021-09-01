import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { finnhubClient } from '../finnhub';

const ApiUrl = process.env.REACT_APP_MY_API

const WatchlistItem = ({ stock, remove }) => {
    const [livePrice, setLivePrice] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);

    useEffect(() => {
        finnhubClient.quote(`${stock.ticker}`, (error, data, response) => {
            if (!error) {
                console.log(data)
                console.log("quoted price", data["c"])
                setLivePrice(data["c"].toFixed(2))
                setPercentageChange(data["dp"].toFixed(2))
            } else {
                console.log(error)
                console.log(response)
            }
        })
    }, [])

    return (

        <Row className="align-items-center p-1 bottom-border">
            <Col md={2}>
                <Link className="no-decor" to={`/stock/${stock.ticker}`}>
                    <h4>{stock.ticker}</h4>
                    <span>{stock.name}</span>
                </Link>
            </Col>

            <Col md={2}>
                <h6>{stock.exchange}</h6>
            </Col>
            <Col md={3}>
                <h6>{stock.sector}</h6>
            </Col>
            <Col md={2}>
                {livePrice && <h6>{"$" + livePrice}</h6>}
            </Col>
            <Col md={3}>
                <div className="d-flex flex-row">

                    {percentageChange && <h6 className={(percentageChange < 0 ? "negative" : "positive")}>{percentageChange < 0 ? "-" : "+" + percentageChange + "%"}</h6>}
                    <AiFillCloseCircle onClick={() => remove(stock._id)} className="ms-3 mt-1 close-position" />
                </div>
            </Col>
        </Row>
    );
}

export default WatchlistItem;
