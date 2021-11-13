import * as React from 'react';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import ListItem from '@mui/material/ListItem';
// import IconButton from '@mui/material/IconButton';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import CaseCard from './CaseCard';


export default function Login() {
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
    });

    // const handleChange 

    return (
        <TextField 
            required 
            id="filled-with-icon" 
            label="Username" 
        
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
            variant="filled" 
        />
    )
}


// export default function Login({ users }) {
//   const [currentUser, setCurrentUser] = useState({});

//   const showCard = id => {
//     fetch(`/api/user/${id}`)
//       .then(response => response.json())
//       .then(user => setCurrentUser(user))
//       .catch(err => {
//         // handle the error
//       });
//   };

//   return (
//     <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'gray' }}>
//       {users.map(user => {
//         return (
//           <>
//             <ListItem
//               key={user.id}
//               secondaryAction={
//                 <IconButton edge="end" aria-label="show-card">
//                   <ArrowDropDownIcon onClick={() => showCard(user.id)} />
//                 </IconButton>
//               }
//             >
//               {user.name}
//             </ListItem>
//             {currentUser.id === user.id ? (
//               <CaseCard user={currentUser}></CaseCard>
//             ) : null}
//           </>
//         );
//       })}
//     </List>
//   );
// }
