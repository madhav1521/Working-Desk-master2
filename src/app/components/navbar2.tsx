import { Button } from "@mui/material";
import React,{useState} from "react";
import {logolarge,iconnotification,user,sparrowdown} from "../assets/images";
import SelectLabels from "./langauge";
import { Link, useHistory } from "react-router-dom";
import UserLogin from "./user-login";
import { styled } from '@mui/material/styles';


// interface Props{
//     heading:string;
//     showButton:boolean;
// }
// const CButton = styled(Button)({

//     display:${(props) => props.none},
//     textTransform:"capitalize",
//     boxShadow: "0px 0px 16px #00000026",
//     '&:hover': {
//         backgroundColor: "#525252"
//     }
// });
const Navbar2 = (props:any)=> {
    const {showButton}=props;
    // const history=useHistory ();
    // function Logout(){
    //     localStorage.clear();
    //     history.push("/");
    //   }
    return (
        <>
        {/* <Container fluid> */}
            <nav className="navbar1">
                <img src={logolarge} alt="logo" className="logo1"/>
                <ul className="topnav">
                    
                    {showButton && <li><button className="book-now"> <Link to="/bookservice">{props.heading}</Link></button></li>}
                    <li><Link to="/prices">Prices & services</Link></li>
                    <li><Link to='/' >Warranty</Link></li>
                    <li><Link to="/about">Blog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li style={{display:"flex"}}>
                        <div className="vl1"></div>
                        <img src={iconnotification} alt="logo"/>
                        <div className="vl2"></div>
                    </li>
                    <li>
                        <div className="user-icon">
                            <UserLogin setting={props.setting} show={props.show}/>
                        </div>
                    </li>                
                </ul>
                {/* <div><img src={navbutton} alt="logo" className="navbutton icon" onClick={}/></div> */}
                <div className="toggel" onClick={e => {document.body.classList.toggle('sidebar-open')}} >
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                </div>
            </nav>
            <div className="overlay-navbar" onClick={e => {document.body.classList.toggle('sidebar-open')}}></div>
        {/* </Container> */}
        </>
    );
}

export default Navbar2;