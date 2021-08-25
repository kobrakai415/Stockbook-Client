import {useEffect} from 'react';
import { Col } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { connect } from 'react-redux'

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => ({

})

const Banner = ({ data }) => {

    useEffect(() => {
        console.log(data)
       
    }, []);

    return (
        
        <Col md={12} className="banner">
            <div className="d-flex justify-content-between">
                {data.user?.balance && <>
                    <h3>StockBook</h3>

                    <div className="p-2 d-flex align-items-center">

                        {data.user?.balance &&
                            <span>P&L {"$" + data.user.balance}</span>
                        }

                        <div>
                            <CgProfile />
                            <span className="ms-2">My account</span>
                        </div>
                    </div>
                </>}
            </div>
        </Col>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
