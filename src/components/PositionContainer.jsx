import { useEffect, useState } from 'react';
import { socket, finnhubClient } from '../finnhub/index';
import { Col } from 'react-bootstrap';

const PositionContainer = ({ position }) => {

    const [livePrice, setLivePrice] = useState(position.purchasePrice);


    useEffect(() => {

        finnhubClient.quote(`${position.ticker}`, (error, data, response) => {
            if (!error) {
                console.log("quoted price", data["c"])
                setLivePrice(data["c"])
            } else {
                console.log(error)
                console.log(response)
            }
        })

        socket.addEventListener('open', (event) => {
            console.log("connected")
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${position.ticker}` }))
        })

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)

            if (json.type === "trade") {
                setLivePrice(json.data[0].p.toFixed(2))
                console.log(json?.data[0].p)
            }
        });

    }, []);

    return (
        <>
            <Col className="p-1" md={2}>
                <h6>{position.stock}</h6>

            </Col>

            <Col className="p-1" md={2}>
                <h6>{position.ticker}</h6>
            </Col>

            <Col className="p-1" md={2}>
                <h6>{position.shares}</h6>
            </Col>

            <Col className="p-1" md={2}>
                <h6>{"$" + position.purchasePrice}</h6>
            </Col>

            <Col className="p-1" md={2}>
                <h6>CurrentPrice</h6>
            </Col>
            <Col className="p-1" md={2}>
                <h6>P&L</h6>
            </Col>
        </>

    );
}

export default PositionContainer;
