import { Col } from 'react-bootstrap';
import { AiFillEye, AiFillPieChart, AiTwotoneHome } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const ApiUrl = process.env.REACT_APP_MY_API


const Navbar = ({ location: { pathname }, history }) => {

    const dispatch = useDispatch()

    const logout = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/users/logout`)
            console.log(res)
            if (res.status === 205) {
                console.log("logged out")
                dispatch({
                    type: "SET_AUTHENTICATED",
                    payload: false
                })
                dispatch({
                    type: "LOGOUT",
                    payload: {
                        user: {
                            startingBalance: 0,
                            balance: 0,
                            portfolio: [],
                            watchlists: [{
                                stocks: [],
                                name: "",
                                _id: ""
                            },]
                        },
                        overview: null,
                        yesterdaysClosing: null,
                        dailyChartData: {},
                        percentageChange: null,
                        chartXValues: null,
                        chartYValues: null,
                        authenticated: false,
                        unrealized: 0

                    }
                })
            }

            history.push("/login")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Col className="sidebar p-3 ps-0" xs={12} md={3} lg={2}>

            <div className="nav-links justify-content-center  d-flex flex-row flex-md-column">

                <Link to="/" className={"ps-4 py-3 d-flex align-items-center " + (pathname === "/" || pathname.includes("/stock") ? "selected" : "")}>
                    <div>
                        <AiTwotoneHome />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Home</span>
                </Link>
                <Link to="/watchlists" className={"ps-4 py-3 d-flex align-items-center " + (pathname === "/watchlists" ? "selected" : "")}>
                    <div>
                        <AiFillEye />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Watchlists</span>
                </Link>
                <Link to="/portfolio" className={"ps-4 py-3 d-flex align-items-center " + (pathname === "/portfolio" ? "selected" : "")}>
                    <div>
                        <AiFillPieChart />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Portfolio</span>
                </Link>
                <Link to="/network" className={"ps-4 py-3 d-flex align-items-center " + (pathname === "/network" ? "selected" : "")}>
                    <div>
                        <FaUserFriends />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Network</span>
                </Link>

                <div className="faded-line mx-3"></div>
                <Link to="/" className={"ps-4 py-3 d-flex align-items-center d-none d-md-flex"}>
                    <div>
                        <BiHelpCircle />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Help</span>
                </Link>
                <div onClick={logout} className={" logout ps-4 py-3 d-flex align-items-center d-none d-md-flex"}>
                    <div>
                        <RiLogoutBoxFill />
                    </div>
                    <span className="ms-3 d-none d-sm-block">Logout</span>
                </div>

            </div>
        </Col>
    );
}

export default withRouter(Navbar);
