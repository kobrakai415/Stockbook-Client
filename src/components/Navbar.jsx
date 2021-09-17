import { Col } from 'react-bootstrap';
import { AiFillEye, AiFillPieChart, AiTwotoneHome } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ location: { pathname } }) => {


    return (
        <Col className="p-3 sidebar" xs={12} md={3} lg={2}>
            <div className="nav-links justify-content-center p-2 d-flex flex-row flex-md-column">

                <Link to="/" className={"px-3 py-3 d-flex align-items-center " + (pathname === "/" || pathname.includes("/stock") ? "selected" : "")}>
                    <div>
                        <AiTwotoneHome />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Home</span>
                </Link>
                <Link to="/watchlists" className={"px-3 py-3 d-flex align-items-center " + (pathname === "/watchlists" ? "selected" : "")}>
                    <div>
                        <AiFillEye />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Watchlists</span>
                </Link>
                <Link to="/portfolio" className={"px-3 py-3 d-flex align-items-center " + (pathname === "/portfolio" ? "selected" : "")}>
                    <div>
                        <AiFillPieChart />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Portfolio</span>
                </Link>
                <Link to="/" className={"px-3 py-3 d-flex align-items-center navbar-divider " + (pathname === "/network" ? "selected" : "")}>
                    <div>
                        <FaUserFriends />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Network</span>
                </Link>
                <Link to="/" className={"px-3 py-3 d-flex align-items-center "}>
                    <div>
                        <BiHelpCircle />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Help</span>
                </Link>
                <Link to="/" className={"px-3 py-3 d-flex align-items-center "}>
                    <div>
                        <RiLogoutBoxFill />
                    </div>
                    <span className="ms-2 d-none d-sm-block">Logout</span>
                </Link>

            </div>
        </Col>
    );
}

export default withRouter(Navbar);
