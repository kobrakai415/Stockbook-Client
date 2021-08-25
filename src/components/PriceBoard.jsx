import Reac, { useEffect, useState } from 'react';
import { Col, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios';



const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({

})

const ApiUrl = process.env.REACT_APP_MY_API

const PriceBoard = ({ data: { overview, dailyChartData, livePrice, yesterdaysClosing, user }, quotedPrice, }) => {

    const [percentageChange, setPercentageChange] = useState((livePrice - yesterdaysClosing) / yesterdaysClosing * 100);
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState((quantity * livePrice));
    const [show, setShow] = useState(false);


    useEffect(() => {
        console.log(livePrice)
        console.log(yesterdaysClosing)

        const change = (livePrice - yesterdaysClosing) / yesterdaysClosing * 100
        setPercentageChange(change)

    }, [livePrice, yesterdaysClosing])

    useEffect(() => {

        setTotal(quantity * livePrice)
    }, [quantity, livePrice])
    const buyStock = async () => {
        try {
            const purchase = {
                stock: overview.Name,
                ticker: overview.Symbol,
                purchaseDate: new Date(),
                totalCost: livePrice * quantity,
                purchasePrice: livePrice,
                shares: quantity,
                owner: user._id
            }

            const res = await axios.post(`${ApiUrl}/trade/buy`, purchase, { withCredentials: true })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col md={12}>

            {overview && livePrice && dailyChartData ? <>
                <div className="pb-4 d-flex justify-content between">
                    <div className="d-flex align-items-center ">
                        <div>
                            <h1>{overview.Name}</h1>
                            <span>{overview.Symbol} • </span> <span>{overview.AssetType} • </span> <span>{overview.Exchange}</span>
                        </div>
                        <div className="p-2 ms-3">

                            <h4 className="p-2">{livePrice !== null ?
                                "$" + livePrice :
                                "$" + quotedPrice}  </h4>

                            <div className="d-flex flex-row align-items-center">
                                <h4 className="p-2" style={{ color: percentageChange < 0 ? "red" : "green" }}>{percentageChange.toFixed(2) + "%"}</h4>
                                <span className="text-muted">yesterday</span>
                            </div>

                        </div>
                        <div className="p-2 ms-3">
                            <Button onClick={() => setShow(true)} variant="success">
                                Buy
                            </Button>
                            <Button className="ms-3" variant="dark">
                                Add to watchlist
                            </Button>
                        </div>
                    </div>

                </div>
            </> :
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            }

            {overview && livePrice &&
                <Modal

                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Open a position</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-3">

                        <div className="p-2 d-flex flex-row justify-content-between">
                            <h5>Stock: </h5> <h5>{overview.Name}</h5>
                        </div>
                        <div className="p-2 d-flex flex-row justify-content-between">
                            <h5>Quote: </h5> <h5>{"$" + livePrice}</h5>
                        </div>
                        <div className="p-2 d-flex flex-row justify-content-between">
                            <h5>Shares: </h5> <input style={{ maxWidth: "50px" }} min="0" step="1" onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number"></input>
                        </div>

                        <div className="p-2 d-flex flex-column justify-content-between">
                            <div className="d-flex flex-row justify-content-between">
                            <h5>Total: </h5> <h5>{"$" + (quantity * livePrice).toFixed(2)}</h5>

                            </div>  
                            {total > user.balance && <span className="text-muted" style={{color: "red"}}>Insufficient funds, please amend positioning!</span>}
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button disabled={user.balance < total ? true : false} onClick={buyStock} variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>}
        </Col>
    );
}




export default connect(mapStateToProps, mapDispatchToProps)(PriceBoard);
