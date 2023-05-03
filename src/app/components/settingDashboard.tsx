import { Button, Container, Grid, MenuItem, Modal, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { borderBottom, Box } from "@mui/system";
import {adminarrow,edit,delete1, calendarbookservice} from '../assets/images';
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CustomizedAccordions from './accordian';
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    <Typography>{children}</Typography>
                </>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        height: "4px",
        borderRadius: "6px 6px 0 0",
        background: "#1D7A8C",
        textTransform: "capitalize"
    },
    '& .MuiTab-root': {
      
        color:"#646464",
        fontSize:"18px",
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderBottom:"1px solid rgb(139, 139, 139)"
    },
    '& .MuiTab-root.Mui-selected': {
        color:"#1D7A8C",
    },
    '& .MuiButtonBase-root-MuiTab-root':{
        padding:"0"
    },
    '& .MuiButtonBase-root':{
        width:"300px",
        textTransform: "capitalize"
    },
 
});
const CustomTextField2 = styled(TextField)({
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"250px"
   }
});
const CustomButton = styled(Button)({
    width: "80px",
    height: "46px",
    background: "#1D7A8C",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"30px",
    
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
});
const useStyles = makeStyles((theme) => ({
    table: {
      width: "861px",
      border:"1px solid #E1E1E1",
      margin:"10px auto"
    },
    flexdiv:{
      color:"#646464",
      fontSize:"16px",
      lineHeight:"16px",
      fontWeight: '700',
    },
    tableHeaderCell: {
        backgroundColor: "#F9F9F9",
        padding:"15px 2px 15px 14px",
    },
    modal:{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        background: "white",
        padding:"20px",
    },
    margin:{
        margin:"10px 0",
        fontSize:"18px",
        color:"#525252",
        fontWeight:"700"
    },
    Password:{
        display:"flex",
        flexDirection:"column"
    }
   
  }));
  function datepickericon(){
    return(
        <img src={calendarbookservice}></img>
    );
  };
function SettingDashboard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [USERS , setadd] = useState({
        FirstName:"",
        LastName:"",
        Email:"",
        Mobile:"",
        Password:"",
        ConfirmPassword:"",
        id:"",
        preferredLangauge:"",
        DOB:""

    });
    const [passwords,setpassword]=useState({
        Oldpass:"",
        Newpass:"",
        Confirmpass:"",

    })
    const[Address,setAddress]=useState<any[]>([]);
    const[dummy,setdummy]=useState({
        StreetName: " ",
        HouseNumber: "",
        PostalCode: "",
        City: "",
        MobileNumber: "",
        id: 1,
        userId:1
    });
    const[UID,setUID]=useState(0);
    const[displayerror,setdisplayerror]=useState(false);
    const[displayerror1,setdisplayerror1]=useState(false);
    const[displayerror2,setdisplayerror2]=useState(false);
    const[displayerror3,setdisplayerror3]=useState(false);
    const[NewAdress,setNewAddress]=useState({
        StreetName:"",
        HouseNumber:"",
        PostalCode:"",
        City:"",
        MobileNumber:"",
        userId:0
    });
    const[update,setupdate]=useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [time, setTime] = React.useState<Date | null>(new Date());
    const handleChange3 = (date: Date | null) => {
        setTime(date);
        let a=moment(date!).format('DD-MM-YYYY')
        let b=moment(date!).format('h:mm A')
        setadd({...USERS,DOB:a})
      };
      
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        fetch(`http://localhost:5000/user?q=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        }).then(res=>res.json()).then(res =>{
                console.log(res[0])
                setadd(res[0])
                let a=res[0].id
                console.log("UID:"+UID)
                setUID(a)
                fetch(`http://localhost:5000/Address?userId=${a}`,{
                method:"GET",
                headers: {
                   "Content-type": "application/json; charset=UTF-8"
                },
            }).then(res=>res.json()).then(res =>{
                Address.splice(0,10000);
                setAddress(res)
                res.map((i:any)=>{
                // let ad=i.HouseNumber+","+i.StreetName+","+i.City+","+i.PostalCode+".";
                // setmobile(mobile => [...mobile, i.MobileNumber])
                // setadress(address => [...address, ad]);  
                })
            }).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
        
    },[update])
    const handleChange1 = (e:any) =>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setadd({...USERS,[name]:value})
    }
    const [lan, setlan] = React.useState('English');
    const handleChange2 = (event: SelectChangeEvent) => {
        setlan(event.target.value);
        setadd({...USERS,preferredLangauge:event.target.value})

    };
    const addresschange=(e:any)=>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setdummy({...dummy,[name]:value})
    }
    const addresschange1=(e:any)=>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setNewAddress({...NewAdress,[name]:value})
    }
    const passwordchange=(e:any)=>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setpassword({...passwords,[name]:value})
        console.log([name]+":"+value)
    }
    return (
        <>
        <Container style={{maxWidth:"931px",padding:"0px"}}>
            <Box className="custom-tabs">
                <Box>
                    <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="My Details" {...a11yProps(0)}/>
                        <Tab label="My adresses" {...a11yProps(1)} />
                        <Tab label="Change password" {...a11yProps(2)} />
                    </AntTabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="Mydetails">
                    <Grid container style={{margin:"30px 0"}}>
                        <Grid item lg={4}>
                            <p>First name</p>
                        </Grid>
                        <Grid item lg={4}>
                            <p>Last name</p>
                        </Grid>
                        <Grid item lg={4}>
                            <p>Email Address</p>
                        </Grid>
                        <Grid item lg={4}>
                            <CustomTextField2  placeholder="First name" name="FirstName" value={USERS.FirstName} onChange={handleChange1}/>
                        </Grid>
                        <Grid item lg={4}>
                            <CustomTextField2  placeholder="Last name" name="LastName" value={USERS.LastName} onChange={handleChange1}/>
                        </Grid>
                        <Grid item lg={4}>
                            <CustomTextField2  placeholder="Email" name="Email" value={USERS.Email} onChange={handleChange1} disabled/>
                            <div style={{margin:"15px 0"}}></div>
                        </Grid>
                        
                        <Grid item lg={4}>
                            <p>Mobile Number</p>
                        </Grid>
                        <Grid item lg={4}>
                            <p>Date of Birth</p>
                        </Grid>
                        <Grid item lg={4}>
                            
                        </Grid>
                        <Grid item lg={4}>
                            <CustomTextField2  placeholder="Mobile" name="Mobile" value={USERS.Mobile} onChange={handleChange1}/>
                        </Grid>   
                        <Grid item lg={4}>
                            <Box style={{maxWidth:"360px",display:"flex",marginBottom:"10px"}} sx={{'& .MuiOutlinedInput-root':{height: "46px"},'& .MuiInputAdornment-root':{marginRight:"0"}}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} style={{marginRight:"10px",height:"40px"}}>
                                <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={time}
                                onChange={handleChange3}
                                disableFuture
                                components={{OpenPickerIcon:datepickericon}}
                                renderInput={(params) => <TextField {...params} />}
                                InputAdornmentProps={
                                    {position:'start'}
                                }
                                />
                                </LocalizationProvider>
                            </Box>
                        </Grid>    
                    </Grid>
                    <div className="detail-div">
                        <h1>My preferred Langauge</h1>
                        <Select
                            value={lan}
                            onChange={handleChange2}
                            displayEmpty
                            IconComponent={()=>(
                                <img src={adminarrow} style={{marginRight:"10px"}}/>
                            )
                           }
                            inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                            className="select"
                            >
                            <MenuItem value={"English"} >
                                <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>English</em>
                            </MenuItem>
                            <MenuItem value={"Hindi"} >
                                <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>Hindi</em>
                            </MenuItem>
                            <MenuItem value={"Gujarati"}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>Gujarati</em></MenuItem>
                        </Select>
                        <CustomButton onClick={()=>
                        {
                            fetch(`http://localhost:5000/user/${USERS .id}`,{
                            method:"PUT",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                              },
                            body:JSON.stringify(USERS)
                          
                            }).then(res=>res.json()).then(res =>{
                                console.log(JSON.stringify(res))
                            }).catch(e=>console.log(e)) 
                        }}
                        >Save</CustomButton>
                    </div>
                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                          
                        <TableCell className={classes.tableHeaderCell}>
                          <div className={classes.flexdiv}>Addresses:</div>
                        </TableCell>
                        <TableCell className={classes.tableHeaderCell} align="right">
                          <div className={classes.flexdiv} >Actions</div>
                        </TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Address.map((i:any,index:any)=>{
                                return(
                                    <TableRow >
                                        <TableCell >
                                            <p style={{marginBottom:"10px"}}><strong className={classes.flexdiv}>Address:</strong>{i.HouseNumber+","+i.StreetName+","+i.City+","+i.PostalCode+"."}</p>
                                            <p ><strong className={classes.flexdiv}>Phone Number:</strong>{i.MobileNumber}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                           <img src={edit} style={{width:"30px",height:"30px",marginRight:"10px"}} onClick={()=>{
                                               handleOpen1()
                                               setdummy(i)
                                           }}></img>
                                           <img src={delete1} style={{width:"30px",height:"30px"}} onClick={()=>{
                                               fetch(`http://localhost:5000/Address/${i.id}`,{
                                                method:"DELETE"
                                                }).then(res=>res.json()).then(res =>{
                                                    console.log(res)
                                                }).catch(e=>console.log(e))
                                                setupdate(!update)
                                           }}></img>
                                        </TableCell>
                                    </TableRow>
                                )
                              })
                          }
                    </TableBody>
                    {/* ==========Edit-address============= */}
                    <Modal
                     open={open1}
                     onClose={handleClose1}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                     >
                        <Box className={classes.modal}>
                          {/* <img src={close} onClick={handleClose} style={{position:"absolute",top:"5%",right:"5%",height:"20px",width:"20px",cursor:"pointer"}}></img> */}
                          <CloseIcon onClick={handleClose1} style={{float:"right", color:"#646464"}}/>
                          <div className="Mydetails">
                            <Grid container style={{margin:"30px 0"}}>
                                <Grid item lg={6}>
                                    <p>Street name</p>
                                </Grid>
                                <Grid item lg={6}>
                                    <p>House Number</p>
                                </Grid>
                            
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="Street name" name="StreetName" onChange={addresschange} value={dummy.StreetName}/>
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="House Number" name="HouseNumber" onChange={addresschange} value={dummy.HouseNumber}/>
                                </Grid>
                                    <Grid item lg={6}>
                                        <p style={{marginTop:"10px"}}>Postal Code</p>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <p style={{marginTop:"10px"}}>City</p>
                                    </Grid>

                                    <Grid item lg={6} >
                                        <CustomTextField2  placeholder="Postal Code" name="PostalCode" onChange={addresschange} value={dummy.PostalCode} style={{marginBottom:"10px"}}/>
                                    </Grid>
                                    <Grid item lg={6} >
                                        <CustomTextField2  placeholder="City" name="City" value={dummy.City} onChange={addresschange} className={classes.margin}/>
                                    </Grid>
                               
                                <Grid item lg={6}>
                                    <p>Phone Number</p>
                                </Grid>
                                <Grid item lg={6}>
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="Phone Number" name="MobileNumber" onChange={addresschange} value={dummy.MobileNumber}/>
                                </Grid>
                            </Grid>
                            </div>
                            <CustomButton style={{width:"575px"}} onClick={()=>{
                                 fetch(`http://localhost:5000/Address/${dummy.id}`,{
                                    method:"PUT",
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                      },
                                    body:JSON.stringify(dummy)
                                  
                                    }).then(res=>res.json()).then(res =>{
                                        console.log(res)
                                        console.log(JSON.stringify(dummy))
                                    }).catch(e=>console.log(e))
                                    setOpen1(false)
                                    setupdate(!update)
                            }}>Edit</CustomButton>
                        </Box>
                    </Modal>
                    {/* ===========add-address============ */}
                    <Modal
                     open={open2}
                     onClose={handleClose2}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                     >
                        <Box className={classes.modal}>
                          {/* <img src={close} onClick={handleClose} style={{position:"absolute",top:"5%",right:"5%",height:"20px",width:"20px",cursor:"pointer"}}></img> */}
                          <CloseIcon onClick={handleClose2} style={{float:"right", color:"#646464"}}/>
                          <div className="Mydetails">
                            <Grid container style={{margin:"30px 0"}}>
                                <Grid item lg={6}>
                                    <p>Street name</p>
                                </Grid>
                                <Grid item lg={6}>
                                    <p>House Number</p>
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="Street name" name="StreetName" onChange={addresschange1} value={NewAdress.StreetName}/>
                                    {!NewAdress.StreetName && displayerror &&<p style={{color:"red"}}>**Streetname is required</p>}
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="House Number" name="HouseNumber" onChange={addresschange1} value={NewAdress.HouseNumber}/>
                                    {!NewAdress.HouseNumber && displayerror &&<p style={{color:"red"}}>**House Number is required</p>}                                </Grid>
                                    <Grid item lg={6}>
                                        <p style={{marginTop:"10px"}}>Postal Code</p>
                                    </Grid>
                                    <Grid item lg={6}>
                                        <p style={{marginTop:"10px"}}>City</p>
                                    </Grid>

                                    <Grid item lg={6} >
                                        <CustomTextField2  placeholder="Postal Code" name="PostalCode" onChange={addresschange1} value={NewAdress.PostalCode} style={{marginBottom:"10px"}}/>
                                        {!NewAdress.PostalCode && displayerror &&<p style={{color:"red"}}>**PostalCode is required</p>}  
                                    </Grid>
                                    <Grid item lg={6} >
                                        <CustomTextField2  placeholder="City" name="City" value={NewAdress.City} onChange={addresschange1} className={classes.margin}/>
                                        {!NewAdress.City && displayerror &&<p style={{color:"red"}}>**City Name is required</p>}  
                                    </Grid>
                               
                                <Grid item lg={6}>
                                    <p>Phone Number</p>
                                </Grid>
                                <Grid item lg={6}>
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomTextField2  placeholder="Phone Number" name="MobileNumber" onChange={addresschange1} value={NewAdress.MobileNumber}/>
                                    {!NewAdress.MobileNumber && displayerror &&<p style={{color:"red"}}>**Mobile number is required</p>}  

                                </Grid>
                            </Grid>
                            </div>
                            <CustomButton style={{width:"575px"}} onClick={()=>{
                                setdisplayerror(true)
                                if(NewAdress.StreetName!="" && NewAdress.HouseNumber!="" && NewAdress.PostalCode!="" && NewAdress.City!="" && NewAdress.MobileNumber!="" )
                                {
                                    fetch("http://localhost:5000/Address",{
                                        method:"POST",
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8"
                                          },
                                        body:JSON.stringify(NewAdress)
                                      
                                        }).then(res=>res.json()).then(res =>{
                                            console.log(res)
                                        }).catch(e=>console.log(e))
                                        setOpen2(false)
                                        setupdate(!update)
                                        NewAdress.StreetName=NewAdress.HouseNumber=NewAdress.PostalCode=NewAdress.City=NewAdress.MobileNumber=""
                                }
                                
                            }}>Add</CustomButton>
                        </Box>
                    </Modal>
                </Table>
                <CustomButton style={{width:"200px"}} onClick={()=>{handleOpen2()
                    setNewAddress({...NewAdress,userId:UID})
                }}>Add new Address</CustomButton>
                </TabPanel>
  
                <TabPanel value={value} index={2}>
                    <div className={classes.Password}>
                        <p className={classes.margin}>Old password</p>
                        <CustomTextField2  placeholder="Current Password" name="Oldpass" type="password" value={passwords.Oldpass} onChange={passwordchange} className={classes.margin}/>
                        {!passwords.Oldpass && displayerror1 &&<p style={{color:"red"}}>**Old password is required</p>}  

                        <p className={classes.margin}>New password</p>
                        <CustomTextField2  placeholder="Password" name="Newpass" type="password"  onChange={passwordchange} value={passwords.Newpass}/>
                        {!passwords.Newpass && displayerror1 &&<p style={{color:"red"}}>**New password is required</p>}  

                        <p className={classes.margin}>Confirm password</p>
                        <CustomTextField2  placeholder="Confirm Password" name="Confirmpass" type="password" onChange={passwordchange} value={passwords.Confirmpass}/>
                        {!passwords.Confirmpass && displayerror1 &&<p style={{color:"red"}}>**Confirm password is required</p>}  

                        <CustomButton style={{width:"100px",marginTop:"10px"}} onClick={()=>{
                            setupdate(!update)
                            setdisplayerror1(true)
                            if(passwords.Oldpass!="" && passwords.Newpass!="" && passwords.Confirmpass!=""){
                                fetch(`http://localhost:5000/user?q=${UID}`,{
                                    method:"GET",
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                      },
                                    }).then(res=>res.json()).then(res =>{
                                            console.log(res[0])
                                            if(res[0].Password==passwords.Oldpass && passwords.Newpass == passwords.Confirmpass)
                                            {
                                                let data={Password:passwords.Newpass,ConfirmPassword:passwords.Newpass}
                                                console.log("data:"+data)
                                                fetch(`http://localhost:5000/user/${UID}`,{
                                                    method:"PATCH",
                                                    headers: {
                                                        "Content-type": "application/json; charset=UTF-8"
                                                      },
                                                    body:JSON.stringify(data)
                                                    }).then(res=>res.json()).then(res =>{
                                                         console.log(res)
                                                    })
                                                    toast.success("Password updated succesfully",{position: "top-center"})
                                            }
                                            else if(passwords.Newpass != passwords.Confirmpass && res[0].Password!=passwords.Oldpass)
                                            {
                                                toast.error("You entered Wrong password and New Password and Confirm password Didn't match ",{position: "top-center"})
                                            }
                                            else if(res[0].Password!=passwords.Oldpass)
                                            {
                                                toast.error("You entered Wrong password",{position: "top-center"})
                                            }
                                            else
                                            {
                                                toast.error("Passwors and Confirm password Didn't match",{position: "top-center"})
                                            }
                                    })
                            }
                            
                        }} >Save</CustomButton>
                    </div>
                </TabPanel>
            </Box>
            </Container>
            <ToastContainer/>
        </>
    );
}



export default SettingDashboard;