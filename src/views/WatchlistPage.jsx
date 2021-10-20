import { useEffect, useState } from 'react';
import { Col, Row, DropdownButton, Dropdown, Button, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import WatchlistItem from '../components/WatchlistItem';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApiUrl = process.env.REACT_APP_MY_API

const WatchlistPage = () => {
    const { data: { user: { watchlists } } } = useSelector(state => state)
    const dispatch = useDispatch()

    const [selected, setSelected] = useState("");
    const [watchlist, setWatchlist] = useState(null);
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {

        console.log(watchlists)
        const watchlistToDisplay = watchlists.find(watchlist => watchlist.name === selected)
        watchlistToDisplay ? setWatchlist(watchlistToDisplay) : setWatchlist(watchlists[0])

    }, [selected, watchlists])



    const removeFromWatchlist = async (stockId) => {
        try {
            const res = await axios.post(`${ApiUrl}/watchlists/${watchlist._id}/remove/${stockId}`)

            if (res.statusText === "OK") {
                dispatch({
                    type: "SET_USER",
                    payload: res.data
                })

                setShowA(!showA)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteWatchlist = async () => {
        try {
            const res = await axios.delete(`${ApiUrl}/watchlists/${watchlist._id}/delete`)
            console.log(res)
            if (res.status === 200) {
                dispatch({
                    type: "SET_USER",
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Col className="height-90  p-3" xs={12} md={9} lg={10}>




            {watchlists.length > 0 && watchlists ? <>
                <Row className="mb-4">
                    <Col className=" d-flex" xs={12}>

                        <div className="light-bg p-4">
                            <h1>Watchlists</h1>
                            <DropdownButton id="dropdown-basic-button" variant="dark" title="Select a watchlist">
                                {watchlists.map((watchlist, index) => {
                                    return <Dropdown.Item key={index} onClick={() => setSelected(watchlist.name)}>{watchlist.name}</Dropdown.Item>
                                })}

                            </DropdownButton>
                        </div>
                    </Col>
                </Row>

                <Row className=" mx-0 ">

                    <Col className="light-bg p-4 " xs={12}>
                        <Row>
                            <Col xs={12}>
                                {watchlist?.name && <div className="d-flex flex-row">
                                    <h1>{watchlist.name}</h1>
                                    <Button onClick={deleteWatchlist} className="m-3" size="sm" variant="outline-danger" >Delete watchlist</Button>
                                </div>}
                            </Col></Row>
                        <Row className="mb-3 text-muted mx-0 bottom-border2">
                            <Col md={2}>
                                <h2>Stock </h2>
                            </Col>
                            <Col md={2}>
                                <h2>Exchange </h2>
                            </Col>
                            <Col md={3}>
                                <h2>Sector </h2>
                            </Col>
                            <Col md={2}>
                                <h2>Last</h2>
                            </Col>
                            <Col md={3}>
                                <h2>Change</h2>

                            </Col>
                        </Row>


                        {watchlist && watchlist.stocks.length > 0 && watchlist.stocks.map((item, index) => {
                            return <WatchlistItem key={index} index={index} remove={removeFromWatchlist} stock={item} />
                        })}


                    </Col>
                </Row>

            </>
                : <Link className="no-decoration centered"  to="/">
                    <h3>You have no watchlists find some of your favourite stocks here!</h3>
                </Link>

            }







            <Toast
                className="slide-in-top "
                style={{
                    position: 'absolute',
                    top: "15vh",
                    right: "65vh",
                }} show={showA} onClose={toggleShowA}>
                <Toast.Header>

                    <strong className="me-auto">Server Message</strong>

                </Toast.Header>
                <Toast.Body>Successfully removed from watchlist!</Toast.Body>
            </Toast>
        </Col>
    );
}

export default WatchlistPage;
