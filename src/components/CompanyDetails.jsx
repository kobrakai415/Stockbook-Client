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
        <>

            {dailyChartData && overview && yesterdaysClosing ? <>


                <div className="light-bg plotly-graph mb-4">

                    <Plot

                        data={[
                            {
                                x: chartXValues,
                                y: chartYValues,
                                type: 'scatter',
                                mode: 'lines',
                                marker: { color: 'rgba(183,156,81, 0.9)' },
                            },

                        ]}
                        layout={{
                            title: `${overview.Name}`,
                            autosize: true,
                            plot_bgcolor: 'rgb(37, 35, 61)',
                            paper_bgcolor: 'rgb(37, 35, 61)',
                            font: {
                                family: "Work Sans, sans-serif",
                                size: "15",
                                color: "rgb(102,101,121)"
                            },
                            xaxis: {
                                showgrid: true,
                                gridwidth: "1",
                                gridcolor: "rgba(255,255, 255, 0.07)",
                            },
                            yaxis: {
                            tickprefix: '$'
                        }
                           
                        }}
                        useResizeHandler={true}
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />



                </div>

                    <h1>Company details</h1>
                <div className="light-bg p-4 mb-4">


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
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
