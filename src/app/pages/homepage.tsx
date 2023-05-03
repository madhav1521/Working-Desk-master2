import Footer from "../components/footer";
import NavbarComponent from "../components/navbarComponent";
import Banner from "../components/banner";
import Blog from "../components/blog";
import Customer from "../components/customer";
import Services from "../components/services";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import Resetpass from "../components/resetpassDialoge";
import { useEffect, useState } from "react";

function Homepage() {
    // const dispatch=useDispatch();
    const [open,setopen]=useState(false);
    let { token }=useParams();
    useEffect(()=>{
        console.log("token",token)
        if(token){
            setopen(true);
        }
    },[token])
    
  
    
    return (
        <> 
            <Helmet>
                <title>Homepage</title>
            </Helmet>
            <NavbarComponent ></NavbarComponent>
            <Banner></Banner>
            <Services></Services>
            <Blog></Blog>
            <Customer></Customer>
            <Footer></Footer>
            <Resetpass token={token} open={open}></Resetpass>
        </>
    );
}

export default Homepage;