import { useNavigate } from 'react-router-dom';
import { ComponentT } from './types';
import { useEffect, useState } from 'react';



export const AuthProvider: ComponentT = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('tokens') || !user) {
      navigate('/sign-in');
    }
  }, [user]);

  return children;
};
