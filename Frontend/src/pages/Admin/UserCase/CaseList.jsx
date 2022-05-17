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
  const [currentCase, setCurrentCase] = useState(null);
  const [currentOpen, setCurrentOpen] = useState(null);
  const [users, setUsers] = useState([]);
  const { search } = window.location;
  const query = new URLSearchParams(search).get('search');
  const [searchQuery, setSearchQuery] = useState(query || '');

  useEffect(() => {
    fetch(`/api/customers`)
      .then((response) => response.json())
      .then((res) => {
        setUsers(res.customers);
      });
  }, []);

  const showCard = (id) => { 
      (async () => {
        setCurrentOpen(id)
        const resp = await fetch(`/api/customers/${id}/alertCase`)
        .then((resp) => {
          return new Promise((resolve) =>{
            if (resp.ok){
              resolve(resp.json())
            }
            else{
              resolve(null)
            }
          })
        })
        .then((resp) => setCurrentCase(resp));
      })();
  };

  const filterUsers = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return post.name.includes(query);
    });
  };

  return (
    <>
      <Typography sx={{ fontSize: 48, mb: '1px' }}>Case Management</Typography>
      <TextField
        sx={{
          backgroundColor: '#F7F8F9',
          width: '75%',
          marginBottom: '2%',
        }}
        fullWidth
        variant="outlined"
        placeholder="Search Users"
        name="search"
        type="text"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
        }}
        onInput={(e) => {setSearchQuery(e.target.value)}}
      />
      <List
        sx={
          {
            boxShadow: 1,
            width: '75%',
          } /*{ width: '100%', maxWidth: 400, bgcolor: 'gray' }*/
        }
      >
        {users ? filterUsers(users, searchQuery).map((user) => {
              return (
                <>
                  <ListItem
                    key={'l' + user.user_id}
                    sx={{ m: 1 }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="show-card">
                        {currentOpen === user.user_id ? (
                          <ExpandLessOutlinedIcon
                            onClick={() => {
                              setCurrentCase(null);
                              setCurrentOpen(null);
                            }
                            }
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
                  {currentOpen === user.user_id ? (
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
      </List>
    </>
  );
}
