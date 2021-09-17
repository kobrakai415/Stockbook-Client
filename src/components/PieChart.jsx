import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const PieChart = () => {
    const { user: { portfolio }, invested } = useSelector(state => state.data)
    const [values, setValues] = useState([]);
    const [labels, setLabels] = useState([]);


    useEffect(() => {

        let valuesArray = portfolio.map(item => ((item.shares * item.purchasePrice) / invested) * 100)
        setValues(valuesArray)

        let labelsArray = portfolio.map(item => {
            return item.ticker
        })
        setLabels(labelsArray)

    }, [portfolio, invested])

    return (
        <>
            {
                values.length > 0 && labels.length > 0 ?
                    <>
                        <h1>Statistics</h1>
                        <Col className=" " xs={6}>
                            <div className="light-bg  plotly-graph">
                                <Plot
                                    data={[{
                                        values: values,
                                        labels: labels,
                                        hole: 0.4,
                                        type: 'pie'
                                    }]}
                                    layout={{
                                        title: "Portfolio Split",
                                        autosize: true,
                                        plot_bgcolor: 'rgb(37, 35, 61)',
                                        paper_bgcolor: 'rgb(37, 35, 61)',
                                        font: {
                                            family: "Work Sans, sans-serif",
                                            size: "15",
                                            color: "rgb(102,101,121)"
                                        },
                                    }}
                                    useResizeHandler={true}
                                    style={{ maxHeight: "100%", maxWidth: "100%" }}

                                />
                            </div>
                        </Col>
                    </> : null
            }

        </>

    );
}

export default PieChart;
