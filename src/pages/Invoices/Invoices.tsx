
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import './Invoices.css'
import { Link } from "react-router-dom";

const Invoices = () => {
    const activeFilters: { [key: string]: boolean } = {};

    const handleFilterClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const filter = e.currentTarget.classList[1];
        if (activeFilters[filter]) {
            e.currentTarget.classList.remove('active');
            delete activeFilters[filter];
        } else {
            e.currentTarget.classList.add('active');
            activeFilters[filter] = true;
        }
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Your Invoices</h2>
                    <p>Detailed list of all your invoices and payments.</p>
                </div>
            </div>
            <div className="col-12">
                <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center gap-3">
                        <div className="search-box w-100">
                            <span><FaSearch /></span>
                            <input type="text" placeholder="Search invoices" className="form-control w-100" />

                        </div>
                        <div className="filter-area">
                            <p className="mb-0 me-2">Filter by:</p>
                            <div className="filter-options">

                                <div className="filter-btn danger unpaid me-2" onClick={handleFilterClick}><span className="bg-danger dot me-2"></span> Unpaid</div>
                                <div className="filter-btn success paid" onClick={handleFilterClick}><span className="bg-success dot me-2"></span> Paid</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive overflow-auto">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>INVOICE ID</th>
                                        <th>PLAN</th>
                                        <th>STATUS</th>
                                        <th>TYPE</th>
                                        <th>PAYMENT STATUS</th>
                                        <th>AMOUNT</th>
                                        <th>BANDWIDTH</th>
                                        <th>PROCESSOR</th>
                                        <th>DATE & TIME</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>670c2de9fdfd46293cdd3710</td>
                                        <td>US 9 ISP Proxies</td>
                                        <td><span className="badge bg-danger">Expired</span></td>
                                        <td>ISP</td>
                                        <td><span className="badge bg-success"><span className="bg-success dot me-2"></span>Paid</span></td>
                                        <td>$20.25</td>
                                        <td>Unlimited</td>
                                        <td>CRYPTOCURRENCY</td>
                                        <td>Oct 13, 2024 23:30</td>
                                        <td>
                                            <Link to="/invoice/670c2de9fdfd46293cdd3710">
                                                View <IoIosArrowForward />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>670c2de9fdfd46293cdd3710</td>
                                        <td>US 9 ISP Proxies</td>
                                        <td><span className="badge bg-danger">Expired</span></td>
                                        <td>ISP</td>
                                        <td><span className="badge bg-success"><span className="bg-success dot me-2"></span>Paid</span></td>
                                        <td>$20.25</td>
                                        <td>Unlimited</td>
                                        <td>CRYPTOCURRENCY</td>
                                        <td>Oct 13, 2024 23:30</td>
                                        <td>
                                            <Link to="/invoice/670c2de9fdfd46293cdd3710">
                                                View <IoIosArrowForward />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>670c2de9fdfd46293cdd3710</td>
                                        <td>US 9 ISP Proxies</td>
                                        <td>Expired</td>
                                        <td>ISP</td>
                                        <td>Paid</td>
                                        <td>$20.25</td>
                                        <td>Unlimited</td>
                                        <td>CRYPTOCURRENCY</td>
                                        <td>Oct 13, 2024 23:30</td>
                                        <td>
                                            <Link to="/invoice/670c2de9fdfd46293cdd3710">
                                                View <IoIosArrowForward />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center align-items-center">
                            <button className="btn btn-secondary me-2">
                                <MdOutlineKeyboardDoubleArrowLeft />
                            </button>
                            <p className="mb-0">1 of 10</p>
                            <button className="btn btn-secondary ms-2">
                                <MdOutlineKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoices