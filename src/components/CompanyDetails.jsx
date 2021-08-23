import React from 'react';
import shortNumber from '@pogix3m/short-number';
import Plot from 'react-plotly.js';
import { Col } from 'react-bootstrap';
import { connect } from "react-redux"


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({


})


const CompanyDetails = ({ data }) => {

    const overview = data.overview
    const dailyChartData = data.dailyChartData
    const chartXValues = data.chartXValues
    const chartYValues = data.chartYValues

    return (
        <Col className="d-flex flex-column" md={8} lg={9}>

            {dailyChartData && overview && <>



                <Plot

                    data={[
                        {
                            x: chartXValues,
                            y: chartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },

                    ]}
                    layout={{
                    
                        autosize: true
                    }}
                    useResizeHandler={true}
                    config={{ responsive: true }}
                    
                />



                <h3>Company details</h3>

                <p>{overview.Description}</p>

                <h3>Key Ratios</h3>
                <div className="d-flex flex-column">
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">Analyst Price Target</span> <span>{"$" + overview.AnalystTargetPrice}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">Market Cap</span> <span>{"$" + shortNumber(overview.MarketCapitalization)}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">P/E ratio</span> <span>{overview.PERatio}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">EPS</span> <span>{"$" + overview.EPS}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">DividendPerShare</span> <span>{"$" + overview.DividendPerShare}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">DividendYield</span> <span>{overview.DividendYield + "%"}</span>
                    </div>
                    <div className="d-flex p-2 flex-row justify-content-between">
                        <span className="text-muted">EBITDA</span> <span>{overview.EBITDA}</span>
                    </div>

                </div>
            </>}
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
