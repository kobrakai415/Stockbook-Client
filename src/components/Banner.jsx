import { useEffect } from 'react';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router';
import logo from '../assets/logo.png'
import { FcCandleSticks } from 'react-icons/fc'

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
                    <div className=" d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 512 512" width="60"><g id="Flat"><path d="m432 112v-88h-88v32h32l-96 96-80-80-120 120 24 24 96-96 80 80 120-120v32z" fill="#f35244"/><path d="m40 424h80v32h-80z" fill="#fca713"/><path d="m104 456h80v32h-80z" fill="#fca713"/><path d="m104 392h80v32h-80z" fill="#fca713"/><path d="m200 424h80v32h-80z" fill="#fca713"/><g fill="#f4c067"><path d="m184 456h80v32h-80z"/><path d="m184 392h80v32h-80z"/><path d="m120 424h80v32h-80z"/><path d="m120 360h80v32h-80z"/><path d="m24 456h80v32h-80z"/><path d="m24 392h80v32h-80z"/></g><path d="m264 424h184v64h-184z" fill="#80c326"/><path d="m426.56543 424a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m336 424h32v64h-32z" fill="#fca713"/><path d="m296 360h184v64h-184z" fill="#80c326"/><path d="m458.56543 360a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m368 360h32v64h-32z" fill="#fca713"/><path d="m264 296h184v64h-184z" fill="#80c326"/><path d="m426.56543 296a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m336 296h32v64h-32z" fill="#fca713"/><path d="m240 392h24v32h-24z" fill="#f5b142"/><path d="m240 424h24v32h-24z" fill="#ed8515"/><path d="m240 456h24v32h-24z" fill="#f5b142"/><path d="m160 456h24v32h-24z" fill="#ed8515"/><path d="m176 424h24v32h-24z" fill="#fca713"/><path d="m160 392h24v32h-24z" fill="#ed8515"/><path d="m80 456h24v32h-24z" fill="#f5b142"/><path d="m96 424h24v32h-24z" fill="#ed8515"/><path d="m80 392h24v32h-24z" fill="#f5b142"/><path d="m184 360h24v32h-24z" fill="#f5b142"/><path d="m160 208h32v128h-32z" fill="#4db7e5"/><path d="m240 232h32v40h-32z" fill="#4db7e5"/><path d="m320 208h32v64h-32z" fill="#4db7e5"/><path d="m400 144h32v128h-32z" fill="#4db7e5"/><path d="m112 248h-32v120l32-32z" fill="#4db7e5"/></g></svg>
                        
                    
            
                        
                        <h1 className="mb-0 ms-2">   $tockBook</h1>
                        {/* <img height={50} src={logo} /> */}
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
