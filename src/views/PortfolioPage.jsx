import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionsTable from '../components/PositionsTable';
import PortfolioStats from '../components/PortfolioStats';
import Charts from '../components/PieChart';



const PortfolioPage = () => {
    const portfolio = useSelector((state) => state.data.user?.portfolio)


    useEffect(() => {
        console.log(portfolio)
    }, [portfolio])


    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <PortfolioStats />
            <PositionsTable />
            <Charts/>
        </Col>
    );
}

export default PortfolioPage;
