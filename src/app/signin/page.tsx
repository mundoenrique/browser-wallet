'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Button,
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useApi } from '@/hooks/useApi';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = useApi();
  const apiPublicKey = process.env.NEXT_PUBLIC_KEY;

  const handleLogin = async () => {
    if (apiPublicKey) {
      setLoading(true);
      try {
        const payload = { email, password };
        const response = await api.post('/auth/login', payload);

        // Si el inicio de sesión es exitoso, redirige al dashboard
        if (response.status === 200) {
          console.log('data:', response.data);
          router.push('/dashboard');
        }
      } catch (error) {
        if (error instanceof Error && 'response' in error) {
          const axiosError = error as any;
          console.log(error);
          // Si el inicio de sesión no es exitoso, muestra un mensaje de error
          if (axiosError.response && axiosError.response.status === 401) {
            setAlertMessage('Usuario o contraseña incorrecta');
          }
        } else {
          setAlertMessage('Ocurrió un error inesperado');
        }
        setShowAlert(true);
      }
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Container>
        <Typography variant="h4" align="center">
          Iniciar sesión
        </Typography>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box margin="normal">
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Iniciar sesión'}
          </Button>
        </Box>
        {showAlert && <Alert severity="error">{alertMessage}</Alert>}
      </Container>
    </Box>
  );
}
