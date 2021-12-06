import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CaseCard from './CaseCard';

export default function CaseList({ users }) {
  const [currentCase, setCurrentCase] = useState({});

  const showCard = id => {
    fetch(`/api/customers/${id}/alertCase`)
      .then(response => response.json())
      .then(caseNote => setCurrentCase(caseNote))
      .catch(err => {
        // handle the error
      });
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'gray' }}>
      {users.map(user => {
        return (
          <>
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="show-card">
                  <ArrowDropDownIcon onClick={() => showCard(user.id)} />
                </IconButton>
              }
            >
              {user.name}
            </ListItem>
            {currentCase.user_id === user.id ? (
              <CaseCard user={user} case={currentCase}></CaseCard>
            ) : null}
          </>
        );
      })}
    </List>
  );
}
