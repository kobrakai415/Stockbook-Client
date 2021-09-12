import { useEffect } from 'react';
import { Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { connect } from 'react-redux'
import axios from 'axios'

const ApiUrl = process.env.REACT_APP_MY_API

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({

})

const Banner = ({ data }) => {

    useEffect(() => {
        console.log(data)

    }, []);

    const logout = async () => {
        try {
            const res = await axios.post(`${ApiUrl}/users/logout`)
            if (res.statusCode === 205) {
                console.log("logged out")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Col md={12} className="p-3 banner">
            <div className="d-flex p-4 black-bg justify-content-between">
                {data.user?.balance && <>
                    <div className="dark-bg p-3 d-flex justify-content-center align-items-center">
                        <h3>$tockBook</h3>
                    </div>
                    <div className="p-2 dark-bg d-flex align-items-center">

                    <div className="dark-bg p-2">
                    {data.user?.balance &&
                        <span>Cash {"$" + data.user.balance.toFixed(2)}</span>
                    }
                    </div>

                        <div>

                            <DropdownButton id="dropdown-basic-button" className="m-2 button-small" size="sm" variant="dark" title={data.user.name + "" + data.user.surname}>

                                <Dropdown.Item > <CgProfile /> My account</Dropdown.Item>
                                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

                            </DropdownButton>
                        </div>
                    </div>
                </>}
            </div>
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
