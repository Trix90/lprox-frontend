import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/logo.svg';

import './PublicHeader.css';


const PublicHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={LogoSvg} alt="Logo" height="35" className="d-inline-block align-top" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-primary ms-2">Register</Link>
                </div>
            </div>
        </nav>

    )
}

export default PublicHeader