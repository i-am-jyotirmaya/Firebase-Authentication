import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './UserList.scss'

const UserList = ({dataList}) => {
    const history = useHistory();

    const elements = dataList.map((ele) => {
        return(
            <ListItem key={ele.uid} button onClick={() => {
                history.push(`/users/${ele.uid}`);
            }}>
                <ListItemText 
                    primary={ele.displayName}
                    secondary={ele.email}
                />
            </ListItem>
        );
    })

    return (
        <React.Fragment>
            <List>
                {elements}
            </List>
        </React.Fragment>
    );
}

export default UserList;