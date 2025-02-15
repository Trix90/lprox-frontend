import { Link, useLocation } from 'react-router-dom';
import breadcumb from '../../assets/breadcumb.svg';
import { IoIosArrowForward } from "react-icons/io";
import './Header.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { FaRegUserCircle, FaWallet } from "react-icons/fa";
import React from 'react';
import LogoSvg from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";

const Header: React.FC = () => {
    const location = useLocation();
    const [userData, setUserData] = useState<{ username: string; balance: number } | null>(null);
    const hasFetched = useRef(false);

    // Fetch user data only once
    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.data.success) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }

            const { username, balance } = response.data.user;
            setUserData({ username, balance });
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        if (!hasFetched.current) {
            getUserData();
            hasFetched.current = true;
        }
    }, []);

    // Breadcrumb rendering
    const renderBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        return paths.map((path, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join('/')}`;

            if (['/checkout', '/plans'].includes(fullPath)) {
                return (
                    <React.Fragment key={fullPath}>
                        <IoIosArrowForward className="breadcrumb-separator" />
                        <Link to={fullPath} className="breadcrumb-item">{ucFirst(path)}</Link>
                    </React.Fragment>
                );
            }
            return (
                <React.Fragment key={fullPath}>
                    <IoIosArrowForward className="breadcrumb-separator" />
                    <Link to={fullPath} className="breadcrumb-item">{ucFirst(path)}</Link>
                </React.Fragment>
            );
        });
    };

    return (
        <>
            <header className="mobile">
                <div className="d-flex justify-content-between align-items-start">
                    <Link className="navbar-brand" to="/">
                        <img src={LogoSvg} alt="logo" />
                    </Link>
                    <button className="toggle-sidenav" type="button" onClick={() => document.body.classList.toggle('sidenav-active')}>
                        <RxHamburgerMenu />
                    </button>
                </div>
            </header>
            <header className="web-header">
                <div className="breadcrumbs-container">
                    <Link to="/" className="breadcrumb-item">
                        <img src={breadcumb} alt="Home" />
                    </Link>
                    {renderBreadcrumbs()}
                </div>
                <div className="user-info">
                    {userData && (
                        <>
                            <Link to="/profile" className="btn btn-user-info me-2">
                                <FaRegUserCircle /> {ucFirst(userData.username)}
                            </Link>
                            <Link to="/deposit" className="btn btn-user-info">
                                <FaWallet /> ${userData.balance.toFixed(2)}
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
