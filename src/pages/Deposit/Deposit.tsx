import { IoIosArrowForward } from "react-icons/io";
import StripeLogo from '../../assets/stripe_logo.svg';
import CryptomusLogo from '../../assets/cryptomus_logo.svg';

import './Deposit.css';

const Deposit = () => {
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Deposit Balance</h2>
                    <p>Add balance to your account, using cryptocurrency or card payment.</p>
                </div>
            </div>
            <div className="col-12 col-md-7">
                <div className="card mb-3">
                    <div className="card-body">
                        <form action="" className="deposit-form">
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="amount">Enter Topup Amount</label>
                                <input type="text" className="form-control" id="amount" placeholder="Enter amount" />
                            </div>
                            {/* <div className="form-group mb-3">
                                <label className="form-label" htmlFor="payment-method">Payment Method</label>
                                <select name="payment-method" id="payment-method" className="form-control">
                                    <option value="card">Card Payment</option>
                                    <option value="crypto">Cryptocurrency</option>
                                </select>
                            </div>
                            <div className="form-group pt-2">
                                <button className="btn btn-primary w-100">Deposit</button>
                            </div> */}
                            <div className="form-group mb-2">
                                <button className="btn btn-primary w-100 btn-crypto">Add Balance with Cryptocurrency <IoIosArrowForward /></button>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary w-100 btn-stripe">Add Balance with Stripe <IoIosArrowForward /></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="payment-logos">
                    <img src={CryptomusLogo} alt="Cryptomus" className="cryptomus-logo" />
                    <div className="divider"></div>
                    <img src={StripeLogo} alt="Stripe" className="stripe-logo" />
                    <div className="badge bg-stripe ms-2">+5%</div>

                </div>
            </div>
        </div>
    )
}

export default Deposit