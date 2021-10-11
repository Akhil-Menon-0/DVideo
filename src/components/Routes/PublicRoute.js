import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../Context/Context';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

    const { user } = useContext(Context)
    return (
        <Route {...rest} render={props => (
            user !== null && restricted ?
                <Redirect to="/profile" />
                : <Component {...props.match.params} />
        )} />
    );
};

export default PublicRoute;