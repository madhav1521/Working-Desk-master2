import { Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { borderBottom, Box } from "@mui/system";
import {adminarrow,edit,delete1, calendarbookservice, a1, a2, a3, a4, a5} from '../assets/images';
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
        width:"465px",
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
  function unchecked(imgname:any){
    return(
        <>
        <div>
            <img src={imgname} alt={imgname}/>
            </div>
            
        </>
    );
  };
  
function check(imgname:any){
    return(
        <>
        <div style={{border: "3px solid #1D7A8C",borderRadius: "50%"}}>
            <img src={imgname} alt="logo"/>
        </div>
        </>
    );
  };
function UpcomingSetting(props:any) {
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
        DOB:"",
        Gender:"",
        StreetName:"",
        HouseNumber:"",
        PostalCode:"",
        City:"",
        MobileNumber:"",
        status:"",
        avtar:null
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
        setadd({...USERS,DOB:a})
      };

    const [radio,setradio]=useState(USERS.avtar);
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
                setTime(res[0].DOB)
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
        setadd({...USERS,[name]:value})
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
                        <Tab label="Change password" {...a11yProps(1)} />
                    </AntTabs>
                </Box>
                <TabPanel value={value} index={0}>
                <div className="Mydetails">
                    <h2>Account Status: <strong style={{color:"#00e600"}}>{USERS.status}</strong></h2>
                    <div className="basic-title" >
                        <div >
                            Basic Details
                        </div>
                        {
                            USERS.avtar =="a1"?
                                <img src={a1} alt={USERS.avtar}></img>
                            :
                            USERS.avtar =="a2"?
                                <img src={a2} alt={USERS.avtar}></img>
                            :
                            USERS.avtar =="a3"?
                                <img src={a3} alt={USERS.avtar}></img>
                            :
                            USERS.avtar =="a4"?
                                <img src={a4} alt={USERS.avtar}></img>
                            : <img src={a5} alt={USERS.avtar}></img>
                        }
                    </div>
                    
                    <Grid container style={{}}>
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
                            <p>Nationality</p>
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
                        <Grid item lg={4}>
                            <Select
                                value={lan}
                                onChange={handleChange2}
                                displayEmpty
                                IconComponent={()=>(
                                    <img src={adminarrow} style={{marginRight:"10px"}}/>
                                )
                               }
                                inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                style={{height:"46px",width:"250px"}}
                                >
                                <MenuItem value={"English"} >
                                    <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>English</em>
                                </MenuItem>
                                <MenuItem value={"Hindi"} >
                                    <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>Hindi</em>
                                </MenuItem>
                                <MenuItem value={"Gujarati"}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>Gujarati</em></MenuItem>
                            </Select>
                        </Grid>  
                        <FormControl>
                            {/* {console.log("genderr:",USERS.Gender)} */}
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue={USERS.Gender}
                                  name="radio-buttons-group"
                                  style={{flexDirection:"row"}}
                                  value={USERS.Gender}
                                  onChange={(e)=>{setradio(e.target.value)
                                    setadd({...USERS,Gender:e.target.value})
                                }}
                                  
                                >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            
                    </Grid>
                    {!USERS.Gender && displayerror &&<p style={{color:"red"}}>**Please select Gender</p>}
                    <FormLabel id="demo-radio-buttons-group-label">Select Avtar</FormLabel><br/>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={USERS.avtar}
                        name="radio-buttons-group"
                        style={{flexDirection:"row",justifyContent:"space-around"}}
                        value={USERS.avtar}
                        onChange={(e:any)=>{setadd({...USERS,avtar:e.target.value})}} >

                        <FormControlLabel value={"a1"} control={<Radio icon={unchecked(a1)} checkedIcon={check(a1)}/>} label="" />
                        <FormControlLabel value={"a2"} control={<Radio icon={unchecked(a2)} checkedIcon={check(a2)}/>} label="" />
                        <FormControlLabel value={"a3"} control={<Radio icon={unchecked(a3)} checkedIcon={check(a3)}/>} label="" />
                        <FormControlLabel value={"a4"} control={<Radio icon={unchecked(a4)} checkedIcon={check(a4)}/>} label="" />
                        <FormControlLabel value={"a5"} control={<Radio icon={unchecked(a5)} checkedIcon={check(a5)}/>} label="" />
                        </RadioGroup>
                        
                        {!USERS.avtar && displayerror &&<p style={{color:"red"}}>**Avtar is required</p>}
                    <Grid container style={{margin:"30px 0"}}>
                                <Grid item lg={4}>
                                    <p>Street name</p>
                                </Grid>
                                <Grid item lg={4}>
                                    <p>House Number</p>
                                </Grid>
                                <Grid item lg={4}>
                                        <p style={{marginTop:"10px"}}>Postal Code</p>
                                    </Grid>
                                <Grid item lg={4}>
                                    <CustomTextField2  placeholder="Street name" name="StreetName" onChange={addresschange1} value={USERS.StreetName}/>
                                    {!USERS.StreetName && displayerror &&<p style={{color:"red"}}>**Streetname is required</p>}
                                </Grid>
                                <Grid item lg={4}>
                                    <CustomTextField2  placeholder="House Number" name="HouseNumber" onChange={addresschange1} value={USERS.HouseNumber}/>
                                    {!USERS.HouseNumber && displayerror &&<p style={{color:"red"}}>**House Number is required</p>}                               
                                 </Grid>
                                <Grid item lg={4} >
                                    <CustomTextField2  placeholder="Postal Code" name="PostalCode" onChange={addresschange1} value={USERS.PostalCode} style={{marginBottom:"10px"}}/>
                                    {!USERS.PostalCode && displayerror &&<p style={{color:"red"}}>**PostalCode is required</p>}  
                                </Grid>
                                    <Grid item lg={4}>
                                        <p>City</p>
                                        <CustomTextField2  placeholder="City" name="City" value={USERS.City} onChange={addresschange1} className={classes.margin}/>
                                        {!USERS.City && displayerror &&<p style={{color:"red"}}>**City Name is required</p>} 
                                    </Grid>
                           
                                <Grid item lg={6}>
                                    <p>Phone Number</p>
                                    <CustomTextField2  placeholder="Phone Number" name="MobileNumber" onChange={addresschange1} value={USERS.MobileNumber}/>
                                    {!USERS.MobileNumber && displayerror &&<p style={{color:"red"}}>**Mobile number is required</p>}  
                                </Grid>
                                <Grid item lg={6}>

                                </Grid>
                                <Grid item lg={6}>
                                    

                                </Grid>
                            </Grid>
                    <div className="detail-div">
                        <CustomButton style={{marginTop:"10px"}} onClick={()=>
                        {
                            setdisplayerror(true)
                            if(USERS.StreetName!="" && USERS.HouseNumber && USERS.avtar && USERS.PostalCode && USERS.City && USERS.MobileNumber && USERS.Gender)
                            {
                                
                                fetch(`http://localhost:5000/user/${USERS.id}`,{
                                method:"PUT",
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                  },
                                body:JSON.stringify(USERS)
                              
                                }).then(res=>res.json()).then(res =>{
                                    // console.log(JSON.stringify(res))
                                    toast.success("Details updated succesfully",{position: "top-center"})
                                    // props.render()
                                }).catch(e=>console.log(e)) 
                            }
                        }}
                        >Save</CustomButton>
                    </div>
                </div>
                </TabPanel>
                
                <TabPanel value={value} index={1}>
                    <div className={classes.Password}>
                        <p className={classes.margin}>Old password</p>
                        <CustomTextField2  placeholder="Current Password" name="Oldpass" type="password" value={passwords.Oldpass} onChange={passwordchange} className={classes.margin}/>
                        {!passwords.Oldpass && displayerror1 &&<p style={{color:"red"}}>**Old password is required</p>}  

                        <p className={classes.margin}>New password</p>
                        <CustomTextField2  placeholder="Password" name="Newpass" type="password"  onChange={passwordchange} className={passwords.Newpass}/>
                        {!passwords.Newpass && displayerror1 &&<p style={{color:"red"}}>**New password is required</p>}  

                        <p className={classes.margin}>Confirm password</p>
                        <CustomTextField2  placeholder="Confirm Password" name="Confirmpass" type="password" onChange={passwordchange} className={passwords.Confirmpass}/>
                        {!passwords.Newpass && displayerror1 &&<p style={{color:"red"}}>**Confirm password is required</p>}  

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
                                            if(res[0].Password == passwords.Oldpass && passwords.Newpass == passwords.Confirmpass)
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
                                                         console.log(res[0])
                                                    })
                                                    toast.success("Password updated succesfully",{position: "top-center"})
                                            }
                                            else if(passwords.Newpass !== passwords.Confirmpass && res[0].Password !== passwords.Oldpass)
                                            {
                                                toast.error("You entered Wrong password and New Password and Confirm password Didn't match ",{position: "top-center"})
                                            }
                                            else if(res[0].Password !== passwords.Oldpass)
                                            {
                                                toast.error("You entered Wrong password",{position: "top-center"})
                                            }
                                            else 
                                            {
                                                toast.error("Password and Confirm password Didn't match",{position: "top-center"})
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



export default UpcomingSetting;