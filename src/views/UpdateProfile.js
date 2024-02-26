import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    Container,
    styled,
} from '@mui/material';
import axios from 'axios';
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

const EditProfile = (props) => {
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
    const handleGetEmployeeByID = async (id) => {
        try {
            const response = await axios.put('http://localhost:3300/test/employee/getEmployeeByID', {
                id: id
            });
            console.log('Response from adduser endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    let { success, employee, error } = data;
                    if (success) {
                        if (employee && employee.length > 0) {
                            setData((data) => ({
                                ...data,
                                name: employee[0].name, email: employee[0].email, password: employee[0].password
                            }));
                        }
                    } else {
                        setMsg(error)

                    }
                }
            }
        } catch (error) {
            setMsg(error)
            console.error('Error submitting data:', error);
        }

    };
    useEffect(() => {
        handleGetEmployeeByID(props.employeeID);
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.password === "" || data.password.length < 8)
            setPassErr('Password must be 8 digits or more !')

        else if (!passErr) {

            setSpinner(true)
            try {
                const response = await axios.put('http://localhost:3300/test/employee/update', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    id: props.employeeID
                });
                console.log('Response from adduser endpoint:', response.data);
                if (response) {
                    const { data } = response;
                    if (data) {
                        const { success } = data;
                        if (success) {
                            setSpinner(false)
                            props.handleCloseEditProfile();
                        }
                    }
                }
            } catch (error) {
                setMsg(error)
                console.error('Error submitting data:', error);
            }
        }

    };


    return (
        <div >
            <StyledContainer component="main" maxWidth="xs"
                style={{

                }}>
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
                        value={data.name}
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
                        value={data.email}
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
                        value={data.password}
                    />
                    {passErr ? (
                        <>
                            <span style={{ color: "red", textAlign: "center", fontSize: "10px" }}>{passErr}</span>
                        </>
                    ) : null}
                    <div style={{ textAlign: "center" }}>
                        <StyledButton
                            type="submit"
                            style={{
                                width: "40%",
                                boxShadow: "2px solid grey",
                                backgroundColor: "grey", margin: "15px auto"
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Update
                        </StyledButton>
                    </div>


                </StyledForm>
                {Spinner ? <CircularProgress style={{ color: "grey", margin: "10px auto" }} /> : null}
                {msg ? (
                    <>
                        <h5 style={{ color: msg == 'Updated successfully' ? "green" : "red", textAlign: "center" }}>{msg}</h5>
                    </>
                ) : null}
            </StyledContainer>
        </div>

    );
};

export default EditProfile;
