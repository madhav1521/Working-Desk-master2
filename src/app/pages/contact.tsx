
import { Alert, Button, Container, Grid, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import Navbar from "../components/navbar";
import Titlecomp from "../components/titlecomponent";
import { styled } from '@mui/material/styles';
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import { Box } from "@mui/system";
import { SelectChangeEvent } from '@mui/material/Select';
import {adminarrow,forma12,phonecall,vectorsmart,map} from '../assets/images';
import { Helmet } from "react-helmet";
import emailjs from 'emailjs-com';
import { contactvalidation } from "../validation/validation";
import validator from 'validator';
import { toast, ToastContainer } from "react-toastify";

const CustomButton = styled(Button)({
  
    width: "163px",
    height: "46px",
    background: "#1D7A8C 0% 0% no-repeat padding-box",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"30px",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
});
const CustomTextField1 = styled(TextField)({
     '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
         padding:"13px 0 0 15px",
         position:"absolute",
         top:"0"
    },
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
        height: "146px",
        width:"614px"
    },
    '@media(max-width:627.98px)':{
        '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
          width:"300px" 
        }
    }
});
const CustomTextField3 = styled(TextField)({
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root': {
        height: "46px",
        padding:"0",
        width:"300px"
   },
   '& .css-ittuaa-MuiInputAdornment-root':{
       width:"57px",
       maxHeight:"46px",
       height:"47px",
       background:"#F1F1F1",
       marginRight:"14px",
       borderRight:"1px solid #C8C8C8"
   },
   '& .css-1pnmrwp-MuiTypography-root':{
       padding:"15px"
   },
   '@media(max-width:627.98px)':{
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
      width:"300px" 
    }
}
});
const CustomTextField2 = styled(TextField)({
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"300px"
   }
});
const CustomBox = styled(Box)({
    marginBottom:"15px",
    maxWidth:"614px",
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
        height: "46px",
        width:"614px"
   },
  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':{
    textAlign:"left",
    fontSize:"16px",
    color:"#A0A0A0",
  },
  '& .css-1gzntpy-MuiButtonBase-root-MuiMenuItem-root':{
    fontSize:"16px",
    color:"#A0A0A0",

  },
  '@media(max-width:627.98px)':{
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
        height: "46px",
        width:"300px"
   },
    }
});

function Contactpage() {
    const [age, setAge] = React.useState('');
    const form = useRef();
    const handleChange1 = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    const [alertt,Setalert]=useState(false);
    const [toSend, setToSend] = useState({
        Firstname: '',
        Lastname: '',
        Mobile: '',
        Email:'',
        age:'',
        Message:''

      });
     
    const handleChange = (e:any) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
      };
    const error=contactvalidation(toSend);
    
        const sendemail = (e: React.FormEvent<HTMLFormElement>) =>{
     
            e.preventDefault();
            if(error.length == 0 && age!=""){
                console.log("true")
                emailjs.send('service_jvv6rrd','template_idwk6wb',toSend,'ITzav1NronUYWixci')
                .then(result =>{
                    console.log('SUCCESS',result.status);
                    toast.success("Details submitted successfully",{position: "top-center"});
                },
                (error:any)=>{
                console.log(error.text);
                
                });
             
            }
            else{
                Setalert(true)
                console.log("true:")
                console.log(age)
            }
        }
    
    
        console.log(form.current)
    
    return (
        <>
            <Helmet>
                <title>Contact us</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="contact-banner">
            {/* banner-image */}
            </div>
            <Titlecomp heading="Contact us"></Titlecomp>
            <div className="contact-detail">
                <Grid container style={{maxWidth:"1140px",margin:"0 auto"}}>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <div className="detail-1">
                            <img src={forma12} alt="logo"/>
                            <p>Konigswinterer Str. 116<br/> 53227 Bonn</p>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <div className="detail-1">
                            <img src={phonecall} alt="logo"/>
                            <p><a href="tel:+4940123567890" title="Call Now">+49 (40) 123 56 7890</a><br/><a href="tel:+4940123567890" title="Call Now">+49 (40) 987 56 0000</a></p>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <div className="detail-1">
                            <div style={{height:"50px",alignItems:"center",display:"flex",justifyContent:"center"}}>
                                <img src={vectorsmart} alt="logo"/>
                            </div>
                            <p>info@workingdesk.com</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <hr style={{width:"1140px",border:"0",borderTop:"1px solid #CCCCCC",display:"block",height:"1px",margin:"50px auto 80px"}}></hr>
            <form className="contact-form" action="https://formspree.io/f/mlekovbg" method="POST" onSubmit={sendemail}>
                <h1>Get in touch with us</h1>
                <Box component="form" action="https://formspree.io/f/mlekovbg" method="POST"  sx={{'& .MuiTextField-root': {margin:"0 14px 15px 0"}}} style={{display:"flex",flexWrap:"wrap"}} >
                <Grid container >
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2  placeholder="First name" name="Firstname" value={toSend.Firstname} onChange={handleChange} />
                        {!toSend.Firstname && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",marginBottom:"10px"}}>FirstName required</Alert>}
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2 placeholder="Last name"  name="Lastname" value={toSend.Lastname} onChange={handleChange}/>
                        {!toSend.Lastname && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",marginBottom:"10px"}}>Lastname required</Alert>}
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                    <CustomTextField3 placeholder="Mobile number"  name="Mobile"  value={toSend.Mobile} onChange={handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+49</InputAdornment>
                          }}/>
                        {!toSend.Mobile && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",marginBottom:"10px"}}>Mobile required</Alert>}
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2 placeholder="Email address"  name="Email" type="email" value={toSend.Email} onChange={handleChange}/>
                        {!toSend.Email && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",marginBottom:"10px"}}>Email required</Alert>}
                        {
                            !validator.isEmail(toSend.Email)?
                            toSend.Email && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",marginRight:"15px"}}>Enter valid Email</Alert>
                            :null
                        }
                    </Grid>
                    <Grid item lg={12} xs={12} md={12}>
                        <CustomBox className="selectbox">
                            <Select
                                value={age}
                                onChange={handleChange1}
                                displayEmpty
                                name="subject"
                                IconComponent={()=>(
                                    <img src={adminarrow} style={{marginRight:"11px"}}/>
                                )}
                                inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                >
                                <MenuItem value="" >
                                    <em>Subject</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            {!age && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px",margin:"10px 0 0"}}>subject required</Alert>}

                        </CustomBox>
                    </Grid>
                    <Grid item lg={12} xs={12} md={12}>
                        <CustomTextField1 placeholder="Message"  name="Message"  value={toSend.Message} onChange={handleChange}/>
                        {!toSend.Message && alertt && <Alert severity={"error"} style={{width:"268px",height:"35px"}}>Message required</Alert>}
                    </Grid>

                </Grid>
                <Button type="submit">send</Button>
                </Box>
                <CustomButton type="submit">Submit</CustomButton>
            </form>
                        
        
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697915881948!2d72.49786087597927!3d23.03486131586824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8352e403437b%3A0xdc9d4dae36889fb9!2sTatvaSoft!5e0!3m2!1sen!2sin!4v1682770137238!5m2!1sen!2sin" width="100%" height="400"  loading="lazy" ></iframe>      
            </div>
            <Subscribe1></Subscribe1>
            <SecondFooter></SecondFooter>
            <ToastContainer/>
        </>
    );
}

export default Contactpage;