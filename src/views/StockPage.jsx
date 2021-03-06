import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NewsPanel from '../components/NewsPanel';
import CompanyDetails from '../components/CompanyDetails';
import PriceBoard from '../components/PriceBoard';
import { connect } from "react-redux"
import { fetchStockOverview, fetchStokDailyChart, setLivePrice, setQuotedPrice, setYesterdaysClosing } from '../redux/actions';


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    fetchOverview: (symbol) => dispatch(fetchStockOverview(symbol)),
    fetchDailyChart: (symbol) => dispatch(fetchStokDailyChart(symbol)),
    changeQuotedPrice: (price) => dispatch(setQuotedPrice(price)),
    changeLivePrice: (price) => dispatch(setLivePrice(price))
})

const StockPage = ({ fetchOverview, fetchDailyChart, data: { yesterdaysClosing } }) => {


    const { symbol } = useParams()

    useEffect(() => {
        fetchOverview(symbol)
        fetchDailyChart(symbol)
    }, [])


    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>
                <Col className="mb-3" xs={12} lg={8}>
                <h1>Instrument</h1>
                    <PriceBoard symbol={symbol} />

                    {/* //Comapny details and posts section: */}

                    <CompanyDetails />

                </Col>

                <Col className="news-panel" md={12} lg={4}>
                    <NewsPanel symbol={symbol} />
                </Col>
            </Row>

        </Col >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage)

