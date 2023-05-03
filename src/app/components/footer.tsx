import { makeStyles } from "@mui/styles";
import { Link, NavLink } from "react-router-dom";
import {footerFB,footerlogo,footerinsta} from "../assets/images"
import { toast } from "react-toastify";
const useStyles = makeStyles({
    
    content: {
        fontSize:"16px",
        color:"#565656",
        margin:"0 0 10px 0"
    }
  });
function Footer() {
    const Style = useStyles();
    function login()
    {
        toast("please Login!");
    }
    return (
        <>
            <div className="footer-top">
                <img src={footerlogo} className="footerimg" alt="logo"/>
                <div className="footerlink">
                    <NavLink to="./homepage">HOME</NavLink>
                    <NavLink to="./about">ABOUT</NavLink>
                    <NavLink to="./">TESTIMONIALS</NavLink>
                    <NavLink to="./faq">FAQS</NavLink>
                    <NavLink to="./">INSURANCE POLICY</NavLink>
                    <NavLink to="./">IMPRESSUM</NavLink>
                </div>
                <div className="footer-icons">
                    <a href="https://www.facebook.com/" ><img src={footerFB} alt="logo"/></a>
                    <a href="https://www.instagram.com/accounts/login/" ><img src={footerinsta} alt="logo"/></a>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Ut feugiat nunc libero, ac malesuada ligula aliquam ac. <span>Privacy Policy</span>               
                </p>
                <button onClick={login}>
                OK!
                </button>
        
            </div>
        </>
    );
}

export default Footer;