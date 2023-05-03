import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import {group18,check,step1,step2,step3,step4,steparrow1,steparrow2} from "../assets/images"
import Login from "./loginmenu";
import { toast } from "react-toastify";

function Banner() {
      function login()
      {
          toast('please login')
      }
    return (
        <>
            <div className="Banner">
                <h1>Do not feel like housework?</h1>
                <ul>
                    <li>
                        <img src={check} alt="logo"/>
                        <p>cirtified & insured helper</p>
                    </li>
                    <li>
                        <img src={check} alt="logo"/>
                        <p>easy booking procedure</p>
                    </li>
                    <li>
                        <img src={check} alt="logo"/>
                        <p>friendly customer service</p>
                    </li>
                    <li>
                        <img src={check} alt="logo"/>
                        <p>secure online payment method</p>
                    </li>
                </ul>
                <div className="btn1">
                    <Button onClick={login} style={{textTransform:'capitalize'}}> Let’s Book a Work</Button>
                </div>
                
                <div className="symbol">
                <Grid container>
                    <Grid item lg={2} md={2} sm={6} xs={12}>
                    <div className="subsymbol">
                        <img src={step1} alt="logo" />
                        <p style={{}}>Enter your postcode</p>
                    </div>
                    </Grid>
                    <div className="arrow-vertical">
                        <img src={steparrow1}  className="arrow" alt="logo"/>
                    </div>
                   
                    
                    <Grid item lg={2} md={2} sm={6} xs={12} >
                    <div className="subsymbol">
                        <img src={step2} alt="logo"/>
                        <p style={{}}>Select your plan</p>
                    </div>
                    </Grid>
                    <div className="arrow-vertical">
                        <img src={steparrow2} className="arrow" alt="logo"/>
                    </div>
                    
                    
                    <Grid item lg={2} md={2} sm={6} xs={12}>
                    <div className="subsymbol">
                        <img src={step3} alt="logo"/>
                        <p style={{}}>Pay securely online</p>
                    </div>
                    </Grid>
                    <div className="arrow-vertical">
                        <img src={steparrow1} className="arrow" alt="logo"/>
                    </div>
                    
                    <Grid item lg={2} md={2} sm={6} xs={12}>
                    <div className="subsymbol">
                        <img src={step4} alt="logo" />
                        <p>Enjoy amazing service</p>
                    </div>
                    </Grid>
                </Grid>
                </div>
                <div className="downarrow">
                    <a href="#"><img src={group18} alt="logo" /></a>
                </div>
                
            </div>
        </>
    );
}

export default Banner;