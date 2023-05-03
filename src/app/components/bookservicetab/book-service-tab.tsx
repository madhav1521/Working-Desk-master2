import { Alert, Button, Checkbox, Container, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import {details,setupservice,schedulewhite,payment,calendarbookservice,polygon,img1,img2,img3,img4,img5,green1,green5,green2,green3,green4, success} from '../../assets/images';
import { borderBottom, Box } from "@mui/system";
import React,{createContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ClassNames } from "@emotion/react";
import { Pincodevalidation } from "../../validation/validation";
import AddAddress from "../addAddress";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { useHistory  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Bath, Datee, ExtraService, Rooms, ServiceHours, Time } from "./bookserviceRedux";

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
        background: "#1D7A8C"
    },
    '& .MuiTab-root': {
        color:"#646464",
        fontSize:"18px",
        background:"#F3F3F3",
        lineHeight:"24px",
        textTransform:"capitalize",
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    '& .MuiTab-root.Mui-selected': {
        background: "#1D7A8C",
        color:"white",
    },
    '& .MuiTabs-flexContainer':{
        
    },
    '& .MuiButtonBase-root':{
        padding:"0px",
        minHeight:"67px"
    },

    '@media(max-width:767.98px)':{
        '& .MuiTabs-flexContainer':{
            flexWrap:"wrap"
        },
        '& .MuiTabs-indicator': {
            background: "none"
        },

    },
    '@media(max-width:575.98px)':{
        '& .MuiTabs-flexContainer':{
            justifyContent:"center"
        },
        '& .MuiButtonBase-root':{
            minHeight:"45px",
            justifyContent:"flex-start"
        },
    },

});
const useStyles = makeStyles(() => ({
    select1:{
        width:"101px",
        height:"46px",
        margin:"8px 10px 31px 0"
    },
    select2:{
        width:"156px",
        height:"46px",
        marginTop:"10px",
    },
    numberdiv:{
        display:"flex"
    },
    box:{
        borderBottom:"1px solid #DCDCDC"
    },
    datepicker:{
        maxWidth:"261px",
        marginTop:"10px",
        display:"flex"
    },
    timepicker:{
        marginLeft:"10px"
    },
    gridhover:{
        margin:"0 auto",
        justifyContent:"space-around",
        "&:hover":{
            curser:"pointer"
        }
    },
    marginr:{
        marginRight:"0px"
    },
    mainbox:{
        maxWidth:"750px",
        padding:"0px",
        height:"67px"
    },
    tabpadding:{padding:"0px"},
    tabWidth:{
        width:"183px"
    },
    tabWidth1:{
        width:"201px"
    },
    '@media(max-width: 1150px)':{
      mainbox:{
          height:"auto",
          margin:"0 auto"
      }
    },
    '@media(max-width: 767.98px)':{
        tabpadding:{
            padding:"0 20px"
        },
        tabWidth:{
            width:"201px"
        },
      
    },
    '@media(max-width: 575.98px)':{
        tabpadding:{
            maxWidth:"535px"
        },
        imgmargin:{
            marginLeft:"21px"
        },
        tabWidth:{
            width:"250px"
        },
        tabWidth1:{
            width:"250px"
        },
    },
 
  }));
const CustomTextField = styled(TextField)({
    
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0",
        color:"#A0A0A0",
        fontSize:"16px",
        lineHeight:"32px",
   },
   '& .MuiOutlinedInput-root':{
       height:"46px",
       width:"320px"
   },

});
const CustomTextField2 = styled(TextField)({
    

   '& .MuiOutlinedInput-root':{
       height:"100px",
       width:"750px",
       marginBottom:"15px"
   },

});
  const CustomTextField1 = styled(TextField)({
 
   '& .MuiOutlinedInput-root':{
       height:"70px",
       width:"738px"
   },
   '@media(max-width:767.99px)':{
    '& .MuiOutlinedInput-root':{
        width:"575px"
    },
    },
    '@media(max-width:575.98px)':{
        '& .MuiOutlinedInput-root':{
            width:"320px"
        },
    }
});
const CustomTextField3 = styled(TextField)({
 
    '& .MuiOutlinedInput-root':{
        height:"46px",
        width:"320px"
    },
    
 });
const CustomCheckbox = styled(Checkbox)({
    height:"18px",
    width:"18px",
    '& .MuiSvgIcon-root':{
        fill: "#C8C8C8",
    }
});
const CustomCheckbox1 = styled(Checkbox)({
    height:"22px",
    width:"22px",
    '& .MuiSvgIcon-root':{
        fill: "#C8C8C8",
    }
});
const CustomButton = styled(Button)({

    width: "141px",
    height: "46px",
    margin:"34px 0 0 auto",
    background: "#1D7A8C",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"24px",
    display:"block",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    },
    '@media(max-width: 1150px)':{
        margin:"34px auto"
    }
        
});
const Checkavailibility = styled(Button)({

    width: "190px",
    height: "46px",
    marginLeft:"15px",
    background: "#1D7A8C",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"24px",
    display:"block",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252",
    },
   
        
});
const AddAdress = styled(Button)({

    width: "250px",
    height: "46px",
    margin:"10px 0 0 0",
    border:"2px solid #1D7A8C",
    borderRadius: "23px",
    color:"#1D7A8C",
    fontSize:"20px",
    lineHeight:"24px",
    fontWeight:"700",
    display:"block",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#1D7A8C",
        color:"#FFFFFF"
    },
        
});
const ApplyButton = styled(Button)({

    width: "150px",
    height: "46px",
    margin:"0 0 0 10px",
    border:"2px solid #1D7A8C",
    borderRadius: "23px",
    color:"#1D7A8C",
    fontSize:"20px",
    lineHeight:"24px",
    fontWeight:"700",
    display:"block",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#1D7A8C",
        color:"#FFFFFF"
    },    
});
const CompleteButton = styled(Button)({

    width: "200px",
    height: "46px",
    margin:"34px 0 0 auto",
    background: "#1D7A8C",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"24px",
    display:"block",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    },
    '@media(max-width: 1150px)':{
        margin:"34px auto"
    }
        
});
function Setupservice(){
    return(
        <img src={setupservice} style={{marginRight:"7.5px"}} className="imgmargin"></img>
    );
  };
  function Schedulewhite(){
    return(
        <img src={schedulewhite} style={{marginRight:"7.5px"}} className="imgmargin"></img>
    );
  };
  function Detailsicon(){
    return(
        <img src={details} style={{marginRight:"6.5px"}} className="imgmargin"></img>
    );
  };
function Payment(){
    return(
        <img src={payment} style={{marginRight:"6.5px"}} className="imgmargin"></img>
    );
  };
  function datepickericon(){
    return(
        <img src={calendarbookservice}></img>
    );
  };
  function polygonicon(){
    return(
        <img src={polygon} style={{transform: "rotate(-90deg)"  }}></img>
    );
  };
function unchecked(imgname:any,cl:any){
    return(
        <>
        <div className="service-items">
            <img src={imgname} alt="logo" className={cl}/>
            </div>
            
        </>
    );
  };
  
function check(imgname:any,cl:any){
    return(
        <>
        <div className="service-items1">
            <img src={imgname} alt="logo" className={cl+"3"}/>
        </div>
        </>
    );
  };
function TabComponent(props:any) {
    const history=useHistory ();
    const [value, setValue] = React.useState(0);
    
    //   const [time1, setTime1] = React.useState<Date | null>();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const dispatch=useDispatch();
    
    // ======modal=======
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => 
    { 
        if(complete){
            setOpen(true);
            setValue(0); 
        }
        else
        toast.error("please accept term and conditions!",{position: "top-center"});
    }
    const handleClose = () => {
        setOpen(false)
        history.push("./history")
    };
    // ==================
    const classes = useStyles();
    const [bed, setbed] = React.useState('0');
    const [bath, setbath] = React.useState('0');
    const [hour, setAge2] = React.useState('3');
    const [time, setTime] = React.useState<Date | null>(new Date());
    const [ExtraS,setExtraS]=useState([
        {serviceName:"Inside cabinets"   ,src:img1,checked:false,clicked:green1,classname:"extra-service-img1"},
        {serviceName:"Inside fridge"     ,src:img5,checked:false,clicked:green5,classname:"extra-service-img2"},
        {serviceName:"Inside oven"       ,src:img4,checked:false,clicked:green4,classname:"extra-service-img3"},
        {serviceName:"Laundry wash & dry",src:img2,checked:false,clicked:green2,classname:"extra-service-img4"},
        {serviceName:"Interior windows"  ,src:img1,checked:false,clicked:green3,classname:"extra-service-img5"},
    ]
   )
   const[extraservice,setservice]=useState([]);
    const [formdata,setformdata]=useState({
        Rooms:bed,
        Bath:bath,
        Date:"22-08-2021",
        Time:null,
        ServiceHours:"3",
        ExtraService:{
            "Inside cabinets":false,
            "Inside fridge":false,
            "Inside oven":false,
            "Laundry wash & dry":false,
            "Interior windows":false
        },
        Comments:"",
        ServiceId:Math.floor(100000 + Math.random() * 900000),
        ServiceAddress:"",
        Email:"",
        Mobile:"",
        status:"",
        FirstName:"",
        LastName:"",
        datetime:null,
        Postalcode:""
        // Totaltime:0,
        // Payment:60,
        // EffPeyment:0
    })
    const handleChange1 = (event: SelectChangeEvent) => {
        setbed(event.target.value);
      setformdata({...formdata,Rooms:event.target.value})
      dispatch(Rooms(event.target.value))

    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setbath(event.target.value);
        setformdata({...formdata,Bath:event.target.value})
        dispatch(Bath(event.target.value))
    };
    const handleChange3 = (date: Date | null) => {
        
        
        // let c=moment(new Date()!).format('DD-MM-YYYY')
        // let d=moment(new Date()!).format('h:mm A')
        let a=moment(date!).format('DD-MM-YYYY')
        let b=moment(date!).format('HH:mm')
        setTime(date)
        // if(c > a){
        //     toast.error("please Enter Valid Date!",{position: "top-center"});
        // }
        // if(c == a){
        //     if(d > b){
        //         toast.error("please Enter Valid time!",{position: "top-center"});
        //     }
        // }
        dispatch(Datee(a))
        dispatch(Time(b))
        setformdata({...formdata,Date:a,Time:b,datetime:date})
      };
    const handleChange4 = (event: SelectChangeEvent) => {
        setAge2(event.target.value);
        setformdata({...formdata,ServiceHours:event.target.value})
        dispatch(ServiceHours(event.target.value))
      };
     
    const [pincode,setpincode]=useState("");
    const pincodeChange = (e:any) =>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setpincode(value)
    } 
    
    //   =========alert====================
    type AlertType={
        showAlert:boolean
        status:"success" | "error"
        message:string | React.ReactNode
    }
    const [alertt,setalertt]=useState<AlertType>({
        showAlert:false,
        status:"success",
        message:" "
    })
    const AlertMenu = () =>{ return <Alert severity={alertt.status} style={{marginBottom:"10px"}}>{alertt.message}</Alert> }
    
    // =====================================

    const [checked, setChecked] = React.useState(false);
    const [complete, setcomplete] = React.useState(false);
    const handleCheck = (event:any) => {
        setChecked(event.target.checked);
      };
    const handlecomment = (event:any) => {
        setformdata({...formdata,Comments:event.target.value});
      };
    const submitdetail =(e:React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            let user=JSON.parse(localStorage.getItem('user')|| '{}')
            console.log("email:"+user.Email)
            fetch(`http://localhost:5000/user?q=${user.Email}`,{
            method:"GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            }).then(res=>res.json()).then(res =>{
                    let userId=res[0].id
                    let data={...formdata,Pet:checked,userId:userId,ServiceAddress:radio,Email:user.Email,FirstName:res[0].FirstName,LastName:res[0].LastName}
                    fetch("http://localhost:5000/Bookservice",{
                    method:"POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                    body:JSON.stringify(data)
                  
                    }).then(res=>res.json()).then(res =>{
                        console.log(res)
                        console.log(JSON.stringify(data))
                        // history.push("/upcoming");
                    }).catch(e=>console.log(e))

            }).catch(e=>console.log(e))
            
            // return confirm("continue")
      }
      const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const error=Pincodevalidation(pincode)
        console.log(error)
        
        if(error.length == 0 && pincode.toString().length == 6){
            let data=pincode;
            fetch(`http://localhost:5000/postalCode?q=${data}`,{
                method:"GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
            }).then(res=>res.json()).then(res =>{
                console.log(res.length)
                if(res.length==0){
                    setalertt({
                        showAlert:true,
                        status:"error",
                        message:"Service is not available for current postal code"  
                    })
                    
                    console.log("res:"+res)
                }
                else{
                    setalertt({
                        showAlert:true,
                        status:"success",
                        message:"Service is available for current postal code.Please Click on schedule and plan Tab"  
                    })
                    setValue(1)
                    console.log("res:"+res)
                    console.log("Service is available for current postal code.Please continue")
                }
            }).catch(e=>console.log(e))
        }
        else{
            if(pincode.toString().length!=6)
            {
                setalertt({
                    showAlert:true,
                    status:"error",
                    // message:error.map((item)=>{console.log(item);<p key={item + "1"}>{item}<br/></p>})
                    message:"Please Enter valid pincode"
                })
            }
            else
            {
                setalertt({
                    showAlert:true,
                    status:"error",
                    // message:error.map((item)=>{console.log(item);<p key={item + "1"}>{item}<br/></p>})
                    message:"Please fill the postal code"
                })
            }
           
        }

    }
    const [address, setaddress] = useState(false);
    const addnew = () =>{
        setaddress(!address)
        
    }
    
    const [add , setadd] = useState<string[]>([]); 
    const [radio,setradio]=useState(" ");
    const fetchAddress=() => {
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        console.log(formdata.ExtraService)
        fetch(`http://localhost:5000/user?q=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        }).then(res=>res.json()).then(res =>{
                    let a=res[0].id
                    fetch(`http://localhost:5000/Address?userId=${a}`,{
                    method:"GET",
                    headers: {
                       "Content-type": "application/json; charset=UTF-8"
                    },
                }).then(res=>res.json()).then(res =>
                {
                    add.splice(0,10000);
                    res.map((i:any)=>{
                    let ad=i.HouseNumber+","+i.StreetName+","+i.City+","+i.PostalCode+","+"Mobile:"+i.MobileNumber;
                    setadd(add => [...add, ad]);  
                })
                }).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }
    // const fetchAddress=() => {
        
    //                 fetch(`http://localhost:5000/Address?userId=1`,{
    //                 method:"GET",
    //                 headers: {
    //                    "Content-type": "application/json; charset=UTF-8"
    //                 },
    //             }).then(res=>res.json()).then(res =>
    //             {
    //                 add.splice(0,10000);
    //                 res.map((i:any)=>{
    //                 let ad=i.HouseNumber+","+i.StreetName+","+i.City+","+i.PostalCode+","+"Mobile:"+i.MobileNumber;
    //                 setadd(add => [...add, ad]); 
    //                 console.log("again called") 
    //             })  
    //             }).catch(e=>console.log(e))
    // }
    // const useadd =() => {
    //     fetch('http://localhost:5000/Address',{
    //         method:"GET",
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         },
    //     }).then(res=>res.json()).then(res =>
    //     {
    //         res.map((i:any)=>{
    //             let ad=i.HouseNumber+","+i.StreetName+","+i.City+","+i.PostalCode+","+"Mobile:"+i.MobileNumber;
    //             // add.push(ad); 
    //             setadd(add => [...add, ad]);  
    //         })
            
    //         add.map((i:any)=>{
    //            console.log(i)  
    //         })
       
            
    //     }).catch(e=>console.log(e))
    // }
    // const setsubdata=()=>{
    //     setformdata({...formdata,ExtraService:extraservice})
    // }

   
    return (
        <>
        {props.onpass(formdata)}
        
            <Box className={classes.mainbox}>
                <Box>
                    <AntTabs value={value} aria-label="basic tabs example">
                        <Tab icon={<Setupservice />} iconPosition="start" label="Setup Service" {...a11yProps(0)} className={classes.tabWidth}/>
                        <Tab icon={<Schedulewhite />}iconPosition="start" label="Schedule & Plan" {...a11yProps(1)} className={classes.tabWidth} /> 
                        <Tab icon={<Detailsicon />}iconPosition="start" label="Your Details" {...a11yProps(2)} className={classes.tabWidth}/>
                        <Tab icon={<Payment />}iconPosition="start" label="Make Payment" {...a11yProps(3)} className={classes.tabWidth}/>
                    </AntTabs>
                    
                </Box>
                
                <TabPanel value={value} index={0}>
                    <div className="select-pincode">
                        <p>Enter your postal code</p>
                        <div>
                            <form  onSubmit={submitform} >
                                <CustomTextField placeholder="Postal code" type="text" name="Postalcode" onChange={pincodeChange} value={pincode}/>
                                <Checkavailibility type="submit">Check Availability</Checkavailibility>
                            </form>
                        </div>
                        {alertt.showAlert ? <Alert severity={alertt.status} style={{maxWidth:"289px",marginTop:"10px"}}>{alertt.message}</Alert> : null}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabpadding}>
                    <>
                    <form>
                        <div className="select-room">
                            <p>Select number of rooms and bath</p>
                            <Box className={classes.box}>
                                <Select
                                   value={bed}
                                    onChange={handleChange1}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                    className={classes.select1}
                                    >
                                    <MenuItem value={0} >
                                        <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>bed</em>
                                    </MenuItem>
                                    <MenuItem value={1} >
                                        <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>1 bed</em>
                                    </MenuItem>
                                    <MenuItem value={2}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>2 bed</em></MenuItem>
                                    <MenuItem value={3}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>3 bed</em></MenuItem>
                                    <MenuItem value={4}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>4 bed</em></MenuItem>
                                </Select>
                                <Select
                                    value={bath}
                                    onChange={handleChange2}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                    className={classes.select1}
                                    >
                                    <MenuItem value={0} >
                                        <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>bath</em>
                                    </MenuItem>
                                    <MenuItem value={1} ><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>1 bath</em></MenuItem>
                                    <MenuItem  value={2}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>2 bath</em></MenuItem>
                                    <MenuItem  value={3}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>3 bath</em></MenuItem>
                                    <MenuItem  value={4}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>4 bath</em></MenuItem>
                                </Select>
                            </Box>
                        </div>
                        <div className="cleaner-worktime">
                            <div className="sub-worktime1">
                                <p>When do you need the cleaner?</p>
                                <Box className={classes.datepicker} sx={{'& .MuiOutlinedInput-root':{height: "46px"},'& .MuiInputAdornment-root':{marginRight:"0"}}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} style={{marginRight:"10px",height:"40px"}}>
                                    <DesktopDatePicker
                                    inputFormat="dd/mm/yyyy"
                                    disablePast
                                    value={time}
                                    onChange={handleChange3}
                                    components={{OpenPickerIcon:datepickericon}}
                                    renderInput={(params) => <TextField {...params} />}
                                    InputAdornmentProps={
                                        {position:'start'}
                                    }
                                    />
                                    <div style={{width:"10px"}}></div>
                                    <TimePicker
                                    value={time}
                                    components={{OpenPickerIcon:polygonicon}}
                                    minutesStep={60}  
                                    // onChange={(newValue) => {setTime1(newValue);}}
                                    onChange={handleChange3}
                                    className={classes.timepicker}
                                    renderInput={(params) => <TextField {...params} />}
                                     />
                                    
                                </LocalizationProvider>
                                
                                </Box>
                            </div>
                            <div className="sub-worktime2">
                                <p>How long do you need your cleaner to stay?</p>
                                <Select
                                    value={hour}
                                    onChange={handleChange4}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                    className={classes.select2}
                                    >
                                    <MenuItem value={3} >
                                        <em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>3.0 Hrs</em>
                                    </MenuItem>
                                    <MenuItem value={4}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>4.0 Hrs</em></MenuItem>
                                    <MenuItem value={5}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>5.0 Hrs</em></MenuItem>
                                    <MenuItem value={6}><em style={{fontSize:"16px",lineHeight:"24px",color:"#646464"}}>6.0 Hrs</em></MenuItem>
                                </Select>
                                {/* <p>hour:{hour}</p> */}
                            </div>
                        </div>
                        <div className="Extra-service extra-title1">
                            <p className="extra-title">Extra Services</p>
                            <Grid container >
                                
                                {
                                    ExtraS.map((i,index)=>{
                                    return(
                                        
                                        <Grid item lg={2} md={2} sm={4} xs={12} className={classes.gridhover}>
                                            <Checkbox icon={unchecked(i.src,i.classname)} value={i.serviceName} onChange={(e:any)=>{
                                                setservice({...extraservice,[e.target.value]:e.target.checked})
                                                let a=e.target.value;
                                                let variable={...formdata.ExtraService};
                                                variable[a]=e.target.checked;
                                                setformdata({...formdata,ExtraService:variable})
                                                console.log("variable",variable)
                                                dispatch(ExtraService(variable))
                                                }} 
                                                checkedIcon={check(i.clicked,i.classname)}
                                                ></Checkbox>
                                            <div className="service-info1">
                                                <p>{i.serviceName}</p>
                                            </div>
                                        </Grid>
                                        
                                    )
                                    })
                                }
                                
                            </Grid>  
                        </div>
                        <div className="comment-div">
                            <h1>Comments</h1>
                            <CustomTextField1 onChange={handlecomment} value={formdata.Comments}></CustomTextField1>
                        </div>
                        <div className="have-pet">
                            <CustomCheckbox checked={checked} onChange={handleCheck}/>
                            <p>I have pets at home</p>
                        </div>
                
                        <CustomButton type="submit"  onClick={(e:any)=>{
                            if(localStorage.getItem('user') != null){
                                setValue(2);
                                fetchAddress();
                            }
                            else
                            {
                                toast.error("please Login!",{position: "top-center"});
                            }
                            }}>Continue</CustomButton>
                             <CustomButton onClick={()=>{setValue(0)}}>Back</CustomButton>
                        </form>
                        
                    </>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="address-details">
                        <h1>Enter your contact details,so we can serve you in better way!</h1>
                        <div>   
                            {
                                <RadioGroup value={radio} onChange={(e)=>{
                                    setradio(e.target.value)
                                    let a=e.target.value;
                                    setformdata({...formdata,Mobile:a.slice(-10),Postalcode:a.split(',')[3]})
                                    }}
                                >
                                    {  add.map(choice =>
                                        <div className='radio-btn'>
                                            <FormControlLabel value={choice} control={<Radio />} label={<p> <span style={{fontWeight:"bold"}}>Address:</span> {choice.slice(0,-18)}.<br/> <span style={{fontWeight:"bold"}}>Mobile:</span>{choice.slice(-10)} </p> } />
                                        </div>
                                      )
                                    }
                                </RadioGroup>
                            }  
                            {address ? <AddAddress onsub={fetchAddress} onclose={addnew} pincode={pincode}/> : null}
                            <AddAdress onClick={()=>{
                                 addnew()
                                 fetchAddress()}}>+ Add New Address</AddAdress>
                            
                        </div>
                    </div>
                    <CustomButton onClick={()=>{{
                        if(radio == " "){
                            toast.warn("please select Service Address",{position: "top-center"});
                        }
                        else
                        {
                            setValue(3)  
                        }
                    }
                    }}>Continue</CustomButton>
                    <CustomButton onClick={()=>{setValue(1)}}>Back</CustomButton>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div className="payment-details">
                        <p>Pay securely with Helperland payment gateway!</p>
                        <h1>Promo code(optional)</h1>
                        <div className="payment-apply">
                            <CustomTextField3 placeholder="Promo code(optional)"/>
                            <ApplyButton>Apply</ApplyButton>
                        </div>
                        <div className="payment-condtion">
                            <CustomCheckbox1 onChange={(e:any)=>setcomplete(e.target.checked)}/>
                            <h2>I accept the <a href="#">terms and conditions,</a> the <a href="#">cancellation policy</a> and the <a href="#">privacy policy</a>.
                                I confirm from that Helperland starts to execute the contract before the expiry of the withdrawal period
                                and I lose my right of withdrawal as a consumer with full performance of the contract</h2>
                        </div>
                    </div>
                    <CompleteButton onClick={(e:any)=>{
                        handleOpen();
                        if(complete){submitdetail(e)}
                        }}>Complete booking</CompleteButton>
                    <CustomButton onClick={()=>{setValue(2)}}>Back</CustomButton>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box className="complete-box">
                              <img src={success} style={{width:"125px",height:"100px"}}/>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Booking has been successfully submitted
                            </Typography>
                            <p>Service Request id:{formdata.ServiceId}</p>
                            
                          </Box>
                        </Modal>
                </TabPanel>
                <ToastContainer/>
            </Box>
            {/* </Container> */}
        </>
    );
}

export default TabComponent;


