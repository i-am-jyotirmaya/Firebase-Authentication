import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useInitialAuthCheck from '../../custom-hooks/useInitialAuthCheck';
import { logoutUser } from '../auth/authSlice';
import Firebase from '../../app/firebase';

import './Dashboard.scss'
import Profile from './profile/Profile';
import { CircularProgress, Container } from '@material-ui/core';
import UserList from '../../common/user-list/UserList';

const Dashboard = (props) => {

    // Temporary Code
        const [token, setToken] = useState('');
        const [userList, setUserList] = useState([]);
        const [isUserListLoading, setUserListLoading] = useState(false);
    // 

    const dispatch = useDispatch();

    const component = useInitialAuthCheck({authStatusCode: 0, redirectPath: '/login'});
    if(component) return component;
    console.log(Firebase.auth().currentUser);
    return (
        <React.Fragment>
            <Container>
                <nav className="dashboard-nav">
                    <div className="dashboard-nav__heading">Dashboard</div>
                    <div className="dashboard-nav__user">{Firebase.auth().currentUser.displayName}</div>
                    <div>
                        <button className="form-group btn" onClick={() => {
                            dispatch(logoutUser());
                        }}>Logout</button>
                    </div>
                </nav>

                <div>
                    <div>
                        <button className="form-group btn" onClick={() => {
                            setUserListLoading(true);
                            fetch('http://localhost:8080/admin/users').then(res => {
                                setUserListLoading(false);
                                res.json().then(json => setUserList(json));
                            })
                        }}>
                            Load Users
                        </button>
                    </div>
                    {isUserListLoading ? <CircularProgress /> :
                        <UserList dataList={userList}/>
                    }
                </div>
            </Container>
            
            {/* Dashboard ({Firebase.auth().currentUser.displayName}) */}
            

            <hr/>
            {/* <button onClick={async () => {
                let t = await Firebase.auth().currentUser.getIdToken(false);
                setToken(t);
            }}>Show TokenId</button>
            <div>Token: <span>{token}</span></div> */}
            {/* <Profile /> */}


        </React.Fragment>
    );
}

export default Dashboard;