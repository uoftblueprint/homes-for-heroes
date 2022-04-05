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
<<<<<<< HEAD
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/customers`)
      .then(response => response.json())
      .then(res => {
        setUsers(res.customers);
        setFilteredUsers(res.customers);
      })
  }, []);

  const showCard = id => {
    fetch(`http://localhost:3000/customers/${id}/alertCase`)
      .then(response => response.json())
      .then(caseNote => setCurrentCase(caseNote))
      .catch(err => {
=======

  useEffect(() => {
    fetch(`http://localhost:3000/api/customers`)
      .then((response) => response.json())
      .then((res) => {
        setUsers(res.customers);
      });
  }, []);

  const showCard = (id) => {
    fetch(`http://localhost:3000/api/customers/${id}/alertCase`)
      .then((response) => response.json())
      .then((caseNote) => setCurrentCase(caseNote))
      .catch((err) => {
>>>>>>> 6fae965e2794540c8832d532ae699416ffb5a412
        console.error(err);
      });
  };

<<<<<<< HEAD
  const filterUsers = (query) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }

    setFilteredUsers(users.filter((user) => {
      const userName = user.name.toLowerCase();
      return userName.includes(query);
    }));
=======
  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query);
    });
>>>>>>> 6fae965e2794540c8832d532ae699416ffb5a412
  };

  return (
    <>
<<<<<<< HEAD
      <Typography sx={{ fontSize: 48, mb: '1px'}}>Case Management</Typography>
      <TextField
        sx={{ backgroundColor: '#F7F8F9', width: '75%', marginBottom: '2%'}}
=======
      <Typography sx={{ fontSize: 48, mb: '1px' }}>Case Management</Typography>
      <TextField
        sx={{
          backgroundColor: '#F7F8F9',
          width: '75%',
          marginBottom: '2%',
        }}
>>>>>>> 6fae965e2794540c8832d532ae699416ffb5a412
        fullWidth
        variant="outlined"
        placeholder="Search Users"
        name="search"
        type="text"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
        }}
<<<<<<< HEAD
        onChange={e => filterUsers(e.target.value)}
=======
        onKeyPress={(e) => {}}
>>>>>>> 6fae965e2794540c8832d532ae699416ffb5a412
      />
      <List
        sx={
          {
            boxShadow: 1,
            width: '75%',
          } /*{ width: '100%', maxWidth: 400, bgcolor: 'gray' }*/
        }
      >
<<<<<<< HEAD
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
=======
        {users
          ? users.map((user) => {
              return (
                <>
                  <ListItem
                    key={'l' + user.user_id}
                    sx={{ m: 1 }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="show-card">
                        {currentCase.user_id === user.user_id ? (
                          <ExpandLessOutlinedIcon
                            onClick={() => setCurrentCase({})}
                          />
                        ) : (
                          <ExpandMoreOutlinedIcon
                            onClick={() => showCard(user.user_id)}
                          />
                        )}
                      </IconButton>
                    }
                  >
                    {user.name}
                  </ListItem>
                  {currentCase.user_id === user.user_id ? (
                    <CaseCard
                      key={'c' + user.user_id}
                      sx={{ boxShadow: 0 }}
                      user={user}
                      note={currentCase}
                    ></CaseCard>
                  ) : null}
                  <Divider></Divider>
                </>
              );
            })
          : null}
>>>>>>> 6fae965e2794540c8832d532ae699416ffb5a412
      </List>
    </>
  );
}
