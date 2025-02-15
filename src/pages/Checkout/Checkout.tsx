import { IoIosArrowForward } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import { useState } from 'react';
import axios from "axios";
import { products, plans } from '../../data/plansData.ts';

import './Checkout.css'
import { useParams } from 'react-router-dom';

const Checkout = () => {
    const [error, setError] = useState('');
    const { plan_id } = useParams();


    //check if the plan_id is valid
    if (plan_id && !plans.some((plan: { plan_id: string }) => plan.plan_id === plan_id)) {
        //go back to the store
        window.history.pushState({}, '', '/store');
    }

    const handleBuy = async (plan_id: string) => {

        //call the API with the data
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/plans/buy', {
                plan_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success === false) {
                return setError(response.data.message);
            }

            window.location.href = `/plans/${response.data.plan_id}`;

        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
                return setError(err.response.data.message);
            }
            setError('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="row">

            <div className="col-12 d-flex justify-content-center">
                <div className="page-title text-center">
                    <h2>Checkout</h2>
                    <p>Complete your purchase</p>
                </div>
            </div>
            <div className="col-12 col-md-6 mx-auto">
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                {plans.filter((plan) => plan.plan_id === plan_id).map((plan) => (

                    <div className="card checkout-card">
                        <div className="checkout-product-title">
                            <h3>{products[plan.product_id].product_name} <span>{plan.bandwidth} GB</span></h3>
                        </div>
                        <div className="checkout-product-description">
                            <p>Ideal proxy for any use case & purpose. By accessing our network 10M+ IP
                                pool non-subnet linked, bans and blocks are non-existent.</p>
                        </div>
                        <div className="checkout-product-details">
                            <div className="product-info-row">
                                <div className="product-info-label">Price</div>
                                <div className="product-info-value"><span><FaDollarSign /></span>{plan.price}</div>
                            </div>
                            <div className="product-info-row">
                                <div className="product-info-label">Bandwidth</div>
                                <div className="product-info-value">{plan.bandwidth} GB</div>
                            </div>
                            <div className="product-info-row">
                                <div className="product-info-label">Proxy Type</div>
                                <div className="product-info-value">{products[plan.product_id].product_name}</div>
                            </div>
                            <div className="product-info-row">
                                <div className="product-info-label">Duration</div>
                                <div className="product-info-value">3 Months</div>
                            </div>
                            <div className="product-info-row">
                                <div className="product-info-label">Threads</div>
                                <div className="product-info-value">Unlimited</div>
                            </div>
                        </div>
                        <div className="payment-method">
                            <h3>Payment method</h3>
                            <div className="payment-group">
                                <input type="radio" name="payment-method" id="balance" value="balance" defaultChecked />
                                <label htmlFor="balance">Balance</label>
                            </div>
                            <div className="payment-group">
                                <input type="radio" name="payment-method" id="credit-card" value="credit-card" />
                                <label htmlFor="credit-card">Credit Card</label>
                            </div>
                        </div>
                        <div className="checkout-action">
                            <button onClick={() => handleBuy(plan.plan_id)} className="btn btn-primary w-100">Pay <IoIosArrowForward /></button>
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default Checkout