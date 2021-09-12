import { Col } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineHome, AiOutlinePieChart } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ location: { pathname } }) => {


    return (
        <Col className="p-3 sidebar" xs={12} md={3} lg={2}>
            <div className="nav-links justify-content-center black-bg p-4 d-flex flex-row flex-md-column">

                <Link to="/" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/" || pathname.includes("/stock") ? "selected" : null)}>
                    <div>
                        <AiOutlineHome />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Home</span>
                </Link>
                <Link to="/watchlists" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/watchlists" ? "selected" : null)}>
                    <div>
                        <AiOutlineEye />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Watchlists</span>
                </Link>
                <Link to="/portfolio" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/portfolio" ? "selected" : null)}>
                    <div>
                        <AiOutlinePieChart />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Portfolio</span>
                </Link>
                <Link to="/" className={"px-3 py-2 d-flex align-items-center " + (pathname === "/network" ? "selected" : null)}>
                    <div>
                        <FaUserFriends />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Network</span>
                </Link>


            </div>
        </Col>
    );
}

export default withRouter(Navbar);
