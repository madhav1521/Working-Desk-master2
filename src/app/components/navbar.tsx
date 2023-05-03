import { Button, Container } from "@mui/material";
import {logolarge} from "../assets/images";
import { Link } from "react-router-dom";
import Login from "./loginmenu";
import { useHistory  } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    // const Style = useStyles();
    const history=useHistory ();
    function Logout(){
        localStorage.clear();
        history.push("/");
      }
      function login()
      {
          alert('please login')
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
        {/* <Container> */}
            <nav className={navbar ? 'navbar-faq active' : 'navbar-faq'}>
                <img src={logolarge} alt="logo"/>
                <ul className="topnav" >     
                    <Link to="/bookservice"><li><Button className="cleaner-btn">Book a worker</Button></li></Link>
                    <li><Link to="/prices" style={{margin:"0px"}}>Prices & services</Link></li>
                    {/* <li><Link to="#">Warranty</Link></li> */}
                    <li><Link to="/about">Blog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {
                    localStorage.getItem('user')?
                        <li><Button className="login-btn"  onClick={Logout}>LogOut</Button></li>
                    :
                    <Login background={"#29626D"}/>
                    }
                   
                    
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

export default Navbar;