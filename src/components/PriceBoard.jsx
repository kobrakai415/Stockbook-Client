import React from 'react';
import {Col, Button} from 'react-bootstrap';

const PriceBoard = ({dailyChartData, overview, livePrice, quotedPrice, percentageChange}) => {
    return (
        <Col md={12}>

        {overview && quotedPrice && dailyChartData && <>
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
                        <Button variant="success">
                            Buy
                        </Button>
                        <Button className="ms-3" variant="dark">
                            Add to watchlist
                        </Button>
                    </div>
                </div>
            </div>
        </>
        }
    </Col>
    );
}

export default PriceBoard;
