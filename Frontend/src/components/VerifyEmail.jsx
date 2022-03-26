import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';

export default function VerifyEmail() {
   const [email, setEmail] = useState('');

   function handleEmailChange(e) {
      setEmail(e.target.value);
   }
   
   const handleSubmit = (e) => {
      e.preventDefault();
   }

   return (
      <Box>
         <Typography>
            Verify your email:
         </Typography>
         <Box
            component="form"
            onSubmit={handleSubmit}
         >
            <TextField
               required
               id="email"
               label="Email"
               name="Email"
               autoComplete="Email"
               onChange={handleEmailChange}
               value={email}
            />
            <Button type="submit">
               Send verification email
            </Button>
         </Box>
      </Box>
   )
}