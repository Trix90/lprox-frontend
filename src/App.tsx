import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PublicHeader from "./components/PublicHeader/PublicHeader";
import Sidenav from "./components/Sidenav/Sidenav";
import Home from "./pages/Home/Home";
import Deposit from "./pages/Deposit/Deposit";
import Invoices from "./pages/Invoices/Invoices";
import Store from "./pages/Store/Store";
import Checkout from "./pages/Checkout/Checkout";
import Plans from "./pages/Plans/Plans";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const hasFetched = useRef(false);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://lprox-backend.vercel.app/api/auth/me', {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!response.data.success) localStorage.removeItem('token');
                setIsAuthenticated((response.data.success ? true : false));
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            checkAuth();
            hasFetched.current = true;
        }
    }, []);

    return (
        <Router>
            {isAuthenticated ? (
                <main className="app-layout">
                    <Sidenav />
                    <div className="page-content container">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/checkout/:plan_id" element={<Checkout />} />
                            <Route path="/plans/:plan_id" element={<Plans />} />
                            <Route path="/deposit" element={<Deposit />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </div>
                </main>
            ) : (
                <>
                    <PublicHeader />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App;
