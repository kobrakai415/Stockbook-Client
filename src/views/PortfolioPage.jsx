import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionsTable from '../components/PositionsTable';
import PortfolioStats from '../components/PortfolioStats';
import PieChart from '../components/PieChart';
import ProgressChart from '../components/ProgressChart';



const PortfolioPage = () => {
    const portfolio = useSelector((state) => state.data.user?.portfolio)


    useEffect(() => {
        console.log(portfolio)
    }, [portfolio])


    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <PortfolioStats />
            <PositionsTable />
            <Row className="mx-0">
                <PieChart />
                <ProgressChart />
            </Row>
        </Col>
    );
}

export default PortfolioPage;
