import React, { useState } from "react";
import { Button } from "@mui/material";
import { logolarge } from "../assets/images";
import SelectLabels from "./langauge";
import { Link, NavLink } from "react-router-dom";
import Login from "./loginmenu";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavbarComponent(props: any) {
    const history = useHistory();

    function Logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("helperland_user");
        history.push("/");
    }

    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    window.addEventListener("scroll", changeBackground);

    const closeSidebar = () => {
        document.body.classList.remove("sidebar-open");
    };

    return (
        <>
            <nav className={navbar ? "navbar active" : "navbar"}>
                <Link to="/" onClick={closeSidebar}>
                    <img src={logolarge} alt="logo" className="logo" />
                </Link>

                <ul className="topnav">
                    <li>
                        <NavLink exact to="/" activeClassName="nav-active" onClick={closeSidebar}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookservice" activeClassName="nav-active" onClick={closeSidebar}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookservice" activeClassName="nav-active" onClick={closeSidebar}>
                            Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName="nav-active" onClick={closeSidebar}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeClassName="nav-active" onClick={closeSidebar}>
                            Blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/prices" activeClassName="nav-active" onClick={closeSidebar}>
                            Prices
                        </NavLink>
                    </li>

                    {(localStorage.getItem("user") || localStorage.getItem("helperland_user")) ? (
                        <>
                            <li>
                                <NavLink to="/mybookings" activeClassName="nav-active" onClick={closeSidebar}>
                                    My Bookings
                                </NavLink>
                            </li>
                            <li>
                                <Button className="nav-outline-btn" onClick={Logout}>
                                    LogOut
                                </Button>
                            </li>
                        </>
                    ) : (
                        <Login />
                    )}

                    <li>
                        <Link to="/pro" onClick={closeSidebar}>
                            <Button className="nav-partner-btn">
                                Become Our Service Partner
                            </Button>
                        </Link>
                    </li>

                    <li className="selectlabel">
                        <SelectLabels />
                    </li>
                </ul>

                <div
                    className="toggel"
                    onClick={() => document.body.classList.toggle("sidebar-open")}
                >
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                    <span className="toggele-line"></span>
                </div>
            </nav>

            <div
                className="overlay-navbar"
                onClick={() => document.body.classList.remove("sidebar-open")}
            ></div>

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
        </>
    );
}

export default NavbarComponent;
