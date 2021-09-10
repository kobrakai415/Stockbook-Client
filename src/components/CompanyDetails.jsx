import React from 'react';
import shortNumber from '@pogix3m/short-number';
import Plot from 'react-plotly.js';
import { Col, Spinner } from 'react-bootstrap';
import { connect } from "react-redux"
import PostsSection from './PostsSection.jsx';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({

})

const CompanyDetails = ({ data: { overview, dailyChartData, chartXValues, chartYValues, yesterdaysClosing } }) => {


    return (
        <Col className="mb-3" xs={12} lg={8}>

            {dailyChartData && overview && yesterdaysClosing ? <>


                <div className="black-bg p-4 mb-3">

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
                            title: `${overview.Name}`,
                            autosize: true,

                        }}
                        useResizeHandler={true}
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />



                </div>

                <div className="black-bg p-4">
                    <h3>Company details</h3>


                    <p>{overview.Description}</p>

                    <h3>Key Ratios</h3>
                    <div className="d-flex flex-column">
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted underline">Analyst Price Target</span> <span>{"$" + overview.AnalystTargetPrice}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">Market Cap</span> <span>{"$" + shortNumber(overview.MarketCapitalization)}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">P/E ratio</span> <span>{overview.PERatio}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">EPS</span> <span>{"$" + overview.EPS}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">DividendPerShare</span> <span>{"$" + overview.DividendPerShare}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">DividendYield</span> <span>{overview.DividendYield + "%"}</span>
                        </div>
                        <div className="d-flex p-2 flex-row justify-content-between">
                            <span className="border-bottom text-muted">EBITDA</span> <span>{overview.EBITDA}</span>
                        </div>

                    </div>
                </div>


                <PostsSection />
            </> : <Spinner type="primary"></Spinner>}
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
