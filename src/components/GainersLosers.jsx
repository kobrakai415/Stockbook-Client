import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ApiUrl = process.env.REACT_APP_FINANCIALMODELING
const ApiKey = process.env.REACT_APP_FINANCIALMODELING_APIKEY

const GainersLosers = () => {

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);



    useEffect(() => {
        console.log("hello")
        console.log(ApiUrl)
        console.log(ApiKey)

        fetchGainers()
        fetchLosers()
    }, [])

    const fetchGainers = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/gainers?apikey=${ApiKey}`, { withCredentials: false })
            console.log(res)
            if (res.status === 200) {
                setGainers(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchLosers = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/losers?apikey=${ApiKey}`, { withCredentials: false })
            console.log(res)
            if (res.status === 200) {
                setLosers(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Row className="mx-0">
            <Col xs={6}>
                <h1> Top Gainers</h1>
                <div className="light-bg p-4">
                    {gainers.length > 0 ?
                        gainers.slice(0,10).map(item => {
                            return <div className="d-flex flex-row justify-content-between p-2">

                                {item.ticker}

                                <div className={"p-1 " + (item.changes < 0 ? "negative-percentage-container" : "positive-percentage-container")}>
                                    <span>
                                        {item.changes}

                                    </span>
                                    <span>
                                        {item.changesPercentage}%
                                    </span>

                                </div>
                            </div>
                        }) :
                        null}
                </div>

            </Col>

            <Col xs={6}>
                <h1> Top Losers</h1>
                <div className="light-bg p-4">
                    {losers.length > 0 ?
                        losers.slice(0,10).map(item => {
                            return <div className="d-flex flex-row justify-content-between p-2">

                                {item.ticker}

                                <div className={"p-1 " +  (item.changes < 0 ? "negative-percentage-container" : "positive-percentage-container")}>
                                    <span>
                                        {item.changes}

                                    </span>
                                    <span>
                                        {item.changesPercentage}
                                    </span>

                                </div>
                            </div>

                        }) :
                        null}
                </div>
            </Col>

        </Row>
    );
}

export default GainersLosers;
