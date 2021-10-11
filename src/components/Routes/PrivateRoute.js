import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../Context/Context';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(Context)
    return (
        < Route {...rest} render={props => (
            user === null ?
                <Redirect to="/login" />
                : <Component {...props.match.params} />
        )} />
    );
};

export default PrivateRoute