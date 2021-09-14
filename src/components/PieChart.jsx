import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const PieChart = () => {
    const portfolio = useSelector(state => state.data.user.portfolio)
    const [values, setValues] = useState([]);
    const [labels, setLabels] = useState([]);


    useEffect(() => {
        let totalShares = portfolio.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.shares
        }, 0)

        console.log(totalShares)
        let valuesArray = portfolio.map(item => (item.shares / totalShares) * 100)
        setValues(valuesArray)
        console.log(valuesArray)
        let labelsArray = portfolio.map(item => {
            return item.ticker
        })
        setLabels(labelsArray)
        console.log(labelsArray)


    }, [portfolio])

    return (
        <Row className="mx-0">
        <h1>Statistics</h1>
            {values.length > 1 && labels.length > 1 &&
                <Col className="light-bg " xs={6}>
                <div className="plotly-graph">
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
            }

        </Row>
    );
}

export default PieChart;
