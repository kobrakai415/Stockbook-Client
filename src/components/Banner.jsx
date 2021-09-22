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
            <div className="d-flex  justify-content-between">
                {data.user?.balance && <>
                    <div className=" d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 512 512" width="60"><g id="Flat"><path d="m432 112v-88h-88v32h32l-96 96-80-80-120 120 24 24 96-96 80 80 120-120v32z" fill="#f35244" /><path d="m40 424h80v32h-80z" fill="#fca713" /><path d="m104 456h80v32h-80z" fill="#fca713" /><path d="m104 392h80v32h-80z" fill="#fca713" /><path d="m200 424h80v32h-80z" fill="#fca713" /><g fill="#f4c067"><path d="m184 456h80v32h-80z" /><path d="m184 392h80v32h-80z" /><path d="m120 424h80v32h-80z" /><path d="m120 360h80v32h-80z" /><path d="m24 456h80v32h-80z" /><path d="m24 392h80v32h-80z" /></g><path d="m264 424h184v64h-184z" fill="#80c326" /><path d="m426.56543 424a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 424h32v64h-32z" fill="#fca713" /><path d="m296 360h184v64h-184z" fill="#80c326" /><path d="m458.56543 360a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m368 360h32v64h-32z" fill="#fca713" /><path d="m264 296h184v64h-184z" fill="#80c326" /><path d="m426.56543 296a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709" /><path d="m336 296h32v64h-32z" fill="#fca713" /><path d="m240 392h24v32h-24z" fill="#f5b142" /><path d="m240 424h24v32h-24z" fill="#ed8515" /><path d="m240 456h24v32h-24z" fill="#f5b142" /><path d="m160 456h24v32h-24z" fill="#ed8515" /><path d="m176 424h24v32h-24z" fill="#fca713" /><path d="m160 392h24v32h-24z" fill="#ed8515" /><path d="m80 456h24v32h-24z" fill="#f5b142" /><path d="m96 424h24v32h-24z" fill="#ed8515" /><path d="m80 392h24v32h-24z" fill="#f5b142" /><path d="m184 360h24v32h-24z" fill="#f5b142" /><path d="m160 208h32v128h-32z" fill="#4db7e5" /><path d="m240 232h32v40h-32z" fill="#4db7e5" /><path d="m320 208h32v64h-32z" fill="#4db7e5" /><path d="m400 144h32v128h-32z" fill="#4db7e5" /><path d="m112 248h-32v120l32-32z" fill="#4db7e5" /></g></svg>




                        <h1 className="mb-0 ms-2 logo-title">$tockBook</h1>

                    </div>
                    <div className=" p-2 d-flex align-items-center">

                        {data.user?.balance ? <div className="p-2 d-flex align-items-center" >

                            {/* {data.unrealized ? <span className={(data.unrealized < 0 ? "negative-percentage-containergative" : "positive-percentage-container ") + " p-2"} >P&L: {(data.unrealized < 0 ? "-" : "+") + "$" + Math.abs(data.unrealized).toFixed(2)}</span> */}




                            <svg xmlns="http://www.w3.org/2000/svg" className="mb-2" height="25" viewBox="0 0 512 512" width="25"><path d="m196 169.601562c-5.097656 0-10.5 0-15.902344.597657h-.898437c-98.398438 9.300781-179.199219 102.703125-179.199219 206.800781 0 120.902344 112.300781 135 196 135 83.101562 0 180-12.597656 193.5-111.898438 14.097656-116.402343-78.300781-230.5-193.5-230.5zm0 0" fill="#ff637b" /><path d="m389.5 400.101562c-13.5 99.300782-110.398438 111.898438-193.5 111.898438v-342.398438c115.199219 0 207.597656 114.097657 193.5 230.5zm0 0" fill="#e63950" /><path d="m300.097656 49.800781-30 91h-148.195312l-30-91c-1.804688-4.5-.902344-9.601562 1.796875-13.5 3-3.898437 7.5-6.300781 12.300781-6.300781h47.699219c6-17.402344 22.800781-30 42.300781-30s36 12.597656 42.300781 30h47.699219c4.800781 0 9.300781 2.402344 12.300781 6.300781 2.699219 3.898438 3.601563 9 1.796875 13.5zm0 0" fill="#ff637b" /><path d="m300.097656 49.800781-30 91h-74.097656v-140.800781c19.5 0 36 12.597656 42.300781 30h47.699219c4.800781 0 9.300781 2.402344 12.300781 6.300781 2.699219 3.898438 3.601563 9 1.796875 13.5zm0 0" fill="#e63950" /><path d="m240.699219 381.5c0 19.5-12.296875 35.699219-29.699219 42v13.5c0 8.402344-6.597656 15-15 15s-15-6.597656-15-15v-13.199219c-17.402344-6.300781-30.300781-22.800781-30.300781-42.300781 0-8.398438 6.898437-15 15-15 8.402343 0 15 6.601562 15 15 0 8.101562 6.898437 15 15 15h.300781c8.402344-.300781 14.699219-6.898438 14.699219-15 0-8.398438-6.296875-14.699219-14.699219-15h-.300781c-24.597657 0-45-20.402344-45-45 0-19.800781 12.902343-36.300781 30.300781-42.300781v-22.199219c0-8.402344 6.597656-15 15-15s15 6.597656 15 15v22.199219c17.402344 6.300781 29.699219 22.800781 29.699219 42.300781 0 8.101562-6.597657 15-15 15-8.101563 0-15-6.898438-15-15 0-8.398438-6.296875-14.699219-14.699219-15h-.300781c-8.101563 0-15 6.601562-15 15 0 8.101562 6.898437 15 15 15h.300781c24.902344.300781 44.699219 20.101562 44.699219 45zm0 0" fill="#ffda2d" /><path d="m512 302c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d" /><path d="m512 302c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00" /><path d="m512 362c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00" /><path d="m512 362c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#ff9100" /><path d="m512 422c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d" /><path d="m512 422c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00" /><path d="m512 482c0 16.5-13.5 30-30 30h-151c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00" /><path d="m512 482c0 16.5-13.5 30-30 30h-76v-60h76c16.5 0 30 13.5 30 30zm0 0" fill="#ff9100" /><path d="m301 151c0 16.5-13.5 30-30 30h-150c-16.5 0-30-13.5-30-30s13.5-30 30-30h150c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d" /><g fill="#fdbf00"><path d="m240.699219 381.5c0 19.5-12.296875 35.699219-29.699219 42v13.5c0 8.402344-6.597656 15-15 15v-55.5c8.402344-.300781 14.699219-6.898438 14.699219-15 0-8.398438-6.296875-14.699219-14.699219-15v-30c24.902344.300781 44.699219 20.101562 44.699219 45zm0 0" /><path d="m240.699219 321.5c0 8.101562-6.597657 15-15 15-8.101563 0-15-6.898438-15-15 0-8.398438-6.296875-14.699219-14.699219-15v-64.5c8.402344 0 15 6.597656 15 15v22.199219c17.402344 6.300781 29.699219 22.800781 29.699219 42.300781zm0 0" /><path d="m301 151c0 16.5-13.5 30-30 30h-75v-60h75c16.5 0 30 13.5 30 30zm0 0" /></g></svg>
                            <span className="ms-1 mb-0" > Cash: {"$" + numberWithCommas(data.user.balance.toFixed(2))}</span>

                        </div> : null}


                        <div >

                            <DropdownButton id="dropdown-basic-button" className="p-2 button-small btn-md-lg" size="sm" variant="dark" title={data.user.name + " " + data.user.surname}>

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
