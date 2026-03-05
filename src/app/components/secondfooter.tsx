import { Link } from "react-router-dom";
import { footerFB, footerlogo, footerinsta } from "../assets/images";

function SecondFooter() {
    return (
        <>
            <footer className="footer-wrapper">
                <div className="footer-top">
                    <div className="footer-brand">
                        <img src={footerlogo} className="footerimg" alt="logo" />
                        <p className="footer-tagline">Your trusted home service partner</p>
                    </div>

                    <div className="footer-nav">
                        <h4 className="footer-nav-title">Quick Links</h4>
                        <nav className="footerlink">
                            <Link to="/homepage">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/faq">FAQs</Link>
                            <Link to="/prices">Prices</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                    </div>

                    <div className="footer-social-section">
                        <h4 className="footer-nav-title">Follow Us</h4>
                        <div className="footer-icons">
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <img src={footerFB} alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <img src={footerinsta} alt="Instagram" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} Helperland. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <span className="footer-divider">|</span>
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default SecondFooter;