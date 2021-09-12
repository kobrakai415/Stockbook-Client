import { useEffect, useState } from 'react';
import { socket, finnhubClient } from '../finnhub/index';
import { Col, Row, Modal, Button, Alert } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ApiUrl = process.env.REACT_APP_MY_API

const PositionContainer = ({ position, index, updateProfit, removeFromProfits }) => {

    const [livePrice, setLivePrice] = useState(0);
    const [profit, setProfit] = useState(null);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);

    const state = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("rendered")

        finnhubClient.quote(`${position.ticker}`, (error, data, response) => {
            if (!error) {
                console.log("quoted price", data["c"])
                setLivePrice(data["c"].toFixed(2))
            } else {
                console.log(error)
                console.log(response)
            }
        })


        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${position.ticker}` }))

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)

            if (json.type === "trade") {
                if (json.data[0].s === position.ticker) {

                    setLivePrice(json.data[0].p.toFixed(2))

                }
            }
        });

        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${position.ticker}` }))
            console.log("disconnected")
        }

    }, []);

    useEffect(() => {

        const difference = ((livePrice * position.shares) - (position.purchasePrice * position.shares)).toFixed(2)

        setProfit(difference)
        updateProfit({ index, difference })

        return () => {
            removeFromProfits({index, difference})
        }

    }, [livePrice])


    const closePosition = async () => {
        try {
            const body = {
                id: position._id,
                cost: (position.purchasePrice * position.shares),
                sell: (livePrice * position.shares),
                sellPrice: livePrice,
            }

            const res = await axios.post(`${ApiUrl}/trade/close`, body)
            if (res.status === 200) {
                socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${position.ticker}` }))
                dispatch({
                    type: "SET_USER",
                    payload: res.data
                })
                setShow(false)
            } else {
                setAlert(true)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            {livePrice && position && profit ? <>
                <Row className="position-item bottom-border">
                    <Col className="p-1" md={2}>
                        <h6>{position.stock}</h6>
                    </Col>

                    <Col className="p-1" md={2}>
                        <h6>{position.ticker}</h6>
                    </Col>

                    <Col className="p-1 d-flex justify-content-start" md={2}>
                        <h6>{position.shares}</h6>
                    </Col>

                    <Col className="p-1" md={2}>
                        <h6>{"$" + position.purchasePrice}</h6>
                    </Col>

                    <Col className="p-1" md={2}>
                        <h6>{"$" + livePrice}</h6>
                    </Col>
                    <Col className={"p-1 " + (profit < 0 ? "negative" : "positive")} md={2}>
                        <div className="d-flex flex-row">
                            <h6 className="flex-grow-1">{(profit < 0 ? "-" : "+") + "$" + Math.abs(profit).toFixed(2)}</h6>
                            <AiFillCloseCircle onClick={() => setShow(true)} className="ms-3 me-5 mt-1 close-position" />

                        </div>
                    </Col>
                </Row>

                <Modal
                    
                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Close position</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3">

                        <div className="p-2 d-flex flex-row justify-content-between">
                            <h5>Stock: </h5> <h5>{position.stock}</h5>
                        </div>
                        <div className="p-2 d-flex flex-row justify-content-between">
                            <h5>CostPrice: </h5> <h5>{"$" + position.purchasePrice}</h5>
                        </div>
                        <div className={"p-2 d-flex flex-row justify-content-between " + (profit < 0 ? "negative" : "positive")}>
                            <h5>Profit: </h5> <h5>{(profit < 0 ? "-$" : "-$") + Math.abs(profit).toFixed(2)}</h5>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button onClick={closePosition} variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>

                {alert && <Alert className="alerts" variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        { }
                    </p>
                </Alert>}
            </>: null}

        </>
    );
}

export default PositionContainer;
