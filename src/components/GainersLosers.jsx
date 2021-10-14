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
            <Col className="px-0 pe-lg-2 mb-2" xs={12} md={12} lg={6}>
                <h1> Top Gainers</h1>
                <div className="light-bg p-4">
                    {gainers.length > 0 ?
                        gainers.slice(0, 10).map((item, index) => {
                            return <div key={index} className="d-flex light-bg3 flex-row justify-content-between p-2">
                                <div className="d-flex flex-column">
                                    <span>{item.ticker}</span>
                                    <span style={{ fontSize: "15px" }} className="text-muted line-clamp"> {item.companyName} </span>
                                </div>


                                <div style={{width: "90px"}} className={"p-2 d-flex flex-column " + (item.changes < 0 ? "negative-percentage-container" : "positive-percentage-container")}>
                                    <span>
                                        +{parseInt(item.changesPercentage).toFixed(2)}%

                                    </span>
                                    <span>
                                        +{item.changes.toFixed(2)}
                                    </span>

                                </div>
                            </div>
                        }) :
                        null}
                </div>

            </Col>

            <Col className="px-0 ps-lg-2" xs={12} md={12} lg={6}>
                <h1> Top Losers</h1>
                <div className="light-bg p-4">
                    {losers.length > 0 ?
                        losers.slice(0, 10).map((item, index) => {
                            return <div key={index} className="d-flex light-bg3 flex-row justify-content-between p-2">
                                <div className="d-flex flex-column">
                                    <span>{item.ticker}</span>
                                    <span style={{ fontSize: "15px" }} className="text-muted"> {item.companyName} </span>
                                </div>


                                <div style={{width: "90px"}} className={"p-2 d-flex flex-column " + (item.changes < 0 ? "negative-percentage-container" : "positive-percentage-container")}>
                                    <span>
                                        {parseInt(item.changesPercentage).toFixed(2)}%
                                    </span>
                                    <span>
                                        {item.changes.toFixed(2)}
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
