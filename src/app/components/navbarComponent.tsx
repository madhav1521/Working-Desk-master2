import { Button, Checkbox, TextField } from "@mui/material";
import React,{useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import {logolarge} from "../assets/images";
import SelectLabels from "./langauge";
import { Link } from "react-router-dom";
import Login from "./loginmenu"
import { useHistory  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Book= () => <Link to="/bookservice"></Link>

function NavbarComponent(props:any) {
    const history=useHistory ();
    function Logout(){
        localStorage.clear();
        history.push("/");
      }
    function login()
    {
        toast("please Login!");
    }

    const [navbar, setNavbar] =  useState(false);
    const changeBackground = () => {
      if(window.scrollY>=200) {
        setNavbar(true);
      }else {
        setNavbar(false);
      }
    };
    window.addEventListener('scroll' ,changeBackground);

    return (
        <>
        {/* <Container fluid> */}
        
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <img src={logolarge} alt="logo" className="logo"/>
                <ul className="topnav" >
                  <Link to="/bookservice"><li><Button title="Book a cleaner" className="cleaner-btn">Book a worker</Button></li></Link>
                        
                    <li><Link to="/prices">Prices</Link></li>
                    {/* <li><Link to="/prices">Our Guarantee</Link></li> */}
                    <li><Link to="/about">Blog</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                    {
                    localStorage.getItem('user')?
                        <li><Button className="login-btn"  onClick={Logout}>LogOut</Button></li>
                    :
                    
                    <Login/>
                    }
                    
                    <Link to="./pro"><li><Button className="cleaner-btn" >Become a Helper</Button></li></Link>
                    <li className="selectlabel"><SelectLabels/></li>
                    
                </ul>
                
                {/* <div><img src={navbutton} alt="logo" className="navbutton icon" onClick={}/></div> */}
                <div className="toggel" onClick={e => {document.body.classList.toggle('sidebar-open')}} >
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                </div>
                
            </nav>
            <div className="overlay-navbar" onClick={e => {document.body.classList.toggle('sidebar-open')}}></div>
            
            
            <ToastContainer
               position="top-center"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            {/* <div className="overlay-navbar" onClick={e => {document.body.classList.toggle('login-open')}}></div>
            <div className="overlay-navbar" onClick={e => {document.body.classList.toggle('forgot-open')}}></div> */}
        {/* </Container> */}
        </>
    );
}

export default NavbarComponent;