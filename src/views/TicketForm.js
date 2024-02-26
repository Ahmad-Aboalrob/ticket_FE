import React, { useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {
    Button,
    TextField,
    Typography,
    Container,
    styled,
} from '@mui/material';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

const StyledForm = styled('form')({
    width: '100%',
    marginTop: (theme) => theme.spacing(3),
});

const TicketForm = (props) => {
    const [data, setData] = useState({
        employee_id: props.employeeID
        , name: ""
        , personal_id: ""
        , email: ""
        , phone: ""
        , city: ""
        , address: ""
        , complained_against: ""
        , provider: ""
        , title: ""
        , details: ""
    });
    const [msg, setMsg] = useState('');
    const [errPhone, setErrPhone] = useState('');
    const [errID, setErrID] = useState('');
    const [Spinner, setSpinner] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "phone")
            setErrPhone('')
        if(name ==="personal_id")
            setErrID('')
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.phone === "" || data.phone.length < 9)
            setErrPhone("Phone number must be at least 9 digits")
        if (data.personal_id === "" || data.personal_id.length < 9)
            setErrID("Personal ID number must be at least 9 digits")

        else if (!errID && !errPhone){
            setSpinner(true)
            try {
                const response = await axios.post('http://localhost:3300/test/ticket/addTicket', data);
                console.log('Response', response.data);
                if (response) {
                    const { data } = response;
                    if (data) {
                        const { success } = data;
                        if (success) {
                            setMsg('Ticket Added successfully')
                            setSpinner(false)
                            props.handleCloseTicketForm();
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
        <div>
            <StyledForm onSubmit={handleSubmit} style={{ marginTop: "17px" }}>
                <Row>
                    <Col>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="name"
                                name="name"
                                label="الاسم الرباعي"
                                type="text"
                                style={{ backgroundColor: "white", borderRadius: "5px" }}
                                variant="outlined"
                                onChange={handleChange}

                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="email"
                                name="email"
                                label="البريد الالكتروني"
                                type="email"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">المحافظة</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="city"
                                input={<OutlinedInput label="المحافظة" />}
                                onChange={handleChange}
                            >
                                <MenuItem value="رام الله والبيرة">رام الله والبيرة</MenuItem>
                                <MenuItem value='القدس'>القدس</MenuItem>
                                <MenuItem value="طولكرم">طولكرم</MenuItem>
                                <MenuItem value="جنين">جنين</MenuItem>
                                <MenuItem value="الخليل">الخليل</MenuItem>
                                <MenuItem value="نابلس">نابلس</MenuItem>
                                <MenuItem value="بيت لحم">بيت لحم</MenuItem>
                                <MenuItem value="قلقيلية">قلقيلية</MenuItem>
                                <MenuItem value="طوباس">طوباس</MenuItem>
                                <MenuItem value="أريحا">أريحا</MenuItem>
                                <MenuItem value="غزة">غزة</MenuItem>
                                <MenuItem value="دير البلح">دير البلح</MenuItem>
                                <MenuItem value="خانيونس">خانيونس</MenuItem>
                                <MenuItem value="سلفيت">سلفيت</MenuItem>
                                <MenuItem value="رفح">رفح</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="details"
                                name="details"
                                label="تفاصيل الشكوى"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <div fullWidth>
                            <Button type="submit" variant="contained" color="primary" style={{
                                boxShadow: "2px solid grey",
                                backgroundColor: "grey", marginTop: "20px", height: "50px", width: "100%"
                            }}>
                                Submit
                            </Button>
                        </div>

                    </Col>
                    <Col>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="Identity Number"
                                name="personal_id"
                                label="رقم الهوية"
                                type="number"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                        {errID ? (
                            <>
                                <span style={{ color: "red", textAlign: "center",fontSize:"10px" }}>{errID}</span>
                            </>
                        ) : null}
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="Address in detail"
                                name="address"
                                label="العنوان بشكل تفصيلي"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="provider"
                                name="provider"
                                label="اسم مزود الخدمه"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="phone"
                                name="phone"
                                label="رقم الموبايل"
                                type="number"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </FormControl>
                        {errPhone ? (
                            <>
                                <span style={{ color: "red", textAlign: "center",fontSize:"10px" }}>{errPhone}</span>
                            </>
                        ) : null}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">الجهة التي وردت ضدها الشكوى</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="complained_against"
                                onChange={handleChange}
                                input={<OutlinedInput label="الجهة التي وردت ضدها الشكوى" />}
                            >
                                <MenuItem value="شركة الاتصالات">شركةالاتصالات</MenuItem>
                                <MenuItem value="وزارة الاتصالات">وزارة الاتصالات</MenuItem>
                                <MenuItem value="البريد">البريد</MenuItem>
                                <MenuItem value="جوال">جوال</MenuItem>
                                <MenuItem value="اوريدو">اوريدو</MenuItem>
                                <MenuItem value="مزود الخدمة">مزود الخدمه</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">الصفة</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="title"
                                input={<OutlinedInput label="الصفة" />}
                                onChange={handleChange}
                            >
                                <MenuItem value="شخص">شخص</MenuItem>
                                <MenuItem value="وكيل">وكيل</MenuItem>
                                <MenuItem value="مؤسسة">مؤسسة</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>




            </StyledForm>
            {Spinner ? <CircularProgress style={{ color: "grey", margin: "10px auto" }} /> : null}
            {msg ? (
                <>
                    <h5 style={{ color: msg == 'Ticket Added successfully' ? "green" : "red", textAlign: "center" }}>{msg}</h5>
                </>
            ) : null}
        </div>

    );
};

export default TicketForm;
