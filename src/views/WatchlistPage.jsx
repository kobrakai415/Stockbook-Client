import { useEffect, useState } from 'react';
import { Col, Row, DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import WatchlistItem from '../components/WatchlistItem';
import axios from 'axios';

const ApiUrl = process.env.REACT_APP_MY_API

const WatchlistPage = () => {
    const { data: { user: { watchlists } } } = useSelector(state => state)
    const [selected, setSelected] = useState(watchlists[0].name);
    const [watchlist, setWatchlist] = useState(watchlists[0]);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(watchlists)
        const watclistToDisplay = watchlists.find(watchlist => watchlist.name === selected)
        setWatchlist(watclistToDisplay)

    }, [selected, watchlists])


    const removeFromWatchlist = async (stockId) => {
        try {
            const res = await axios.post(`${ApiUrl}/watchlists/${watchlist._id}/remove/${stockId}`)

            if (res.statusText === "OK") {
                dispatch({
                    type: "SET_USER",
                    payload: res.data
                })
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>
                <h1>Watchlists</h1>


                {watchlists && <>
                    <DropdownButton id="dropdown-basic-button" variant="dark" title="Select a watchlist">
                        {watchlists.map((watchlist, index) => {
                            return <Dropdown.Item key={index} onClick={() => setSelected(watchlist.name)}>{watchlist.name}</Dropdown.Item>
                        })}

                    </DropdownButton>
                    <Col className="pb-3" xs={12}>
                      {watchlist.name && <h1>{watchlist.name}</h1>}
                    </Col>
                    <Col md={3}>
                        <h3>Stock </h3>
                    </Col>
                    <Col md={2}>
                        <h3>Ticker</h3>
                    </Col>
                    <Col md={2}>
                        <h3>Exchange </h3>
                    </Col>
                    <Col md={3}>
                        <h3>Sector </h3>
                    </Col>
                    <Col md={2}>

                    </Col>


                    {watchlist.stocks.length > 0 && watchlist.stocks.map((item, index) => {
                        return <WatchlistItem key={index} remove={removeFromWatchlist} stock={item} />
                    })}

                </>}
            </Row>
        </Col>
    );
}

export default WatchlistPage;
