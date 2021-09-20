import { useEffect } from 'react';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router';


const ApiUrl = process.env.REACT_APP_MY_API



const Banner = ({ }) => {
    const history = useHistory()
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()



    useEffect(() => {
        console.log(data)

    }, []);

    const logout = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/users/logout`)
            console.log(res)
            if (res.status === 205) {
                console.log("logged out")
                history.push("/login")
                dispatch({
                    type: "SET_AUTHENTICATED",
                    payload: false
                })
                dispatch({
                    type: "LOGOUT",
                    payload:  {
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
        } catch (error) {
            console.log(error)
        }
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (

        <Col md={12} className="p-3 banner">
            <div className="d-flex p-2  justify-content-between">
                {data.user?.balance && <>
                    <div className="light-bg p-3 d-flex justify-content-center align-items-center">
                        <h3>$tockBook</h3>
                    </div>
                    <div className="p-2 d-flex light-bg align-items-center">

                        <div >
                            {data.user?.balance ? <>

                                {/* {data.unrealized ? <span className={(data.unrealized < 0 ? "negative-percentage-containergative" : "positive-percentage-container ") + " p-2"} >P&L: {(data.unrealized < 0 ? "-" : "+") + "$" + Math.abs(data.unrealized).toFixed(2)}</span> */}

                                <span>Balance: {"$" + numberWithCommas(data.user.balance.toFixed(2))}</span>

                            </> : null}

                        </div>

                        <div >

                            <DropdownButton id="dropdown-basic-button" className="p-2   button-small btn-md-lg" size="sm" variant="dark" title={data.user.name + " " + data.user.surname}>

                                <Dropdown.Item> <CgProfile /> My account</Dropdown.Item>
                                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                            </DropdownButton>
                        </div>
                    </div>
                </>}
            </div>
        </Col>
    );
}

export default Banner
