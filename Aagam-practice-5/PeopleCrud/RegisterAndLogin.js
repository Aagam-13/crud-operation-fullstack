import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register, login } from './apiService'; // Import your register and login API functions

const RegisterAndLogin = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const history = useHistory();

  const handleAction = async () => {
    try {
      if (isRegistering) {
        const response = await register(Username, Email, Password);
        if (response.status === 201) {
          setIsRegistering(false); // Switch to login mode after successful registration
        } else {
          // Handle failed registration
          // Show error message or toast notification
        }
      } else {
        const response = await login(Username, Password);
        if (response.status === 200) {
          // Successful login, set your authentication logic here
          history.push('/'); // Redirect to the main page after login
        } else {
          // Handle failed login
          // Show error message or toast notification
        }
      }
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistering && (
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <button onClick={handleAction}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <p>
        {isRegistering ? 'Already have an account?' : 'Need to register?'}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default RegisterAndLogin;
