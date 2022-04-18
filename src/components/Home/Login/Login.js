import { Input } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginLogo from '../../../images/login-logo.png';
import './Login.css';

const Login = () => {
    const {googleSignIn,emailSingIn} = useAuth();
    const [error,setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

     const redirect_uri = location.state?.from || '/dashboard';
    

    const handleGoogle = () => {
        googleSignIn()
        .then(result => {
            navigate(redirect_uri,{ replace: true });
        })
    }
    
    const [loginData,setLoginData] = useState({});

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        console.log(newLoginData);
        setLoginData(newLoginData);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        emailSingIn(loginData.email,loginData.password)
        .then((result) => {
            // Signed in 
            navigate(redirect_uri);
            // ...
        })
        .catch((error) => {
            setError('Login Unsuccessul. Check your email & password');
        }); 
    }

    return (
            <section class="mt-5">
                <div class="container">
                    <div class="row justify-content-center shadow-lg login-wrapper">
                        <div class="col-12 col-md-8 col-lg-7 col-md-5 text-center">
                            <form onSubmit={handleLogin}>
                                <div class="row">
                                    <div class="col">
                                        <img className='img-fluid' src={loginLogo} alt="" />
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <input onChange={handleOnChange} type="email" name='email' class="form-control" placeholder="Email"/>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col">
                                        <Input.Password onChange={handleOnChange} className="form-control mb-1 py-2" type="password" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col">
                                        <input className='btn btn-primary w-100' type="submit" value='Log in' />
                                    </div>
                                </div>
                            </form>
                            {error && <p className='text-danger'>{error}</p>}
                            OR
                            <br />
                            <button onClick={handleGoogle} type="submit" className='w-100 rounded btn btn-secondary'>Login with Google</button>
                        </div>
                        <p className='mt-1'>Have not an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
        </section>    
    );
};

export default Login;