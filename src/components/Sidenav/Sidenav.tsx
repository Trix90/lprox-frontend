import { Link, useLocation } from 'react-router-dom';
import LogoSvg from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";

import HomeIcon from '../../assets/home.svg';
import HomeIconHover from '../../assets/home-2.svg';
import InvoicesIcon from '../../assets/invoices.svg';
import InvoicesIconHover from '../../assets/invoices-2.svg';
import PurchaseIcon from '../../assets/purchase-plan.svg';
import PurchaseIconHover from '../../assets/purchase-plan-2.svg';
import TopupIcon from '../../assets/topup.svg';
import TopupIconHover from '../../assets/topup-2.svg';
import logOutIcon from '../../assets/logout.svg';
import './Sidenav.css';

const Sidenav = () => {

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <div className="sidenav">
            <div className="side-nav-content">
                <div className="sidenav-list side-nav-mobile-control container">
                    <div className="d-flex justify-content-between align-items-start">
                        <Link className="navbar-brand" to="/">
                            <img src={LogoSvg} alt="logo" />
                        </Link>
                        <button className="toggle-sidenav" type="button" onClick={() => document.body.classList.toggle('sidenav-active')}>
                            <RxHamburgerMenu />
                        </button>
                    </div>
                </div>
                <div className="sidenav-list pb-0 mb-2 container">
                    <div className="sidenav-section-title">Main Menu</div>
                </div>
                <div className="sidenav-items-container container">

                    <Link className={`sidenav-item ${location.pathname === '/' ? 'active' : ''}`} to="/"><img className="icon" src={HomeIconHover} alt="Home" /><img className="icon-active" src={HomeIcon} alt="Home" />Home</Link>
                    <Link className={`sidenav-item ${location.pathname === '/store' ? 'active' : ''}`} to="/store"><img className="icon" src={PurchaseIconHover} alt="Purchase Plan" /><img className="icon-active" src={PurchaseIcon} alt="Purchase Plan" />Purchase Plan</Link>
                    <Link className={`sidenav-item ${location.pathname === '/deposit' ? 'active' : ''}`} to="/deposit"><img className="icon" src={TopupIconHover} alt="Topup" /><img className="icon-active" src={TopupIcon} alt="Topup" />Topup</Link>
                    <Link className={`sidenav-item ${location.pathname === '/invoices' ? 'active' : ''}`} to="/invoices"><img className="icon" src={InvoicesIconHover} alt="Invoices" /><img className="icon-active" src={InvoicesIcon} alt="Invoices" />Invoices</Link>
                    <a className="sidenav-item" onClick={handleLogout} href="#"><img className="icon rotate-180" src={logOutIcon} alt="Logout" /><img className="icon-active rotate-180" src={logOutIcon} alt="Logout" />Logout</a>
                </div>
            </div>
        </div>
    )
}

export default Sidenav