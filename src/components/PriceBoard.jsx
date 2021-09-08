import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Dropdown, DropdownButton, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user))
})

const ApiUrl = process.env.REACT_APP_MY_API

const PriceBoard = ({ data: { overview, dailyChartData, livePrice, yesterdaysClosing, user }, quotedPrice, setUser }) => {

    const [percentageChange, setPercentageChange] = useState((livePrice - yesterdaysClosing) / yesterdaysClosing * 100);
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState((quantity * livePrice));
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [watchlist, setWatchlist] = useState(null);
    const [watchlistName, setWatchlistName] = useState("");
    const [watchlistError, setWatchlistError] = useState(false)

    useEffect(() => {

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

            if (res.statusText === "OK") {
                setUser(res.data)
                setShow(false)
                setSuccess(true)
                console.log(res)
            }
        } catch (error) {
            setError(true)
            setShow(false)
     
            console.log(error)
        }
    }

    const createWatchlist = async () => {
        try {
            const body = {
                name: watchlistName,
                stocks: []
            }
            const res = await axios.post(`${ApiUrl}/watchlists/new`, body, { withCredentials: true })
            console.log(res)

            if (res.status === 201) {
                setWatchlist(false)
                setUser(res.data)
            } else {
                setWatchlistError(true)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const addToWatchlist = async (id) => {
        try {
            const body = {
                name: overview.Name,
                ticker: overview.Symbol,
                exchange: overview.Exchange,
                sector: overview.Sector
            }

            const res = await axios.post(`${ApiUrl}/watchlists/${id}/add`, body, { withCredentials: true })
            console.log(res)

            if (res.statusText === "OK") {
                setUser(res.data)
            } else {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col md={12}>

            {success && <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                <Alert.Heading>Server message</Alert.Heading>
                <p>
                    Transaction completed successfully!
                </p>
            </Alert>}
            {error && <Alert variant="danger" onClose={() => setError(false)} dismissible>
                <Alert.Heading>Server message</Alert.Heading>
                <p>
                    An error occurred! Please try again!
                </p>
            </Alert>}

            {overview && livePrice && dailyChartData ? <>
                <div className="pb-4 d-flex justify-content between price-board">
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
                        <div className="p-2 ms-3 d-flex flex-column ">
                            <Button className="m-2" onClick={() => setShow(true)} variant="success">
                                Buy
                            </Button>
                            <DropdownButton id="dropdown-basic-button" className="m-2" variant="dark" title="Add to watchlist">
                                <Dropdown.Item onClick={() => setWatchlist(true)}>New watchlist +</Dropdown.Item>
                                {user.watchlists.map((item, index) => {
                                    return <Dropdown.Item key={index} onClick={() => addToWatchlist(item._id)}>{item.name}</Dropdown.Item>
                                })}
                            </DropdownButton>
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
                            <h5>Shares: </h5> <input style={{ maxWidth: "50px" }} min="1" step="1" onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number"></input>
                        </div>

                        <div className="p-2 d-flex flex-column justify-content-between">
                            <div className="d-flex flex-row justify-content-between">
                                <h5>Total: </h5> <h5>{"$" + (quantity * livePrice).toFixed(2)}</h5>

                            </div>
                            {total > user.balance && <span className="text-muted" style={{ color: "red" }}>Insufficient funds, please amend positioning!</span>}
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button disabled={user.balance < total ? true : false} onClick={buyStock} variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>}

            <Modal

                show={watchlist}
                onHide={() => setWatchlist(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create new watchlist!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-3">


                    <div className="p-2 d-flex flex-row justify-content-between">
                        <h5>Name: </h5> <input value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)} type="text"></input>
                    </div>

                    {watchlistError &&
                        <div className="d-flex justify-content-between flex-row">

                            <p>
                                Error creating watchlist, try again!
                            </p>
                            <Button onClick={() => setWatchlistError(false)}>Aknowledge</Button>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setWatchlist(false)}>
                        Close
                    </Button>
                    <Button onClick={createWatchlist} variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>

        </Col>
    );
}




export default connect(mapStateToProps, mapDispatchToProps)(PriceBoard);
