import { CircularProgress, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectAuthStatus } from '../auth/authSlice';
import './Dashboard.scss'

const Dashboard = (props) => {
    const authStatus = useSelector(selectAuthStatus);

    console.log(authStatus);

    if(authStatus.authStatus === 0) {
        return <Redirect to="/login"/>
    } else if (authStatus.authStatus === -1) {
        return (<div style={{
            height: '100vh',
            display: 'grid',
            placeContent: 'center'
        }}>
            <CircularProgress />
        </div>)
    }

    return (
        <React.Fragment>
            Dashboard
        </React.Fragment>
    );
}

export default Dashboard;