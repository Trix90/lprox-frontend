import StackSvg from '../../assets/stack.svg';
import DateSvg from '../../assets/date.svg';
import QubeSvg from '../../assets/qube.svg';

import { ImSpinner10 } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import './Plans.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { products, plans } from '../../data/plansData.ts';
import CircularProgressBar from '../../components/CircularProgressBar/CircularProgressBar.tsx';


const Plans = () => {



    const [proxyConfig, setProxyConfig] = useState('rotate');
    const [ipList, setIpList] = useState<string[]>(['192.11.11.22', '192.11.11.23', '192.11.11.24']);

    const [proxyHost, setProxyHost] = useState('');
    const [proxyPort, setProxyPort] = useState('');
    const [proxyUsername, setProxyUsername] = useState('');
    const [proxyPassword, setProxyPassword] = useState('');

    const [proxyTargetingZone] = useState('-zone-resi');
    const [proxyTargetingRegion, setProxyTargetingRegion] = useState('');
    const [proxyTargetingState, setProxyTargetingState] = useState('');
    const [proxyTargetingCity, setProxyTargetingCity] = useState('');
    const [proxyTargetingSessionTime, setProxyTargetingSessionTime] = useState('');



    const [countryList, setCountryList] = useState<{ country_code: string, country_name: string }[]>([]);
    const [stateList, setStateList] = useState<{ code: string }[]>([]);
    const [cityList, setCityList] = useState<{ code: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('any');
    const [selectedState, setSelectedState] = useState('any');
    const [selectedCity, setSelectedCity] = useState('any');

    const [stickySessionTime, setStickySessionTime] = useState(10);
    const [stickySessionAmount, setStickySessionAmount] = useState(10);


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
        host: string;
        port: string;
    }

    const [planAPI, setPlan] = useState<PlanAPI>({
        id: '',
        product_plan_id: '',
        price: 0,
        bandwidth: 0,
        bandwidthLeft: 0,
        expireAt: '',
        pass: '',
        user: '',
        usage: 0,
        product_id: null,
        host: 'resi-eu.lightningproxies.net',
        port: "9999",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const hasFetched = useRef(false);
    const { plan_id } = useParams();


    if (!plan_id) {
        window.history.pushState({}, '', '/');
    }

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get('http://localhost:5000/api/plans/get', {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    id: plan_id
                }
            })
                .then(response => {
                    if (!response.data.success) {
                        setError(response.data.message);
                        setLoading(false);
                        return;
                    }

                    const plan = response.data.plan;
                    const product = plans.find(p => p.plan_id === plan.product_plan_id);
                    setPlan({
                        ...plan,
                        product_id: product ? product.product_id : null,
                        host: 'resi-eu.lightningproxies.net',
                        port: "9999",
                    });
                    setLoading(false);
                    setProxyHost(planAPI.host);
                    setProxyPort(planAPI.port);
                    setProxyUsername(plan.user);
                    setProxyPassword(plan.pass);

                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to load plans');
                    setLoading(false);
                });


            axios.get('http://localhost:5000/api/plans/country_list', {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (!response.data.success) {
                        setError(response.data.message);
                        setLoading(false);
                        return;
                    }

                    setCountryList(response.data.countries);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });


        }

    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><ImSpinner10 /></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleTargeting = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === 'country') {

            //change the user zone to the selected country
            setSelectedCountry(value);
            setSelectedState('any');
            setSelectedCity('any');
            setStateList([]); // Clear states
            setCityList([]); // Clear cities
            setProxyTargetingState('');
            setProxyTargetingCity('');
            if (value === 'any') {
                setProxyTargetingRegion('');
                return;
            }

            setProxyTargetingRegion('-region-' + value);

            // Fetch states based on selected country
            axios.get(`http://localhost:5000/api/plans/state_list?country_code=${value}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.success) {
                        setStateList(response.data.states);
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to load states');
                });
        } else if (name === 'state') {
            setSelectedState(value);
            setSelectedCity('any');
            setCityList([]);
            setProxyTargetingCity('');
            if (value === 'any') {
                setProxyTargetingState('');
                return;
            }

            setProxyTargetingState('-st-' + value);

            // Fetch cities based on selected state
            axios.get(`http://localhost:5000/api/plans/city_list?country_code=${selectedCountry}&state_code=${value}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.success) {
                        setCityList(response.data.cities);
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to load cities');
                });
        } else if (name === 'city') {

            if (value === 'any') {
                setProxyTargetingCity('');
                return;
            }

            setProxyTargetingCity('-city-' + value);
            setSelectedCity(value);
        }
    };


    //handle sticky session time
    const handleStickySessionTime = (event: { target: { value: string; }; }) => {

        let value = parseInt(event.target.value);
        if (value < 0) {
            value = 0;
        } else if (value > 1440) {
            value = 1440;
        }
        setStickySessionTime(value);

        //if value is 0 then setProxyTargetingSessionTime to empty
        if (value === 0) {
            setProxyTargetingSessionTime('');
            return;
        }

        setProxyTargetingSessionTime('-sessTime-' + value);

    };


    const generateSessionId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let sessionId = '';
        for (let i = 0; i < 12; i++) {
            sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return sessionId;
    };

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Plan Overview</h2>
                    <p>Plan ID: {planAPI.id}</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card myplan-card mb-3">
                    <div className="card-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={QubeSvg} alt="Cart" />

                                <Link to="/store" className="btn btn-success">New Plan <IoIosArrowForward /></Link>
                            </div>
                        </div>
                        <div className="card-data">
                            <h5 className="mb-0">Current Plan</h5>
                            <p className="mb-0">{planAPI && planAPI.product_id && products[planAPI.product_id]?.product_name || ''} <span>{planAPI?.bandwidth} GB</span></p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card myplan-card mb-3">
                    <div className="card-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={DateSvg} alt="Cart" />

                                <Link to="/store" className="btn btn-success">New Plan <IoIosArrowForward /></Link>
                            </div>
                        </div>
                        <div className="card-data">
                            <h5 className="mb-0">Plan Expires</h5>
                            <p className="mb-0">{new Date(planAPI.expireAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="card myplan-card mb-3">
                    <div className="card-body circle-body">
                        <div className="tops">

                            <div className="card-information">
                                <img src={StackSvg} alt="Cart" />
                            </div>
                            <div className="card-data">
                                <h5 className="mb-0">Bandwidth</h5>
                                <p className="mb-0">{planAPI.bandwidthLeft}/{planAPI.bandwidth} GB</p>
                            </div>
                        </div>
                        <CircularProgressBar percentage={planAPI.usage} size={100} />
                    </div>
                </div>
            </div>




            <div className="col-12 d-flex justify-content-between">
                <div className="page-title">
                    <h2>Configure Proxy</h2>
                    <p>Configure your proxy settings</p>
                </div>
            </div>


            <div className="col-12 col-md-12">
                <div className="card proxy-auth-card mb-3">
                    <div className="card-header p-0">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <div className={proxyConfig === 'rotate' ? 'nav-link active' : 'nav-link'} onClick={() => setProxyConfig('rotate')}>Rotating Proxy</div>
                            </li>
                            <li className="nav-item">
                                <div className={proxyConfig === 'sticky' ? 'nav-link active' : 'nav-link'} onClick={() => setProxyConfig('sticky')}>Sticky Session</div>
                            </li>
                            <li className="nav-item">
                                <div className={proxyConfig === 'user' ? 'nav-link active' : 'nav-link'} onClick={() => setProxyConfig('user')}>User Auth</div>
                            </li>
                            <li className="nav-item">
                                <div className={proxyConfig === 'ip' ? 'nav-link active' : 'nav-link'} onClick={() => setProxyConfig('ip')}>IP Whitelist</div>
                            </li>
                        </ul>
                    </div>

                    {proxyConfig === 'rotate' && (
                        <>
                            <div className="card-body pb-3">
                                <div className="row">

                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">Country</label>
                                            <select className="form-control" onChange={handleTargeting} name="country" defaultValue={selectedCountry}>
                                                <option value="any">Worldwide Mix</option>
                                                {countryList.map((country) => (
                                                    <option key={country.country_code} value={country.country_code}>{country.country_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">State</label>
                                            <select className="form-control" onChange={handleTargeting} name="state" defaultValue={selectedState}>
                                                <option value="any">Worldwide Mix</option>
                                                {stateList.map((state) => (
                                                    <option key={state.code} value={state.code}>{ucFirst(state.code)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">City</label>
                                            <select className="form-control" onChange={handleTargeting} name="city" defaultValue={selectedCity}>
                                                <option value="any">Worldwide Mix</option>
                                                {cityList.map((city) => (
                                                    <option key={city.code} value={city.code}>{ucFirst(city.code)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="form-group mb-2">
                                    <label className="form-label">Rotating Proxy</label>
                                    <input type="text" className="form-control" value={
                                        proxyHost + ':' + proxyPort + ':' +
                                        proxyUsername +
                                        proxyTargetingZone +
                                        proxyTargetingRegion +
                                        proxyTargetingState +
                                        proxyTargetingCity +
                                        ':' + proxyPassword
                                    } readOnly />
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between gap-3 border-top-0 pt-0">
                                <button className="btn btn-primary w-100"
                                    onClick={() => {
                                        const text = proxyHost + ':' + proxyPort + ':' +
                                            proxyUsername +
                                            proxyTargetingZone +
                                            proxyTargetingRegion +
                                            proxyTargetingState +
                                            proxyTargetingCity +
                                            ':' + proxyPassword;
                                        const blob = new Blob([text], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = 'rotating-proxy-list.txt';
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    }}
                                ><FaDownload className="me-2" /> <span>Download Proxy List</span></button>
                                <button className="btn btn-primary w-100"
                                    onClick={(e) => {
                                        const text = proxyHost + ':' + proxyPort + ':' +
                                            proxyUsername +
                                            proxyTargetingZone +
                                            proxyTargetingRegion +
                                            proxyTargetingState +
                                            proxyTargetingCity +
                                            ':' + proxyPassword;
                                        navigator.clipboard.writeText(text);

                                        //change the button text to copied
                                        const button = e.target as HTMLButtonElement;
                                        const originalText = button.innerText;
                                        button.innerText = 'Copied!';
                                        setTimeout(() => {
                                            button.innerText = originalText;
                                        }, 2000);
                                    }}
                                ><FaCopy className="me-2" /> <span>Copy Proxy List</span></button>
                            </div>
                        </>
                    )}
                    {proxyConfig === 'sticky' && (
                        <>
                            <div className="card-body pb-3">
                                <div className="row">

                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">Country</label>
                                            <select className="form-control" onChange={handleTargeting} name="country" defaultValue={selectedCountry}>
                                                <option value="any">Worldwide Mix</option>
                                                {countryList.map((country) => (
                                                    <option key={country.country_code} value={country.country_code}>{country.country_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">State</label>
                                            <select className="form-control" onChange={handleTargeting} name="state" defaultValue={selectedState}>
                                                <option value="any">Worldwide Mix</option>
                                                {stateList.map((state) => (
                                                    <option key={state.code} value={state.code}>{ucFirst(state.code)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group mb-2">
                                            <label className="form-label">City</label>
                                            <select className="form-control" onChange={handleTargeting} name="city" defaultValue={selectedCity}>
                                                <option value="any">Worldwide Mix</option>
                                                {cityList.map((city) => (
                                                    <option key={city.code} value={city.code}>{ucFirst(city.code)}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group mb-2">
                                            <div className="session-time-group mb-2">
                                                <span>Session Time in Minutes:</span>
                                                <input type="number" className="form-control session-time" min="1" max="1440" value={stickySessionTime}
                                                    onChange={handleStickySessionTime} name="session-time" />
                                            </div>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="0"
                                                max="1440"
                                                value={stickySessionTime}
                                                onChange={handleStickySessionTime} name="session-time"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group mb-2">
                                            <label className="form-label">Session Amount</label>
                                            <input type="text" className="form-control" value={stickySessionAmount} onChange={(e) => setStickySessionAmount(parseInt(e.target.value))} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-2">
                                            <label className="form-label">Sticky Proxy</label>
                                            <textarea className="form-control mb-2" rows={5} value={
                                                Array.from({ length: stickySessionAmount }).map(() => (
                                                    proxyHost + ':' + proxyPort + ':' +
                                                    proxyUsername +
                                                    proxyTargetingZone +
                                                    proxyTargetingRegion +
                                                    proxyTargetingState +
                                                    proxyTargetingCity +
                                                    '-session-' + generateSessionId() +
                                                    proxyTargetingSessionTime +
                                                    ':' + proxyPassword
                                                )).join('\n')
                                            } readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between gap-3 border-top-0 pt-0">
                                <button className="btn btn-primary w-100"
                                    onClick={() => {
                                        const text = Array.from({ length: stickySessionAmount }).map(() => (
                                            proxyHost + ':' + proxyPort + ':' +
                                            proxyUsername +
                                            proxyTargetingZone +
                                            proxyTargetingRegion +
                                            proxyTargetingState +
                                            proxyTargetingCity +
                                            '-session-' + generateSessionId() +
                                            proxyTargetingSessionTime +
                                            ':' + proxyPassword
                                        )).join('\n');
                                        const blob = new Blob([text], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = 'sticky-proxy-list.txt';
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    }}
                                ><FaDownload className="me-2" /> <span>Download Proxy List</span></button>
                                <button className="btn btn-primary w-100"
                                    onClick={(e) => {
                                        const text = Array.from({ length: stickySessionAmount }).map(() => (
                                            proxyHost + ':' + proxyPort + ':' +
                                            proxyUsername +
                                            proxyTargetingZone +
                                            proxyTargetingRegion +
                                            proxyTargetingState +
                                            proxyTargetingCity +
                                            '-session-' + generateSessionId() +
                                            proxyTargetingSessionTime +
                                            ':' + proxyPassword
                                        )).join('\n');
                                        navigator.clipboard.writeText(text);

                                        //change the button text to copied
                                        const button = e.target as HTMLButtonElement;
                                        const originalText = button.innerText;
                                        button.innerText = 'Copied!';
                                        setTimeout(() => {
                                            button.innerText = originalText;
                                        }, 2000);
                                    }}
                                ><FaCopy className="me-2" /> <span>Copy Proxy List</span></button>
                            </div>
                        </>
                    )}

                    {proxyConfig === 'ip' && (
                        <div className="card-body">
                            <div className="form-group mb-1">
                                <label className="form-label">Whitelisted IPs</label>
                                {ipList.map((ip, index) => (
                                    <div key={index} className="ip-line">
                                        <input type="text" className="form-control" value={ip} readOnly />
                                        <button className="remove" onClick={() => {
                                            setIpList(ipList.filter((_, i) => i !== index));
                                        }}><IoMdClose /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="ip">Add IP Address</label>
                                <input type="text" className="form-control" id="ip" placeholder="Enter IP Address" />
                            </div>
                            <div className="form-group mb-2">
                                <button className="btn btn-primary w-100" onClick={() => {
                                    const ip = (document.getElementById('ip') as HTMLInputElement).value;
                                    if (ip) {
                                        //only add if not already in the list and valid
                                        if (ipList.includes(ip)) {
                                            return;
                                        }

                                        if (!ip.match(/^(\d{1,3}\.){3}\d{1,3}$/)) {
                                            return;
                                        }

                                        setIpList([...ipList, ip]);
                                        (document.getElementById('ip') as HTMLInputElement).value = '';
                                    }
                                }}>Add IP Address</button>
                            </div>
                        </div>

                    )}

                    {proxyConfig === 'user' && (
                        <div className="card-body">
                            <div className="form-group mb-2">
                                <label className="form-label">Host</label>
                                <input type="text" className="form-control" placeholder="Enter username" value={proxyHost} readOnly />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Port</label>
                                <input type="text" className="form-control" placeholder="Enter username" value={proxyPort} readOnly />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" value={proxyUsername} readOnly />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Password</label>
                                <input type="text" className="form-control" placeholder="Enter password" value={proxyPassword} readOnly />
                            </div>
                            <div className="form-group mb-2">
                                <button className="btn btn-primary w-100">Reset Password</button>
                            </div>
                        </div>
                    )}

                </div>
                <div className="my-5 py-5"></div>
            </div>


        </div>
    )
}

export default Plans