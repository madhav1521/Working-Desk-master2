
import { Button, Container, Grid, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Titlecomp from "../components/titlecomponent";
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import { SelectChangeEvent } from '@mui/material/Select';
import {smiley,img1,img2,img3,img4,img5} from '../assets/images';
import { Helmet } from "react-helmet";
import BookServiceTab from "../components/bookservicetab/book-service-tab";
import BookserviceAccordions from "../components/book-service-accordian";
import sendData from "../components/bookservicetab/book-service-tab";
import { useSelector } from "react-redux"
import { RootState } from "../components/bookservicetab/store";

function Bookservicepage() {
    const [age, setAge] = React.useState('');
    // let detail=SendDetail();
    const [time, setTime] = React.useState<Date>(new Date('2014-08-18T23:11:54'));
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    // const [data,Setdata]=useState([]);
    // let a=sendData();
    // Setdata(a);
    // console.log(data)
    const [formdata,setformdata]=useState({
        Rooms:"",
        Bath:"",
        Date: "",
        Time:"",
        ServiceHours:0,
        ExtraService:{
            "Inside cabinets":false,
            "Inside fridge":false,
            "Inside oven":false,
            "Laundry wash & dry":false,
            "Interior windows":false
        },
        Comments:"",
        Totaltime:0,
        Payment:0,
        EffPeyment:0

    })
    const passData=(ChildData:any)=>{
        setformdata(ChildData);
        let formdata=ChildData;
    }
    const ExtraService = useSelector((state: RootState) => state.getdata.ExtraService)
    // console.log("ExtraService:",ExtraService)
    
    formdata.Totaltime=Number(useSelector((state: RootState) => state.getdata.ServiceHours));
    // ========================
    ExtraService["Inside cabinets"]?formdata.Totaltime=formdata.Totaltime+0.5:formdata.Totaltime=formdata.Totaltime;
    ExtraService["Inside fridge"]?formdata.Totaltime=formdata.Totaltime+0.5:formdata.Totaltime=formdata.Totaltime;
    ExtraService["Inside oven"]?formdata.Totaltime=formdata.Totaltime+0.5:formdata.Totaltime=formdata.Totaltime;
    ExtraService["Laundry wash & dry"]?formdata.Totaltime=formdata.Totaltime+0.5:formdata.Totaltime=formdata.Totaltime;
    ExtraService["Interior windows"]?formdata.Totaltime=formdata.Totaltime+0.5:formdata.Totaltime=formdata.Totaltime;
    // ========================
    formdata.Payment=formdata.Totaltime*20;
    formdata.EffPeyment=formdata.Payment - formdata.Payment*0.2;
    return (
        <>
            <Helmet>
                <title>Book Service</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="bookservice-banner">
            {/* banner-image */}
            </div>
            <Titlecomp heading="Set up your Services"></Titlecomp>
            <div>
            
            </div>
            <div className="service-steps">
                <BookServiceTab onpass={passData}></BookServiceTab>
                <div className="main-payment-div">
                    <div className="payment-summary">
                        <div className="payment-title">
                            <p>Payment Summary</p>
                        </div>
                        {/* {count} */}
                        <p className="payment-time">{useSelector((state: RootState) => state.getdata.Date)} @ {useSelector((state: RootState) => state.getdata.Time)}<br/>{useSelector((state: RootState) => state.getdata.Rooms)} bed, {useSelector((state: RootState) => state.getdata.Bath)} bath.</p>
                        <p className="duration">Duration</p>
                        <div className="sub-duration">
                            <h1>Basic  <br/>
                            
                            {ExtraService["Inside cabinets"]?<p>Inside cabinets<br/></p>:null}
                            {ExtraService["Inside fridge"]?<p>Inside fridge<br/></p>:null}
                            {ExtraService["Inside oven"]?<p>Inside oven<br/></p>:null}
                            {ExtraService["Laundry wash & dry"]?<p>Laundry wash & dry<br/></p>:null}
                            {ExtraService["Interior windows"]?<p>Interior windows<br/></p>:null}
                            </h1>
                        
                            <h2>{formdata.ServiceHours} Hrs <br/>  
                            {ExtraService["Inside cabinets"]?<p>0.5 Hrs<br/></p>:null}
                            {ExtraService["Inside fridge"]?<p>0.5 Hrs<br/></p>:null}
                            {ExtraService["Inside oven"]?<p>0.5 Hrs<br/></p>:null}
                            {ExtraService["Laundry wash & dry"]?<p>0.5 Hrs<br/></p>:null}
                            {ExtraService["Interior windows"]?<p>0.5 Hrs<br/></p>:null}
                            </h2>
                        </div>
                        <div className="total-time">
                            <p>Total Service Time</p>
                            <h2>{formdata.Totaltime} Hrs</h2>
                            
                        </div>
                        <div className="total-price">
                            <p>Per cleaning<br/>Discount</p>
                            <h2>$20<br/>0</h2>
                        </div>
                        <div className="total-Payment">
                            <p>Total Payment</p>
                            {/* <h1>${formdata.ServiceHours *20 +  0.5 * 20 * formdata.ExtraService}</h1> */}
                            <h1>${formdata.Payment}</h1>
                        </div>
                        <div className="effective-Payment">
                            <p>Effective Price</p>
                            {/* <h1>${formdata.ServiceHours *20 +  0.5 * 20 * formdata.ExtraService}</h1> */}
                            <h1>${formdata.EffPeyment}</h1>
                        </div>
                        <div className="discount">
                            <p><span>*</span>You will save 20% according to §35a EStG.</p>
                        </div>
                        <div className="payment-footer">
                            <img src={smiley} alt=""/>
                            <p>See what is always included</p>
                        </div>
                    </div>
                    <div style={{maxWidth:"360px"}}>
                        <h3>Questions?</h3>
                        <BookserviceAccordions></BookserviceAccordions>
                        <h4>For more help</h4>
                    </div>
                </div>
                
            </div>           
            <Subscribe1></Subscribe1>
            <SecondFooter></SecondFooter>
        </>
    );
}

export default Bookservicepage;