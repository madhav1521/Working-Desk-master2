import React from "react";
import SecondFooter from "../components/secondfooter";
import { SelectChangeEvent } from '@mui/material/Select';
import Navbar2 from "../components/navbar2";
import MTable from "../components/table";
import {adminarrow} from '../assets/images';
import { styled } from '@mui/material/styles';
import { Button, MenuItem, Pagination, Stack, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@mui/system";
import {Select} from "@mui/material";
import HTable from "../components/historytable";
import { Helmet } from "react-helmet";
import HDashboard from "../components/history-dashboard";
import FavouriteProviders from "../components/favouriteProviders";
import SettingDashboard from "../components/settingDashboard";
import { useHistory  } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// const CButton = styled(Button)({

//     width: "70px",
//     height: "34px",
//     backgroundColor: "#146371",
//     borderRadius: "17px",
//     color:"#FFFFFF",
//     fontSize:"14px",
//     lineHeight:"24px",
//     // textTransform:"capitalize",
//     // boxShadow: "0px 0px 16px #00000026",
//     // '&:hover': {
//     //     backgroundColor: "#525252"
//     // }
// });

const CustomBox = styled(Box)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
        color:"#F1F1F1",
    },
    '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper':{
        backgroundColor:"#1D7A8C",

    },
    '& .css-6hp17o-MuiList-root-MuiMenu-list':{
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
    select:{
        background:"#1D7A8C"
    }
    
  }));



function History() {
    const classes = useStyles();
    const history=useHistory ();
    const [age, setAge] = React.useState('');
    const [username,setusername]=React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
  
    let user=JSON.parse(localStorage.getItem('user')|| '{}')
    fetch(`http://localhost:5000/user?q=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
    }).then(res=>res.json()).then(res =>{
        console.log(res[0].FirstName)
        setusername(res[0].FirstName)
    
    }).catch(e=>console.log(e))
      
    const [Dashboard,setDashboard]=React.useState(false);
    const [History,setHistory]=React.useState(true);
    const [Pros,setPros]=React.useState(false);
    const [setting,setsetting]=React.useState(false);
    const [show,setshow]=React.useState(false);

    const settingchange = ()=>{
        setsetting(true);
        setDashboard(false);
        setHistory(false);
        setPros(false);
        setshow(false);
        console.log("setting")
    }
   
    return (
        <div>
        {
            JSON.parse(localStorage.getItem('user')|| '{}') && JSON.parse(localStorage.getItem('user')|| '{}').userTypeId==0?
            <>
            <Helmet>
                <title>Service history</title>
            </Helmet>
            <Navbar2 heading="Book now" showButton={true} setting={settingchange} show={show}></Navbar2>
            <div className="welcome-user">
               <p>Welcome, <span>{username}!</span></p>
            </div>
            <div className="row">
                <div className="col1 subcol-1">
                    <ul className="menubar">
                        {/* className="active-button" */}
                        {
                            Dashboard?
                                <li onClick={()=>{
                                    setDashboard(true)
                                    setHistory(false)
                                    setPros(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}
                                    className="active-button"><a href="#" >Dashboard</a>
                                </li>
                                :
                                <li onClick={()=>{
                                    setDashboard(true)
                                    setHistory(false)
                                    setPros(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}
                                    ><a href="#" >Dashboard</a>
                                </li>
                        }
                         {
                            History?
                                <li  onClick={()=>{
                                    setHistory(true)
                                    setDashboard(false)
                                    setPros(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}
                                    className="active-button"> <a href="#">Service History</a>
                                </li>
                                :
                                <li  onClick={()=>{
                                    setHistory(true)
                                    setDashboard(false)
                                    setPros(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}> <a href="#">Service History</a>
                                </li>
                        }
                        <li><a href="#">Service Schedule</a></li>
                        {
                            Pros?
                                <li onClick={()=>{
                                    setPros(true)
                                    setDashboard(false)
                                    setHistory(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}
                                    className="active-button"><a href="#" >Favourite Pros</a>
                                </li>
                                :
                                <li onClick={()=>{
                                    setPros(true)
                                    setDashboard(false)
                                    setHistory(false)
                                    setsetting(false)
                                    setshow(true)
                                    }}
                                    ><a href="#" >Favourite Pros</a>
                                </li>
                        }
                        <li><a href="#">Invoices</a></li>
                        <li><a href="#">Notifications</a></li>
                    </ul>
                    <div className='toggelbar'>
                        <CustomBox >
                            <Select 
                                value={age}
                                onChange={handleChange}
                                IconComponent={NewIcon}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                
                                >
                                <MenuItem value="" style={{width:"100%"}} className={classes.select}>
                                    <em style={{padding:"10px"}} onClick={()=>{
                                    setDashboard(true)
                                    setHistory(false)
                                    setPros(false)
                                    }}>Dashboard</em>
                                </MenuItem>
                                <MenuItem value={20} style={{width:"100%"}}><Typography onClick={()=>{
                                    setHistory(true)
                                    setDashboard(false)
                                    setPros(false)
                                    }}>Service History</Typography></MenuItem>
                                <MenuItem value={30} style={{width:"100%"}}><Typography>Service Schedule</Typography></MenuItem>
                                <MenuItem value={40} style={{width:"100%"}}><Typography onClick={()=>{
                                    setPros(true)
                                    setDashboard(false)
                                    setHistory(false)
                                    }}>Favourite Pros</Typography></MenuItem>
                                <MenuItem value={50} style={{width:"100%"}}><Typography>Invoices</Typography></MenuItem>
                                <MenuItem value={60} style={{width:"100%"}}><Typography>Notifications</Typography></MenuItem>
                            </Select>
                        </CustomBox>
                    </div>
                </div>
                <div className="col2">
                
                    <div style={{overflow:"auto",overflowY:"hidden"}}>
                        {
                            History?<HTable/>:Dashboard?<HDashboard/>:Pros?<FavouriteProviders/>:setting?<SettingDashboard/>:null
                        }

                    </div>
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

export default History;