import CartSvg from '../../assets/cart.svg';
import DollarSvg from '../../assets/dollar.svg';
import ServerSvg from '../../assets/server.svg';
import { ImSpinner10 } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";

import './Home.css'
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { products, plans } from '../../data/plansData.ts';
import CircularProgressBar from '../../components/CircularProgressBar/CircularProgressBar.tsx';


const Home = () => {

    interface PlanAPI {
        id: string;
        product_plan_id: string;
        price: number;
        bandwidth: number;
        bandwidthLeft: number;
        expireAt: string;
        pass: string;
        user: string;
        usage: number;
        product_id: string | null;
    }

    const [plansAPI, setPlans] = useState<PlanAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const hasFetched = useRef(false);

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get('https://lprox-backend.vercel.app/api/plans/list', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {

                    const updatedPlans = response.data.plans.map((plan: PlanAPI) => {
                        const product = plans.find(p => p.plan_id === plan.product_plan_id);
                        return {
                            ...plan,
                            product_id: product ? product.product_id : null
                        };
                    });
                    setPlans(updatedPlans);
                    setLoading(false);

                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to load plans');
                    setLoading(false);
                });
        }

    }, [token]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><ImSpinner10 /></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Welcome back, Trix!</h2>
                    <p>We're glad to see you back. Here's a quick overview of your account.</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card dashboard-card mb-3">
                    <div className="card-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={DollarSvg} alt="Cart" />
                                <h5 className="mb-0">Active Balance</h5>
                                <p className="mb-0">$0.00</p>

                            </div>
                            <div className="card-link">
                                <Link to="/deposit" className="btn btn-success">Add Balance <IoIosArrowForward /></Link>
                            </div>
                        </div>

                        <div className="dashboard-footer">
                            <p className="mb-0">Total Balance Spent</p>
                            <p className="mb-0">$0.00</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card dashboard-card mb-3">
                    <div className="card-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={CartSvg} alt="Cart" />
                                <h5 className="mb-0">Active Balance</h5>
                                <p className="mb-0">$0.00</p>

                            </div>
                            <div className="card-link">
                                <Link to="/deposit" className="btn btn-info">Add Balance <IoIosArrowForward /></Link>
                            </div>
                        </div>

                        <div className="dashboard-footer">
                            <p className="mb-0">Total Balance Spent</p>
                            <p className="mb-0">$0.00</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card dashboard-card mb-3">
                    <div className="card-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={ServerSvg} alt="Cart" />
                                <h5 className="mb-0">Active Balance</h5>
                                <p className="mb-0">$0.00</p>

                            </div>
                            <div className="card-link">
                                <Link to="/deposit" className="btn btn-info">Add Balance <IoIosArrowForward /></Link>
                            </div>
                        </div>

                        <div className="dashboard-footer">
                            <p className="mb-0">Total Balance Spent</p>
                            <p className="mb-0">$0.00</p>
                        </div>
                    </div>

                </div>
            </div>




            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Your Active Plans</h2>
                    <p>Access your active plans and subscriptions.</p>
                </div>
            </div>
            {plansAPI.map(plan => (
                <div className="col-12 col-md-6 mb-3" key={plan.id}>
                    <div className="card plan-card">
                        <div className="card-body">
                            <div className="tops">
                                <CircularProgressBar percentage={plan.usage} />
                                <div className="plan-text">
                                    <h5>
                                        {plan.product_id ? products[plan.product_id]?.product_name : ''}
                                        <span> {plan.bandwidth}GB</span>
                                    </h5>
                                    <p>Ideal proxy for any use case & purpose. By accessing our network 10M+ IP
                                        pool non-subnet linked, bans and blocks are non-existent.</p>
                                </div>
                            </div>
                            <div className="plan-footer">
                                <div className="plan-info">
                                    <h5>Plan ID</h5>
                                    <p className="mb-0">{plan.id}</p>
                                </div>
                                <div className="plan-info">
                                    <h5>Data Left</h5>
                                    <p className="mb-0">{plan.bandwidthLeft} GB</p>
                                </div>
                                <div className="plan-info">
                                    <h5>Expires</h5>
                                    <p className="mb-0">{new Date(plan.expireAt).toLocaleDateString()}</p>
                                </div>
                                <div className="plan-info">
                                    <Link to={`/plans/${plan.id}`} className="btn btn-info">View Plan <IoIosArrowForward /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home