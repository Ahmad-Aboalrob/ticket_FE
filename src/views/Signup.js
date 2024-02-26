import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  styled,
} from '@mui/material';
import axios from 'axios';
import logoImg from './img/logo.png';
import { Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
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

const SignupForm = () => {
  const [data, setData] = useState({
    name: "", email: "", password: ""
  });
  const [msg, setMsg] = useState('');
  const [passErr, setPassErr] = useState('');
  const [Spinner, setSpinner] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "password")
      setPassErr('')

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    if (data.password === "" || data.password.length < 8)
      setPassErr('Password must be 8 digits or more !')
    else if (!passErr) {

      event.preventDefault();
      setSpinner(true)
      try {
        const response = await axios.post('http://localhost:3300/test/employee/signUp', data);
        console.log('Response from adduser endpoint:', response.data);
        if (response) {
          const { data } = response;
          if (data) {
            const { success,error} = data;
            if (success) {
              setMsg('registered successfully')
              setSpinner(false)
            }
            else {
              setMsg(error)

            }
          }
        }
      } catch (error) {
        setMsg(error)
        }
    }

  };

  return (
    <div className='body'>
      <StyledContainer component="main" maxWidth="xs"
        style={{
          border: "1px solid #438e7bcc",
          padding: "40px",
          borderRadius: "20px",
          height: "600px",
          boxShadow: "2px solid grey",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 6px 8px 13px 8px, rgba(0, 0, 0, 0.15) 0px 4px 5px 0px, rgba(0, 0, 0, 0.11) 0px 1px 10px 0px",
          border: "1px solid white"
        }}>
        <Typography variant="h5" style={{ color: "grey", marginBottom: '20px' }}>Sign Up</Typography>
        <div style={{ width: "20%" }}>
          <img src={logoImg} alt="Logo" style={{ width: '100%', marginBottom: '16px', borderRadius: "50px" }} />
        </div>
        <StyledForm onSubmit={handleSubmit} style={{ marginTop: "17px" }}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            autoFocus
            onChange={handleChange}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />

          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            style={{ backgroundColor: "white", borderRadius: "5px" }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {passErr ? (
                            <>
                                <span style={{ color: "red", textAlign: "center",fontSize:"10px" }}>{passErr}</span>
                            </>
                        ) : null}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "left", color: "grey", fontSize: "11px" }}
          >
            Already have an Acount ?
            <Link
              to="/Login"
              style={{ textDecorationLine: "underline", cursor: "pointer", color: "grey" }}
            >
              Sign In
            </Link>
          </Typography>
          <StyledButton
            type="submit"
            style={{
              width: "40%",
              boxShadow: "2px solid grey",
              backgroundColor: "grey", marginTop: "15px"
            }}
            variant="contained"
            color="primary"
          >
            Sign Up
          </StyledButton>

        </StyledForm>
        {Spinner ? <CircularProgress style={{ color: "grey", margin: "10px auto" }} /> : null}
        {msg ? (
          <>
            <h5 style={{ marginTop:"10px",color: msg == 'registered successfully' ? "green" : "red", textAlign: "center",fontSize: msg == 'registered successfully' ? "17px":"11px" }}>{msg}</h5>
          </>
        ) : null}
      </StyledContainer>
    </div>

  );
};

export default SignupForm;
