import React, { useEffect, useState } from "react";
import SecondFooter from "../components/secondfooter";
import { SelectChangeEvent } from '@mui/material/Select';
import Navbar2 from "../components/navbar2";
import MTable from "../components/table"
import {adminarrow} from '../assets/images';
import { styled } from '@mui/material/styles';
import { MenuItem, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@mui/system";
import {Select} from "@mui/material";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Newservice from "../components/NewServiceRequest";
import UpcomingHistory from "../components/upcomingHistory";
import UpcomingRating from "../components/UpcomingRating";
import UpcomingBlock from "../components/UpcomingBlock";
import UpcomingSetting from "../components/UpcomingSetting";
// const CustomButton = styled(Button)({

//     width: "166px",
//     height: "46px",
//     background: "#1D7A8C 0% 0% no-repeat padding-box",
//     borderRadius: "23px",
//     color:"#FFFFFF",
//     fontSize:"16px",
//     textTransform:"capitalize",
//     boxShadow: "0px 0px 16px #00000026",
//     '&:hover': {
//         backgroundColor: "#525252"
//     }
// });

const CustomBox = styled(Box)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
        color:"#F1F1F1",
    },
    '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper':{
        backgroundColor:"#1D7A8C",

    },
    '& .MuiOutlinedInput-root': {
        height: "46px",
        width:"100%",
        marginRight:"150px",
        backgroundColor:"#1D7A8C",
   },
   '& .MuiSelect-select':{
    color:"#A0A0A0",
   },
   });
   
   function NewIcon(){
    return(
        <img src={adminarrow} style={{marginRight:"20px"}}></img>
    );
  };
  const useStyles = makeStyles(() => ({
    menuitem:{
        fontSize:"18px",
        lineHeight:"55px",
    }
    
  }));
function Upcoming() {
    const history=useHistory ();
    const [age, setAge] = React.useState('');
    const [USERS , setadd] = useState({
        StreetName:"",
        HouseNumber:"",
        PostalCode:"",
        DOB:"",
        City:"",
        MobileNumber:"",
        Gender:"",

    });
    const [Block,setBlock]=React.useState(false);
    const [History,setHistory]=React.useState(false);
    const [access,setaccess]=useState(false)
    const [Ratting,setRatting]=React.useState(false);
    const [upcoming,setupcoming]=React.useState(false);
    const [NewService,setNewservice]=React.useState(false);
    const [show,setshow]=React.useState(false);
    const classes = useStyles();
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    const [username,setusername]=React.useState('');

    const [render,setrender]=useState(false)


    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        fetch(`http://localhost:5000/user?q=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        }).then(res=>res.json()).then(res =>{
        setusername(res[0].FirstName)
        setadd(res)
        console.log("StreetName",res[0].StreetName)
        console.log("StreetName",res[0].HouseNumber)
        console.log("StreetName",res[0].PostalCode)
        console.log("StreetName",res[0].City)
        console.log("StreetName",res[0].MobileNumber)
        if(res[0].StreetName == undefined || res[0].HouseNumber==undefined || res[0].PostalCode==undefined || res[0].DOB==undefined || res[0].City==undefined || res[0].MobileNumber== undefined || res[0].Gender ==undefined )
        {
            setshow(true)
        }
        else{
            setaccess(true)
            setupcoming(true)
        }
    }).catch(e=>console.log(e))
    },[render])
    
  
    const settingchange = () =>{
        setshow(true)
        setNewservice(false);
        setHistory(false);
        setBlock(false);
        setupcoming(false)
        setRatting(false)
    }
  
    return (
        <div>
        {
            JSON.parse(localStorage.getItem('user')|| '{}') && JSON.parse(localStorage.getItem('user')|| '{}').userTypeId==1?
            <>
            <Helmet>
                <title>Upcoming service</title>
            </Helmet>
            <Navbar2 heading=" " showButton={false} setting={settingchange}></Navbar2>
            <div className="welcome-user">
               <p>Welcome, <span>{username}!</span></p>
            </div>
                
            
            <div className="row">
                <div className="col1">
                    <ul className="menubar">
                        <li><a href="#">Dashboard</a></li>
                        {
                            NewService?
                                <li onClick={()=>{
                                if(access)
                                {
                                    setNewservice(true);
                                    setHistory(false);
                                    setBlock(false);
                                    setupcoming(false)
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }} className="active-button"><a href="#" >New Service Requests</a></li>
                            :
                                <li onClick={()=>{
                                if(access)
                                {
                                    setNewservice(true);
                                    setHistory(false);
                                    setBlock(false);
                                    setupcoming(false)
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">New Service Requests</a></li>
                        }
                        {
                            upcoming?
                                <li className="active-button" onClick={()=>{
                                if(access)
                                {
                                    setupcoming(true);
                                    setHistory(false);
                                    setBlock(false);
                                    setNewservice(false);
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Upcoming Services</a></li>
                            :
                                <li onClick={()=>{
                                if(access)
                                {
                                    setupcoming(true);
                                    setHistory(false);
                                    setBlock(false);
                                    setNewservice(false);
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Upcoming Services</a></li>
                        }
                        <li><a href="#">Service Schedule</a></li>
                        {
                            History?
                                <li className="active-button" onClick={()=>{
                                if(access)
                                {
                                    setupcoming(false);
                                    setHistory(true);
                                    setBlock(false);
                                    setNewservice(false);
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Service History</a></li>
                            :
                                <li onClick={()=>{
                                if(access)
                                {
                                    setupcoming(false);
                                    setHistory(true);
                                    setBlock(false);
                                    setNewservice(false);
                                    setRatting(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Service History</a></li>
                        }
                        
                        {
                            Ratting?
                                <li className="active-button" onClick={()=>{
                                if(access)
                                {
                                    setRatting(true)
                                    setNewservice(false);
                                    setHistory(false);
                                    setBlock(false);
                                    setupcoming(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">My Ratings</a></li>
                            :
                                <li onClick={()=>{
                                if(access)
                                {
                                    setRatting(true)
                                    setNewservice(false);
                                    setHistory(false);
                                    setBlock(false);
                                    setupcoming(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">My Ratings</a></li>
                        }
                        {
                            Block?
                                <li className="active-button" onClick={()=>{
                                    if(access)
                                {
                                    setNewservice(false);
                                    setHistory(false);
                                    setBlock(true);
                                    setRatting(false)
                                    setupcoming(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Block Customer</a></li>
                            :
                                <li onClick={()=>{
                                    if(access)
                                {
                                    setNewservice(false);
                                    setHistory(false);
                                    setBlock(true);
                                    setRatting(false)
                                    setupcoming(false)
                                    setshow(false)
                                    // setrender(!render)
                                }
                                // setrender(!render)
                                }}><a href="#">Block Customer</a></li>
                        }
                    </ul>
                    <div className='toggelbar'>
                        <CustomBox>
                            <Select
                                value={age}
                                onChange={handleChange}
                                IconComponent={NewIcon}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                
                                >
                                <MenuItem value=""  >
                                    <em>Dashboard</em>
                                </MenuItem>
                                <MenuItem value={20} ><Typography>New Service Requests</Typography></MenuItem>
                                <MenuItem value={30} ><Typography>Upcoming Services</Typography></MenuItem>
                                <MenuItem value={40} ><Typography>Service Schedule</Typography></MenuItem>
                                <MenuItem value={50} ><Typography>Service History</Typography></MenuItem>
                                <MenuItem value={60} ><Typography>My Ratings</Typography></MenuItem>
                                <MenuItem value={70} ><Typography>Block Customer</Typography></MenuItem>
                            </Select>
                        </CustomBox>
                    </div>
                </div>
                <div style={{overflow:"auto",overflowY:"hidden"}}>
                    {
                        upcoming?<MTable/>:NewService?<Newservice/>:History?<UpcomingHistory/>:Ratting?<UpcomingRating/>:Block?<UpcomingBlock/>:show?<UpcomingSetting render={()=>setrender(!render)}/>:null
                    }
                    
                    
                </div>
            </div>
            <SecondFooter></SecondFooter>
            </>
            :
            <>
            {history.push("/")}
            {toast.warn("Unauthorized access",{position: "top-center"})}
            </>
        }
        <ToastContainer/>
        </div>
    );
}

export default Upcoming;