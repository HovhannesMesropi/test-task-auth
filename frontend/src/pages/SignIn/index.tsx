import React, { useState } from 'react';
import { Container } from './styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function SignIn() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onSignIn = () => {
    axios.post('/auth/sign-in', data).then((res) => {
      if (res.data.body) {
        localStorage.setItem('tokens', JSON.stringify(res.data.body))
        navigate('/')
      }
    });
  };

  return (
    <Container>
      <TextField
        value={data.email}
        onChange={({ target }) => setData({ ...data, email: target.value })}
        label="Email"
        placeholder="Login"
        variant="standard"
      />
      <TextField
        value={data.password}
        onChange={({ target }) => setData({ ...data, password: target.value })}
        type="password"
        label="Password"
        placeholder="Password"
        variant="standard"
      />
      <Button title="Button" onClick={onSignIn} color="primary">
        Sign In
      </Button>
      <Button
        title="Button"
        color="primary"
        onClick={() => navigate('/sign-up')}
      >
        Sign Up
      </Button>
    </Container>
  );
}

export default SignIn;
