import { Link } from "react-router-dom"

import './Register.css'
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //validate
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!username) {
            setError('Username is required');
            return;
        }
        if (!password) {
            setError('Password is required');
            return;
        }
        if (!confirmPassword) {
            setError('Confirm password is required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!/(?=.*[a-z])/.test(password)) {
            setError('Password must contain at least one lowercase letter');
            return;
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }

        if (!/(?=.*\d)/.test(password)) {
            setError('Password must contain at least one digit');
            return;
        }

        if (!/(?=.*\W)/.test(password)) {
            setError('Password must contain at least one special character');
            return;
        }

        if (!/.{8,}/.test(password)) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setError('');



        try {
            const response = await axios.post('https://lprox-backend.vercel.app/api/auth/register', {
                email,
                username,
                password
            });
            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
                return setError(err.response.data.message);
            }
            console.log(err);

            setError('Registration failed');
        }
    };

    return (
        <section className="auth-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-5 mx-auto mt-4">
                        <form onSubmit={handleSubmit} className="card auth-card mt-5">
                            <div className="card-body">
                                <div className="page-title">
                                    <h2 className="mb-0">Create an account</h2>
                                    <p>Sign up for a new account to continue.</p>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirm-password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-primary w-100">Register</button>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="d-flex justify-content-between">
                                        <Link to="/login">Already have an account?</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register