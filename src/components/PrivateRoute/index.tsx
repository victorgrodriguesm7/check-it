import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest}: any) {
    const { user } = useAuth();

    return (
        user ?  
            <Route {...rest} render={props => {<Component {...props} />}}/> 
            : <Redirect to="/login"/>
    )
}
