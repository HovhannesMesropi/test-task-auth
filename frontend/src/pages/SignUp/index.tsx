import React from 'react';
import { Container } from './styles';
import { Button, TextField } from '@mui/material';

function SignUp() {
  return (
    <Container>
      <TextField label="Email" placeholder='Login' variant="standard" />
      <TextField type='password' label="Password" placeholder='Password' variant="standard"  />
      <TextField type='password' label="ReEnter password" placeholder='ReEnter password' variant="standard"  />
      <Button title='Button' color='primary'>Sign In</Button>
      <Button title='Button' color='primary'>Sign Up</Button>
    </Container>
  );
}

export default SignUp;
