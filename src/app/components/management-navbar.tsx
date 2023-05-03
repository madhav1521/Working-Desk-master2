import * as React from 'react';
import { Menu, MenuItem } from "@mui/material";
import {user,logout,adminarrow} from "../assets/images";
import Dropdown from './dropdown';
import { useHistory  } from "react-router-dom";
function Mnavbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history=useHistory ();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    function Logout(){
        localStorage.clear();
        history.push("/");
      }
    return (
        <>
            <nav className="Mnavbar">
                <a href="#" className="brand">helperland</a>
                <ul className="userflex">
                    <li><img src={user} style={{marginTop:"3px"}}alt=""/></li> 
                    <li>Ritul Bathani</li>     
                    <li><img src={logout} alt="" onClick={Logout}/></li> 
                </ul>
                        <ul className="manage-sidebar">
                            <li><a href="#">Service Management</a></li>
                            <li><a href="#">Role Management</a></li>
                            <li>
                                <a href="#">
                                    <Dropdown title="Coupon Code Management" name1="Coupon Codes" name2="Usage History"/>
                                </a>
                            </li>
                            <li><a href="#">Escalation Management </a></li>
                            <li><a href="#">Service Requests</a></li>
                            <li><a href="#">Service Providers</a></li>
                            <li><a href="#"><strong>User Management</strong></a></li>
                            <li>
                                <a href="#">
                                    <Dropdown title="Finance Module" name1="All Transactions" name2="Generate Payment" name3="Customer Invoices"/>
                                </a>
                            </li>                            <li><a href="#">Zip Code Management  </a></li>
                            <li><a href="#">Rating Management</a></li>
                            <li><a href="#">Inquiry Management</a></li>
                            <li><a href="#">Newsletter Management </a></li>
                            <li>
                                <a href="#">
                                    <Dropdown title="Content Management" name1="Blog" name2="FAQs"/>
                                </a>
                            </li>                            
                            <li style={{background:"#1FB6FF"}}>
                                <a href="#" className="user-sidebar">
                                    <img src={user} style={{transform:"rotate(0deg)",position:"relative",top:"0",right:"10px"}}alt=""/>
                                    <p style={{textAlign:"center",color:"white"}}>Ritul Bathani</p>
                                    <img src={logout} style={{transform:"rotate(0deg)",position:"relative",top:"0",left:"10px"}} onClick={Logout} alt=""/>
                                </a>
                            </li>     
                        </ul>
                <div className="aside-toggel" onClick={e => {document.body.classList.toggle('toggel-open')}} >
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                </div>
            </nav>
        </>
    );
}

export default Mnavbar;