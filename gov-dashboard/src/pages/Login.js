import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Emblem from '../assets/indian-national-emblem-vector_789916-2905.jpg';
import Banner from '../assets/india-national-banner-with-flag-and-geometric-abstract-background-design-free-vector.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    if (email && password) {
      login();
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: '#f4f6f8',
          textAlign: 'center',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img 
            src={Banner} 
            alt="India National Banner" 
            style={{ width: '100%', borderRadius: 8 }} 
          />
        </Box>

        <Avatar
          src={Emblem}
          alt="Indian National Emblem"
          sx={{ width: 80, height: 80, margin: '0 auto 20px auto' }}
        />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#0D47A1' }}>
          Civic Issue Reporting Portal
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
