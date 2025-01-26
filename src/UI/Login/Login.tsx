import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {

    navigate('/Home');
  };

  return (
    <div>
      <button onClick={handleClick}>Ir a otra sección</button>
    </div>
  );
};

export default Login;
