import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

const ProgressChart = () => {


    const { user: { progress }, netUnrealized } = useSelector(state => state.data)
    const [xValues, setXValues] = useState([])
    const [yValues, setYValues] = useState([])

    useEffect(() => {

        let xVals = [...progress.map(item => item.date), new Date().toLocaleDateString("en-GB")]
        setXValues(xVals)
        let yVals = [...progress.map(item => item.balance), netUnrealized]
        setYValues(yVals)

    }, [progress, netUnrealized])

    return (
        <Col className="px-0 pe-lg-0 ps-lg-2" xs={12} lg={6}>
            {xValues.length > 0 && yValues.length > 0 ? <div className=" light-bg plotly-graph">
                <Plot
                    data={[
                        {
                            x: xValues,
                            y: yValues,
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'rgba(183,156,81, 0.9)' },
                        },

                    ]}

                    layout={{
                        title: `Progress`,
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
                            tickformat: "%d/%m",
                        },
                        yaxis: {
                            tickprefix: '$'
                        }

                    }}
                    useResizeHandler={true}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}>

                </Plot>
            </div> :
                null}
        </Col >
    );
}

export default ProgressChart;
