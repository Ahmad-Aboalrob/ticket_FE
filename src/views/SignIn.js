import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  TextField,
  Typography,
  Container,
  styled,
} from '@mui/material';
import axios from 'axios';
import logoImg from './img/logo.png';
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: (theme) => theme.spacing(8),
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: (theme) => theme.spacing(3),
});

const StyledTextField = styled(TextField)({
  marginBottom: (theme) => theme.spacing(2),
});

const StyledButton = styled(Button)({
  marginTop: (theme) => theme.spacing(2),
});

const SignInForm = () => {
  const [data, setData] = useState({
    email: "", password: ""
  });
  const [msg, setMsg] = useState('');
  const [Spinner, setSpinner] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true)
    try {
      const response = await axios.put('http://localhost:3300/test/employee/signIn', data);
      if (response) {
        const { data } = response;
        if (data) {
          const { success, error, employee } = data;
          if (success) {
            navigate('/Home', { state: { employee_id: employee[0].id} })
            setSpinner(false)

          }
          else {
            setMsg(error)
          }
        }
      }
    } catch (error) {
      setMsg(error)
      console.error('Error submitting data:', error);
    }

  };

  return (
    <div className='body'>
      <StyledContainer component="main" maxWidth="xs"
        style={{
          border: "1px solid #438e7bcc",
          padding: "40px",
          borderRadius: "20px", height: "500px",
          boxShadow: "2px solid grey",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 6px 8px 13px 8px, rgba(0, 0, 0, 0.15) 0px 4px 5px 0px, rgba(0, 0, 0, 0.11) 0px 1px 10px 0px",
          border: "1px solid whhite"
        }}>
        <Typography variant="h5" style={{ color: "grey", marginBottom: '20px' }}>Login</Typography>
        <div style={{ width: "20%" }}>
          <img src={logoImg} alt="Logo" style={{ width: '100%', marginBottom: '16px', borderRadius: "50px" }} />
        </div>
        <StyledForm onSubmit={handleSubmit}>

          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            onChange={handleChange}
          />

          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              width: "40%",
              boxShadow: "2px solid grey",
              backgroundColor: "grey", marginTop: "15px"
            }}
          >
            Login
          </StyledButton>
        </StyledForm>
        {Spinner ? <CircularProgress style={{ color: "grey", margin: "10px auto" }} /> : null}
        {msg ? (
          <>
            <h5 style={{ color: "red", textAlign: "center" }}>{msg}</h5>
          </>
        ) : null}
      </StyledContainer>
    </div>
  );
};

export default SignInForm;
