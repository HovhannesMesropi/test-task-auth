import React, { useState } from 'react';
import { Container } from './styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const navigate = useNavigate();

  const onRegister = () => {
    if(data.password === data.reEnterPassword) {
      axios
      .post('/auth/sign-up', data)
      .then((res) => {
        if(res.data.status) {
          toast.success('now you can sign in');
          navigate('/sign-in')
        }
      })
    } else {
      toast.warn('Passwords not match each other')
    }
    
  };

  return (
    <Container>
      <TextField
        value={data.name}
        onChange={({ target }) => setData({ ...data, name: target.value })}
        label="Name"
        placeholder="Name"
        variant="standard"
      />
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
      <TextField
        value={data.reEnterPassword}
        onChange={({ target }) =>
          setData({ ...data, reEnterPassword: target.value })
        }
        type="password"
        label="Reenter password"
        placeholder="Reenter password"
        variant="standard"
      />
      <Button onClick={onRegister} title="Button" color="primary">
        Register
      </Button>
      <Button
        title="Button"
        color="primary"
        onClick={() => navigate('/sign-in')}
      >
        Sign In
      </Button>
    </Container>
  );
}

export default SignUp;
