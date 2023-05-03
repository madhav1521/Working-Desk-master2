
import { Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar";
import SecondFooter from "../components/secondfooter";
import Titlecomp from "../components/titlecomponent";
import {thebestimg1,checkmark,img1,img2,img3,img4,img5,group1822,group1833,group1844,rightarrow} from '../assets/images'
import Subscribe from "../components/subscribe";
import { Helmet } from "react-helmet";

function Pricespage() {
    return (
        <>
            <Helmet>
                <title>Prices</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="price-banner">
            {/* banner-image */}
            </div>
            <Titlecomp heading="Prices"></Titlecomp>
            <div className="price-card">
                <div className="card-title">
                    <h1>One Time</h1>
                </div>
                <div className="rate">
                    <h1 className="euro1">€</h1>
                    <h1 className="euro">20</h1>
                    <h1 className="hour">/hr</h1>
                </div>
                <div className="payment-feature">
                    <div>
                        <img src={checkmark} alt="logo"/>
                        <h1>Lower prices</h1>
                    </div>
                    <div>
                        <img src={checkmark} alt="logo"/>
                        <h1>Easy online & secure payment</h1>
                    </div>
                    <div>
                        <img src={checkmark} alt="logo"/>
                        <h1>Easy amendment</h1>
                    </div>
                </div>
            </div>
            <hr style={{color:"#DCDCDC",maxWidth:"1140px",border:"0",borderTop:"1px solid #CCCCCC",height:"1px",paddingBottom:"9px"}}></hr>
            <Titlecomp heading="Extra services"></Titlecomp>
            <div className="extra-service">
                <Grid container>
                    <Grid item lg={2} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
                        <div className="service-items">   
                            <img src={img3} alt="logo" className="extra-service-img1"/>
                        </div>
                        <div className="service-info">
                            <p>Inside cabinets</p>
                            <h1>30 minutes</h1>
                        </div>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
                        <div className="service-items">   
                        <img src={img5} alt="logo" className="extra-service-img2"/>
                        </div>
                        <div className="service-info">
                            <p>Inside fridge</p>
                            <h1>30 minutes</h1>
                        </div>
                        
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
                        <div className="service-items">   
                        <img src={img4} alt="logo" className="extra-service-img3"/>
                        </div>
                        <div className="service-info">
                            <p>Inside oven</p>
                            <h1>30 minutes</h1>
                        </div>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
                        <div className="service-items">   
                        <img src={img2} alt="logo" className="extra-service-img4"/>
                        </div>
                        <div className="service-info">
                            <p>Laundry wash & dry</p>
                            <h1>30 minutes</h1>
                        </div>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
                        <div className="service-items">   
                        <img src={img1} alt="logo" className="extra-service-img5"/>
                        </div>
                        <div className="service-info">
                            <p>Interior windows</p>
                            <h1>30 minutes</h1>
                        </div>
                    </Grid>
                </Grid>
            </div>  
            <div className="cleaning">
                <Titlecomp heading="What we include in Working"></Titlecomp>
                <Grid container style={{maxWidth:"1140px",margin:"0 auto"}}>
                    <Grid item lg={4} md={12} sm={12} xs={12}  >
                        <div className="bathroom-feature">
                            <img src={group1833} alt="logo" className="group183" />
                            <h1>Bedroom and Living Room</h1>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Dust all accessible surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                 Wipe down all mirrors and glass fixtures 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Clean all floor surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Take out garbage and recycling 
                            </p>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <div className="bathroom-feature">
                            <img src={group1844} alt="logo" className="group183" />
                            <h1>Bathrooms</h1>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Wash and sanitize the toilet, shower, tub, sink 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Dust all accessible surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Wipe down all mirrors and glass fixtures 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Clean all floor surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Take out garbage and recycling
                            </p>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12} >
                        <div className="bathroom-feature">
                            <img src={group1822} alt="logo" className="group183"/>
                            <h1>Kitchen</h1>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Dust all accessible surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Empty sink and load up dishwasher
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Wipe down exterior of stove, oven and fridge 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Clean all floor surfaces 
                            </p>
                            <p>
                                <img src={rightarrow} alt="logo" />
                                Take out garbage and recycling 
                            </p>
                            
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Titlecomp heading="Why Working Desk"></Titlecomp>
            <div className="why-helperland1">
                
                <div className="best-clean-service1">
                    <h1>Experienced and vetted professionals</h1>
                    <p className="best1">dominate the industry in scale and scope with an adaptable, extensive network that consistently delivers exceptional results.</p>
                    <h1>Dedicated customer service</h1>
                    <p className="best2">to our customers and are guided in all we do by their needs. The team is always happy to support you and offer all the information. you need.</p>
                </div>
                <div className="best-clean-service2">
                    <img src={thebestimg1} alt="logo"/>
                </div>
                <div className="best-clean-service3">
                    <h1>Every cleaning is insured</h1>
                    <p>and seek to provide exceptional service and engage in proactive behavior. We‘d be happy to clean your homes.</p>
                    <h1>Secure online payment</h1>
                    <p>Payment is processed securely online. Customers pay safely online and manage the booking.</p>
                </div>
            </div>
            <Subscribe></Subscribe>
            <SecondFooter></SecondFooter>
        </>
    );
}

export default Pricespage;