import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';

const ProtectedRoutes =({auth,component:Component,...rest})=>{
    return(
        <Route
        {...rest}
        render={(props)=>{
            if(auth) return <Component {...props}/>;
            if(!auth) return <Redirect to={{path:"/"}}/>;
        }}
        />
    );
};
export default ProtectedRoutes;