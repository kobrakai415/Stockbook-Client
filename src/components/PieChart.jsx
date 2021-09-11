import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const Charts = () => {
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
        <Row>
            {values.length > 1 && labels.length > 1 &&
                <Col className="black-bg p-4   " xs={6}>

                    <Plot
                        data={[{
                            values: values,
                            labels: labels,
                            type: 'pie'
                        }]}
                        layout={{
                            title: "Portfolio Split",
                            bgcolor: "black",
                            autosize: true,
                            plot_bgcolor: "#343a40"
                        }}
                        useResizeHandler={true}
                        style={{ maxHeight: "100%", maxWidth: "100%" }}

                    />
                </Col>
            }

        </Row>
    );
}

export default Charts;
