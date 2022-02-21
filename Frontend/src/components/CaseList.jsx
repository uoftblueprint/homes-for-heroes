import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CaseCard from './CaseCard';

export default function CaseList() {
  const [currentCase, setCurrentCase] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/customers`)
      .then(response => response.json())
      .then(res => {
        setUsers(res.customers)
      })
  }, []);

  const showCard = id => {
    fetch(`http://localhost:3000/customers/${id}/alertCase`)
      .then(response => response.json())
      .then(caseNote => setCurrentCase(caseNote))
      .catch(err => {
        console.error(err);
      });
  };

  const filterUsers = (query) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }

    setFilteredUsers(users.filter((user) => {
      const userName = user.name.toLowerCase();
      return userName.includes(query);
    }));
  };

  return (
    <>
      <Typography sx={{ fontSize: 48, mb: '1px'}}>Case Management</Typography>
      <TextField
        sx={{ backgroundColor: '#F7F8F9', width: '75%', marginBottom: '2%'}}
        fullWidth
        variant="outlined"
        placeholder="Search Users"
        name="search"
        type="text"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
        }}
        onChange={e => filterUsers(e.target.value)}
      />
      <List
        sx={
          {
            boxShadow: 1,
            width: '75%',
          } /*{ width: '100%', maxWidth: 400, bgcolor: 'gray' }*/
        }
      >
        {filteredUsers ? filteredUsers.map(user => {
          return (
            <>
              <ListItem
                key={'l' + user.user_id}
                sx={{m: 1}}
                secondaryAction={
                  <IconButton edge="end" aria-label="show-card">
                    {currentCase.user_id === user.user_id ? (
                      <ExpandLessOutlinedIcon onClick={() => setCurrentCase({})} />
                    ) : (
                      <ExpandMoreOutlinedIcon onClick={() => showCard(user.user_id)} />
                    )}
                  </IconButton>
                }
              >
                {user.name}
              </ListItem>
              {currentCase.user_id === user.user_id ? (
                <CaseCard
                  key={'c' + user.user_id}
                  sx={{boxShadow: 0}}
                  user={user}
                  note={currentCase}
                ></CaseCard>
              ) : null}
              <Divider></Divider>
            </>
          );
        }) : null}
      </List>
    </>
  );
}
