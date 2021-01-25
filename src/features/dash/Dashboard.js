import React from 'react';
import { useDispatch } from 'react-redux';
import useInitialAuthCheck from '../../custom-hooks/useInitialAuthCheck';
import { logoutUser } from '../auth/authSlice';
import Firebase from '../../app/firebase';

import './Dashboard.scss'
import Profile from './profile/Profile';

const Dashboard = (props) => {

    const dispatch = useDispatch();

    const component = useInitialAuthCheck({authStatusCode: 0, redirectPath: '/login'});
    if(component) return component;
    console.log(Firebase.auth().currentUser);
    return (
        <React.Fragment>
            Dashboard ({Firebase.auth().currentUser.displayName})
            <button onClick={() => {
                dispatch(logoutUser());
            }}>Logout</button>
            <Profile />
        </React.Fragment>
    );
}

export default Dashboard;