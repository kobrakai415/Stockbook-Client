import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionsTable from '../components/PositionsTable';
import PortfolioStats from '../components/PortfolioStats';



const PortfolioPage = () => {
    const portfolio = useSelector((state) => state.data.user?.portfolio)


    useEffect(() => {
        console.log(portfolio)
    }, [portfolio])




    return (
        <Col className="height-90 p-5" xs={8} md={9} lg={10}>
            <PortfolioStats />

            <PositionsTable portfolio={portfolio} />
        </Col>
    );
}

export default PortfolioPage;
