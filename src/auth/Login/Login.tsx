import { Link } from "react-router-dom"

import './Login.css'
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //validate
        if (!username) {
            setError('Username is required');
            return;
        }

        if (!/(?=.*[a-z])/.test(password)) {
            setError('Password or username is incorrect');
            return;
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password or username is incorrect');
            return;
        }

        if (!/(?=.*\d)/.test(password)) {
            setError('Password or username is incorrect');
            return;
        }

        if (!/(?=.*\W)/.test(password)) {
            setError('Password or username is incorrect');
            return;
        }

        if (!/.{8,}/.test(password)) {
            setError('Password or username is incorrect');
            return;
        }

        setError('');



        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            if (response.data.success && response.data.token) {

                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            } else {
                setError('Invalid username or password');
            }

        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
                return setError(err.response.data.message);
            }
            setError('An error occurred. Please try again later.');
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
                                    <h2 className="mb-0">Welcome back!</h2>
                                    <p>Sign in to your account to continue.</p>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
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
                                    <button className="btn btn-primary w-100">Login</button>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="d-flex justify-content-between">
                                        <Link to="/register">Create an account</Link>
                                        <Link to="/forgot-password">Forgot password?</Link>
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

export default Login