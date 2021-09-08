import { Col } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineHome, AiOutlinePieChart } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ location: {pathname}}) => {
    

    return (
        <Col xs={4} md={3} lg={2}>
            <div className="nav-links d-flex flex-column">

                <Link to="/" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/" ? "selected" : null)}>
                    <AiOutlineHome />
                    <span className="ms-2">Home</span>
                </Link>
                <Link to="/watchlists" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/watchlists" ? "selected" : null)}>
                    <AiOutlineEye />
                    <span className="ms-2">Watchlists</span>
                </Link>
                <Link to="/portfolio" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/portfolio" ? "selected" : null)}>
                    <AiOutlinePieChart />
                    <span className="ms-2">My Portfolio</span>
                </Link>
                <Link to="/" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/network" ? "selected" : null)}>
                    <FaUserFriends />
                    <span className="ms-2">Network</span>
                </Link>


            </div>
        </Col>
    );
}

export default withRouter(Navbar);
