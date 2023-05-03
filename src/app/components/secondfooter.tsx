import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import {footerFB,footerlogo,footerinsta} from "../assets/images"
const useStyles = makeStyles({
    
    content: {
        fontSize:"16px",
        color:"#565656",
        margin:"0 0 10px 0"
    }
  });
function SecondFooter() {
    const Style = useStyles();
    return (
        <>
            <div className="footer-top">
                <img src={footerlogo} className="footerimg" alt="logo"/>
                <div className="footerlink">
                    <Link to="/homepage">HOME</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/">TESTIMONIALS</Link>
                    <Link to="/faq">FAQS</Link>
                    <Link to="">INSURANCE POLICY</Link>
                    <Link to="/">IMPRESSUM</Link>
                </div>
                <div className="footer-icons">
                    <img src={footerFB} alt="logo"/>
                    <img src={footerinsta} alt="logo"/>
                </div>
            </div>
            {/* <hr className="footer-separator"></hr> */}
            <div className="faqfooter-bottom">
                <p style={{textAlign:"center"}}>
                ©2018 Helperland. All rights reserved.  <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy </a>           
                </p>
            </div>
        </>
    );
}

export default SecondFooter;