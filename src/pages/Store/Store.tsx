import { IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Store.css';
import { useState } from 'react';
import { products, plans } from '../../data/plansData.ts';

const Store = () => {
    const [selectedFilter, setSelectedFilter] = useState('resi_starter');

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center mb-4">
                <div className="store-filter-wrapper">
                    {
                        Object.keys(products).map((key, index) => (
                            <button key={index} className={`btn ${selectedFilter === key ? 'active' : ''}`} onClick={() => setSelectedFilter(key)}>{products[key].product_name}</button>
                        ))
                    }
                </div>
            </div>
            {
                plans.map((plan: { price: number; bandwidth: number; product_id: string; plan_id: string }, index: number) => (
                    plan.product_id !== selectedFilter ? null : (

                        <div className="col-12 col-md-6" key={index}>
                            <div className="card store-card mb-3 p-3">
                                <div className="product-title d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Residential <span>{plan.bandwidth}GB</span></h5>
                                    <div className="price"><span><FaDollarSign /></span> {plan.price}</div>
                                </div>
                                <div className="product-dsc">
                                    Ideal proxy for any use case & purpose. By accessing our network 10M+ IP
                                    pool non-subnet linked, bans and blocks are non-existent.
                                </div>
                                <div className="product-features">
                                    <ul>
                                        <li><span><FaCheck /></span>10M+ Real Resi Peers</li>
                                        <li><span><FaCheck /></span>IP & User:Pass Authentication</li>
                                        <li><span><FaCheck /></span>Country, Region, City ISP Targeting</li>
                                        <li><span><FaCheck /></span>Rotating And Sticky</li>
                                        <li><span><FaCheck /></span>Unlimited Concurrent Connections</li>
                                        <li><span><FaCheck /></span>HTTPS & SOCKS5 Protocol Supported</li>
                                    </ul>
                                </div>
                                <div className="product-buy">
                                    <Link className="btn btn-primary w-100" to={`/checkout/${plan.plan_id}`}>Buy Now <IoIosArrowForward /></Link>
                                    <Link to="/tos" className="terms">Terms & Conditions Apply</Link>
                                </div>
                            </div>
                        </div>
                    )
                ))
            }


        </div>
    )
}

export default Store