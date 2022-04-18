import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const RequireAuth = ({children}) => {
    const {user} = useAuth();
    let location = useLocation();

    if(!user.email){
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    return (
        
            {children}
        
    );
};

export default RequireAuth;