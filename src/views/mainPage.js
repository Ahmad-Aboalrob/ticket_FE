import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import logoImg from './img/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, Button } from '@mui/material';
import Modal from "@mui/material/Modal";
import TicketForm from './TicketForm';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditProfile from './UpdateProfile';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid gray",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};
const MainPage = () => {
    const location = useLocation();
    const { employee_id } = location.state;
    const [anchorEl, setAnchorEl] = useState(null);
    const [Spinner, setSpinner] = useState(false);
    const [msg, setMsg] = useState('');
    const [ticketMsg, setTicketMsg] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [data, setData] = useState({
        ticketForm: false, searchBy: "", search: ""
    });
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
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
                            setEmployeeName(employee[0].name)
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
    const getAllTicket = async () => {
        setSpinner(true)
        try {
            const response = await axios.get('http://localhost:3300/test/ticket/getTickets',);
            console.log('Response from endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    const { success, tickets, error } = data;
                    console.log(error)
                    setSpinner(false)
                    if (error) {
                        setMsg(error)
                    } else if (success) {
                        setData((data) => ({
                            ...data, tickets: tickets
                        }))


                        setMsg("")
                    } else {
                        setData((data) => ({
                            ...data, tickets: tickets
                        }))
                        setMsg("")

                    }
                }
            }
        } catch (error) {
            setMsg(error)
            console.error('Error submitting data:', error);
        }
    }
    useEffect(() => {
        handleGetEmployeeByID(employee_id);
        getAllTicket()
        if (data.updateTicketInfoFlag) {
            console.log('hereeeeeeeee',data.tickets,data.ticketInfo)
            const updatedTicketInfo = data.tickets.find(ticket => ticket.id === data.ticketInfo.id);
            console.log(updatedTicketInfo, 'after')
            if (updatedTicketInfo) {
                setData((data) => ({
                    ...data, ticketInfo: updatedTicketInfo, updateTicketInfoFlag: false
                }));
            }
        }
    }, [
        data.updateTicketInfoFlag
    ]);
    // useEffect(() => {
    //     if (data.updateTicketInfoFlagByEmloyee){
    //         const updatedTicketInfo = data.tickets.find(ticket => ticket.id === data.ticketInfo.id);
    //         console.log(updatedTicketInfo, 'after')
    //         if (updatedTicketInfo) {
    //             setData((data) => ({
    //                 ...data, ticketInfo: updatedTicketInfo, updateTicketInfoFlag: false
    //             }));
    //         }
    //     }

    // }, [data.myOpenSelected])
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "comment") {
            setData({
                ...data,
                replies: { employeeName, comment: value },
                comment: value

            })
        } else {
            setData((data) => ({
                ...data,
                [name]: value,
            }));
        }


    };
    const getEmployeeTicket = async () => {
        // event.preventDefault();
        setSpinner(true)
        setData((data) => ({
            ...data, myOpenSelected: true, searchFlag: false
        }))
        try {
            const response = await axios.put('http://localhost:3300/test/ticket/getTicketsById', {
                employee_id: employee_id,

            });
            console.log('Response from endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    const { success, tickets, error } = data;
                    console.log(error)
                    setSpinner(false)
                    if (error) {
                        setMsg(error)
                    } else if (success) {
                        setData((data) => ({
                            ...data, tickets: tickets
                        }))
                        setMsg("")
                    } else {
                        setData((data) => ({
                            ...data, tickets: tickets
                        }))
                        setMsg("")

                    }
                    setData((data) => ({
                        ...data, ticketFound: true
                    }))
                }
            }
        } catch (error) {
            setMsg(error)
            console.error('Error submitting data:', error);
        }
    }

    const handleSearchTicket = async (event) => {
        event.preventDefault();
        setSpinner(true)
        try {
            const response = await axios.put('http://localhost:3300/test/ticket/getTicketsById', {
                search: data.search,
                searchBy: data.searchBy
            });
            console.log('Response from endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    const { success, tickets, error } = data;
                    console.log(error)
                    setSpinner(false)
                    if (error) {
                        setMsg(error)
                    } else if (success) {
                        setData((data) => ({
                            ...data, tickets: tickets, myOpenSelected: false, searchFlag: true
                        }))
                        setMsg("")
                    } else {
                        setData((data) => ({
                            ...data, tickets: tickets
                        }))
                        setMsg("")

                    }
                    setData((data) => ({
                        ...data, ticketFound: true
                    }))

                }
            }
        } catch (error) {
            setMsg(error)
            console.error('Error submitting data:', error);
        }

    };
    const closeTicketStatus = async (event, id) => {
        event.preventDefault();
        let {myOpenSelected,searchFlag} = data;
        try {
            const response = await axios.put('http://localhost:3300/test/ticket/updatetickets', {
                status: false,
                id: id
            });
            console.log('Response from endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    const { success, error } = data;
                    console.log(error)
                    if (error) {
                        setTicketMsg(error)
                    } else if (success) {
                        
                            await getAllTicket()
                            setData((data) => ({
                                ...data,
                                updateTicketInfoFlag: true,ticketFound:false
                            }));
                        
                        setTicketMsg("")
                    }
                }
            }
        } catch (error) {
            setTicketMsg(error)
            console.error('Error submitting data:', error);
        }

    };
    const handleSentReply = async (event) => {
        event.preventDefault();
        try {
            let { replies, tickets, ticketInfo } = data;
            let arrayOfReplies
            if (tickets && tickets.length > 0) {
                if (tickets[0].replies !== null) {
                    console.log(tickets[0].replies)
                    if (tickets[0].replies.length > 0) {
                        arrayOfReplies = tickets[0].replies
                        arrayOfReplies.push(replies)
                    }
                } else {
                    arrayOfReplies = [replies]
                }
            }
            const response = await axios.put('http://localhost:3300/test/ticket/updatetickets', {
                replies: arrayOfReplies,
                id: tickets[0].id
            });
            console.log('Response from endpoint:', response.data);
            if (response) {
                const { data } = response;
                if (data) {
                    const { success, error } = data;
                    if (error) {
                        setTicketMsg(error)
                    } else if (success) {
                        await getAllTicket()
                        setData((data) => ({
                            ...data,
                            updateTicketInfoFlag: true,
                        }));
                        setTicketMsg("")

                    }
                }
            }
        } catch (error) {
            setTicketMsg(error)
            console.error('Error submitting data:', error);
        }
        setData((data) => ({
            ...data,
            comment: "",
        }));
    }
    const handleCloseTicketForm = () => {
        setData((data) => ({
            ...data,
            ticketForm: false,
        }));
        getAllTicket()
    };

    const handleCloseEditProfile = () => {
        setData((data) => ({
            ...data,
            editProfile: false,
        }));
        handleGetEmployeeByID(employee_id);
        getAllTicket();
    };
    const showTicketInfo = (element) => {
        setData((data) => ({
            ...data,
            ticketInfo: element, ticketInfoModal: true
        }));
    }
    const GoBackToAllTicket = () => {
        setData((data) => ({
            ...data, ticketFound: false
        }));
        getAllTicket();
    }
    const handleCloseTicketInfo = () => {
        setData((data) => ({
            ...data, ticketInfoModal: false
        }));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        navigate('/')
    }
    console.log(data)
    return (
        <div >
            <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: "100px" }}>
                        <img src={logoImg} alt="Logo" style={{ height: '40px', marginRight: '10px', borderRadius: "50px" }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                            General Info
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ color: "black", fontSize: "13px" }}>
                            {employeeName}
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            <AccountCircleIcon style={{ fontSize: "30px", color: "black" }} />
                        </IconButton>

                    </div>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => setData((data) => ({
                            ...data,
                            editProfile: true,
                        }))}><EditIcon style={{ fontSize: "16px", marginRight: "12px" }} /> Edit Profile</MenuItem>
                        <MenuItem onClick={() => setData((data) => ({
                            ...data,
                            ticketForm: true,
                        }))}
                        ><AddOutlinedIcon style={{ fontSize: "16px", marginRight: "12px" }} /> Add Ticket
                        </MenuItem>
                        <MenuItem onClick={getEmployeeTicket}> <ManageSearchOutlinedIcon style={{ fontSize: "16px", marginRight: "12px" }} />My Open Tickets</MenuItem>
                        <MenuItem onClick={logout}><LogoutIcon style={{ fontSize: "16px", marginRight: "12px" }} /> Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '80px 20px 0px', height: "100vh" }}>
                <div style={{
                    padding: "10px 30px",
                    width: "70%",
                    margin: "20px auto"
                }}>
                    <Box sx={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center', gap: '20px', width: "90%",
                        margin: "20px auto",
                    }}>
                        <Button
                            type="submit"
                            style={{
                                boxShadow: "2px solid grey",
                                backgroundColor: "grey", height: "52px", width: "10%"
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleSearchTicket}
                        >
                            search
                        </Button>
                        <TextField
                            style={{ width: "60%" }}
                            label="Search Customer ..."
                            variant="outlined"
                            name="search"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl style={{ width: "30%" }}>
                            <InputLabel
                                id="demo-simple-select-label"
                            >
                                Select an Option
                            </InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="searchBy"
                                input={<OutlinedInput label="Select an Option" />}
                                onChange={handleChange}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="personal_id">Personal ID</MenuItem>
                                <MenuItem value="ticket_id">Ticket Number</MenuItem>
                                <MenuItem value="phone">Phone</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                </div>
                {Spinner ? <CircularProgress style={{ color: "grey", margin: "10px auto" }} /> :
                    msg ? (
                        <>
                            <h5 style={{ color: "red", textAlign: "center" }}>{msg}</h5>
                        </>
                    ) : null}
                {!Spinner && data.tickets && data.tickets.length > 0 ? (
                    <div style={{
                        boxShadow: "3px solid grey",
                        borderRadius: "20px",
                        padding: "20px 40px",
                        boxShadow: "rgba(0, 0, 0, 0.3) 6px 8px 13px 8px, rgba(0, 0, 0, 0.15) 0px 4px 5px 0px, rgba(0, 0, 0, 0.11) 0px 1px 10px 0px",
                        width: "80%", height: "auto", margin: "10px auto"
                    }}>
                        <TableContainer
                            component={Paper}
                            style={{ margin: "0 auto 20px" }}
                        >
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#fafafa" }}>
                                    <TableRow style={{ textAlign: "center" }}>
                                        <TableCell align="center">Added By</TableCell>
                                        <TableCell align="center">Ticket Number</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Personal ID</TableCell>
                                        <TableCell align="center">Ticket Status</TableCell>
                                        <TableCell align="center">More</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.tickets.map((item, index) => (
                                        <TableRow style={{ textAlign: "center" }}>
                                            <TableCell align="center">{item.empname}</TableCell>
                                            <TableCell align="center">{item.ticket_id}</TableCell>
                                            <TableCell align="center">{item.name}</TableCell>
                                            <TableCell align="center">{item.phone}</TableCell>
                                            <TableCell align="center">{item.email}</TableCell>
                                            <TableCell align="center">{item.personal_id}</TableCell>
                                            <TableCell align="center">{item.ticket_status ? "Open" : "Closed"}</TableCell>
                                            <TableCell align="center">
                                                <a
                                                    onClick={(e) => {
                                                        showTicketInfo(item);
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <VisibilityIcon style={{ color: "grey", fontSize: "15px" }} />
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>


                ) : !Spinner && data.tickets && data.tickets.length == 0 ? (
                    <Typography variant="h5" style={{ marginBottom: '20px', fontSize: "13px" }}>
                        There is No tickets {"  "}
                        <a style={{ textDecorationLine: "underline", cursor: "pointer", color: "grey" }}
                            onClick={() => setData((data) => ({
                                ...data,
                                ticketForm: true,
                            }))}>Add Ticket</a>
                    </Typography>) : null}
                {data.ticketFound ? (
                    <a style={{ cursor: "pointer" }} onClick={GoBackToAllTicket}>
                        Back to All Tickets
                    </a>
                ) : null}
                {data.ticketForm ? (
                    <Modal
                        open={data.ticketForm}
                        onClose={handleCloseTicketForm}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={style}
                            style={{
                                width: "70%",
                                height: "600px",
                                overflowY: "auto"
                            }}
                        >
                            <TicketForm employeeID={employee_id} handleCloseTicketForm={handleCloseTicketForm} />
                        </Box>
                    </Modal>
                ) : null}
                {data.ticketInfo ? (
                    <Modal
                        open={data.ticketInfoModal}
                        onClose={handleCloseTicketInfo}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={style}
                            style={{
                                width: "80%",
                                height: "500px",
                                overflowY: "auto",
                                border: "1px solid white"
                            }}
                        >
                            <div >
                                <div>
                                    <Row>
                                        <Col>
                                            <Typography variant="h5" style={{
                                                marginBottom: '10px', fontSize: "13px",
                                                textAlign: "left", fontWeight: "900"
                                            }}>{data.ticketInfo.ticket_status ? 'Open' : `Closed by: ${employeeName}`}</Typography>
                                        </Col>
                                        <Col>
                                            <Typography variant="h5" style={{
                                                marginBottom: '10px', fontSize: "13px",
                                                textAlign: "right", fontWeight: "900"
                                            }}>Added By :{data.ticketInfo.empname} At {data.ticketInfo.date}</Typography>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "20px" }}>
                                        <Col>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Name</span> : {data.ticketInfo.name}</Typography>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Address</span> : {data.ticketInfo.address}</Typography>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Complained Against</span> : {data.ticketInfo.complained_against}</Typography>
                                        </Col>
                                        <Col>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Phone</span> : {data.ticketInfo.phone}</Typography>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Ticket Number</span>: {data.ticketInfo.ticket_id}</Typography>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Complaint</span> : {data.ticketInfo.details}</Typography>
                                        </Col>
                                        <Col>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Personal ID</span> : {data.ticketInfo.personal_id}</Typography>
                                            <Typography variant="h5" style={{ marginBottom: '10px', fontSize: "13px", textAlign: "left" }}><span style={{ fontWeight: "600" }}>Email</span> : {data.ticketInfo.email}</Typography>
                                        </Col>

                                    </Row>
                                    <hr />
                                    <div style={{
                                        marginTop: "50px", boxShadow: "3px solid grey",
                                        borderRadius: "20px",
                                        padding: "20px 40px",
                                        marginBottom: "20px",
                                        boxShadow: "rgba(0, 0, 0, 0.3) 6px 8px 13px 8px, rgba(0, 0, 0, 0.15) 0px 4px 5px 0px, rgba(0, 0, 0, 0.11) 0px 1px 10px 0px",
                                    }}>
                                        <Row style={{ width: "60%" }}>
                                            <div style={{ width: "20%", marginLeft: "left" }}>
                                                <Col style={{ textAlign: "left" }}>
                                                    <a style={{ cursor: "pointer", fontWeight: "600" }} onClick={(e) => closeTicketStatus(e, data.ticketInfo.id)}>
                                                        <HighlightOffIcon style={{ fontSize: "17px" }} /> Close
                                                    </a>
                                                </Col>
                                            </div>
                                            <div style={{ width: "80%", marginLeft: "left" }}>
                                                <Col style={{ textAlign: "left" }}>
                                                    <a style={{ cursor: "pointer", fontWeight: "600" }}
                                                    // onClick={() => setData((data) => ({
                                                    //     ...data,
                                                    //     replayForm: true
                                                    // }))}
                                                    >
                                                        <QuickreplyOutlinedIcon style={{ fontSize: "17px" }} /> Replies - ({!data.ticketInfo.replies ? 0 : data.ticketInfo.replies.length})
                                                        {data.showReplies ? (
                                                            <KeyboardArrowUpIcon style={{ fontSize: "17px", marginLeft: "10px" }}
                                                                onClick={() => setData((data) => ({
                                                                    ...data,
                                                                    closeReplies: true, showReplies: false
                                                                }))}
                                                            />
                                                        ) : (
                                                            <ArrowForwardIosIcon style={{ fontSize: "15px", marginLeft: "10px" }}
                                                                onClick={() => setData((data) => ({
                                                                    ...data,
                                                                    showReplies: true, closeReplies: false
                                                                }))} />
                                                        )}

                                                    </a>
                                                    {data.ticketInfo.replies && data.ticketInfo.replies.length > 0 && data.showReplies ? (
                                                        <div>
                                                            {data.ticketInfo.replies.map((element, index) => (
                                                                <div key={index} style={{ margin: "20px 30px", display: 'flex', alignItems: 'center' }}>
                                                                    <PersonIcon style={{ fontSize: '20px', marginRight: '10px', marginBottom: '30px' }} /> {/* Using PersonIcon from Material-UI */}
                                                                    <div>
                                                                        <Typography variant="h5" style={{ marginBottom: '5px', fontSize: "13px", textAlign: "left", fontWeight: "bold" }}>
                                                                            {element.employeeName}
                                                                        </Typography>
                                                                        <Typography variant="h5" style={{ marginBottom: '5px', fontSize: "13px", textAlign: "left" }}>
                                                                            {element.comment}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </Col>
                                            </div>

                                        </Row>
                                        {data.ticketInfo.ticket_status ? (
                                            <>

                                                <FormControl fullWidth margin="normal">
                                                    <TextField
                                                        id="comment"
                                                        name="comment"
                                                        label="Comment..."
                                                        value={data.comment}
                                                        multiline
                                                        rows={2}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton onClick={handleSentReply}>
                                                                        <SendIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            </>
                                        ) : null}
                                    </div>

                                </div>
                                {ticketMsg ? (
                                    <>
                                        <h5 style={{ color: "red", textAlign: "center" }}>{ticketMsg}</h5>
                                    </>
                                ) : null}
                            </div>
                        </Box>
                    </Modal>
                ) : null}
                {data.editProfile ? (
                    <Modal
                        open={data.editProfile}
                        onClose={handleCloseEditProfile}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={style}
                            style={{
                                width: "50%",
                                height: "400px",
                                overflowY: "auto"
                            }}
                        >
                            <EditProfile employeeID={employee_id} handleCloseEditProfile={handleCloseEditProfile} />
                        </Box>
                    </Modal>
                ) : null}

            </div>
        </div>
    );
};

export default MainPage;
