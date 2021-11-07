import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CaseCard from './CaseCard'

export default function CaseList({ users }) {
    const [currentUser, setCurrentUser] = useState({})

    const showCard = (id) => {
        fetch(`/api/user/${id}`)
            .then(response => response.json())
            .then(user => setCurrentUser(user))
            .catch(err => {
                // handle the error
            })
    }

    return (
        <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'gray' }}>
        {users.map((user) => {
            return (
                <>
            <ListItem
                key={user.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="show-card">
                    <ArrowDropDownIcon onClick={() => showCard(user.id)}/>
                    </IconButton>
                }
            >
                {user.name}
            </ListItem>
            {currentUser.id === user.id ? <CaseCard user={currentUser}></CaseCard> : null}
            </>
            );
        })}
        </List>
    );
    }