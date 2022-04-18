import { CircularProgress } from '@mui/material';
import { Input } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginLogo from '../../../images/login-logo.png';

const Registration = () => {
    
    const {googleSignIn,emailSignUp,isLoading,user,authError} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect_uri = location.state?.from || '/dashboard';
    const handleGoogle = () => {
        googleSignIn()
        .then(result => {
            navigate(redirect_uri);
        })
    }

    
    const [registerData, setRegisterData] = useState({});
    const [error,setError] = useState('');

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = {...registerData};
        newRegisterData[field] = value;
        console.log(newRegisterData);
        setRegisterData(newRegisterData);
    }

    
    
    const handleRegister = (e) => {
        // Stop Default Behaviour
        e.preventDefault();
        
        // Form validation
        if(registerData.password.length < 6){
            setError('Password should be at least 6 characters');
            return;
        }
        if(!/(?=.*[A-Z].*[A-Z])/.test(registerData.password)){
            setError('Password should 2 upper cases');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(registerData.password)){
            setError('Password should 1 special character');
            return;
        }
        else{
            setError('');
            emailSignUp(registerData.email, registerData.password,registerData.name)
        }
   
    }

    return (
        <section className="mt-5">
                <div className="container">
                    <div className="row justify-content-center shadow-lg login-wrapper">
                        <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
                            {!isLoading && <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col">
                                        <img className='img-fluid' src={loginLogo} alt="" />
                                    </div>
                                </div>
                                {user.email && <div class="mt-3 mb-0 alert alert-success alert-dismissible fade show" role="alert">
                                <i class=" text-success me-2 fa-solid fa-circle-check"></i>
                                Registration Successful.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <input onChange={handleOnChange} type="text" name="name" className="form-control" placeholder="Name" required/>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <input onChange={handleOnChange} type="email" name="email" className="form-control" placeholder="Email" required/>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <Input.Password onChange={handleOnChange} className="form-control mb-1 py-2" type="password" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <input className='btn btn-primary w-100' type="submit" value='Register' />
                                    </div>
                                </div>
                            </form>}
                            <div className='text-danger'>{error}</div>
                            {authError && <p className='text-danger'>{authError}</p>}
                            {isLoading && <CircularProgress/> }
                            
                            OR
                            <br />
                            <button onClick={handleGoogle} className='w-100 rounded btn btn-secondary' type='submit'>Login with Google</button>
                        </div>
                        <p className='mt-1'>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
        </section> 
    );
};

export default Registration;
