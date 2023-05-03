
import { Alert, Button, Checkbox, Container, Grid, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import NavbarComponent from "../components/navbarComponent";
import {arrow,group18,shape2,group182,group183,group184,bgimg1,bgimg2} from '../assets/images';
import { Helmet } from "react-helmet";
import { useHistory  } from "react-router-dom";
import { Proregistration } from "../validation/validation";

const CustomButton = styled(Button)({

    width: "166px",
    height: "46px",
    background: "#1D7A8C 0% 0% no-repeat padding-box",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"16px",
    textTransform:"capitalize",
    marginBottom:"19px",
    '&:hover': {
        backgroundColor: "#525252"
    }
});
const CustomCheckbox = styled(Checkbox)({

    '& .MuiSvgIcon-root':{
        fill: "#C8C8C8",
    }
});

const CustomTextField2 = styled(TextField)({
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root': {
        height: "46px",
        padding:"0",
        width:"359px"
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
   '@media(max-width:380px)':{
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':{
      width:"300px" 
    }
}
   
});
const CustomTextField1 = styled(TextField)({
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"359px",
       margin:"8px 0 7px"
   },
   '@media(max-width:380px)':{
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
      width:"300px" 
    }
}
});


function BecomeAPropage() {
    type AlertType={
        showAlert:boolean
        status:"success" | "error"

    }
    const [alertt,setalert]=useState<AlertType>({
        showAlert:false,
        status:"error",
    })
    
    const history=useHistory ();
    
    const [age, setAge] = React.useState('');
    // const handleChange = (event: SelectChangeEvent) => {
    //   setAge(event.target.value);
    // };
    const [formdata,setformdata]=useState({
        FirstName:"",
        LastName:"",
        Email:"",
        Mobile:"",
        Password:"",
        ConfirmPassword:"",
        status:"Active"
    })
    const [checkboxdata,setcheckboxdata]=useState({
       newslattercheck:false,
       termcheck:false
    })
    const handleCheck = (event:any) => {
        setcheckboxdata({ ...checkboxdata,[event.target.name]:event.target.checked});
      };
    const handleChange = (e:any) =>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setformdata({...formdata,[name]:value})
        console.log(formdata)
    }
    
    const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const error=Proregistration(formdata,checkboxdata.termcheck)
        console.log(error)
        if(error.length == 0){
            let data={...formdata,"userTypeId":1}
            fetch("http://localhost:5000/user",{
                method:"POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
                body:JSON.stringify(data)
                
            }).then(res=>res.json()).then(res =>{
                console.log(res)
                console.log(JSON.stringify(data))
                history.push("./upcoming");
            }).catch(e=>console.log(e))
        }
        else{
            setalert({
                showAlert:true,
                status:"error",
                // message:"Please fill all the details"
            })
        }
        
    }
    return (
        <>
            <Helmet>
                <title>Become a Pro</title>
            </Helmet>
             <NavbarComponent></NavbarComponent>
            <div className="pro-banner">
                <form className="register-now" onSubmit={submitform} method="post">
                   
                    <h1>Register Now!</h1>
                    <CustomTextField1  placeholder="First name"    
                    name="FirstName" onChange={handleChange} value={formdata.FirstName}/>
                    {!formdata.FirstName && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto"}}>FirstName required</Alert> }
                    
                    <CustomTextField1  placeholder="Last name"     
                    name="LastName" onChange={handleChange} value={formdata.LastName}/>
                    {!formdata.LastName && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto"}}>Lastname required</Alert>}

                    <CustomTextField1  placeholder="Email Address" type="email" 
                    name="Email" onChange={handleChange} value={formdata.Email}/>
                    {!formdata.Email && alertt.showAlert && <Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto 7px"}}>Email required</Alert>}

                    <CustomTextField2  placeholder="Mobile number" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+46</InputAdornment>
                          }}
                          name="Mobile" onChange={handleChange} value={formdata.Mobile}/>
                    {!formdata.Mobile && alertt.showAlert && <Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"7px auto "}}>Mobile required</Alert>}

                    <CustomTextField1  placeholder="Password"  type="Password" 
                    name="Password" onChange={handleChange} value={formdata.Password}/>
                    {!formdata.Password && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto"}}>Password required</Alert>}
                    
                    <CustomTextField1  placeholder="Confirm Password" type="Password" 
                    name="ConfirmPassword" onChange={handleChange} value={formdata.ConfirmPassword}/>
                    {!formdata.ConfirmPassword && alertt.showAlert && <Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto"}}>Confirm pasword required</Alert>}
                    {formdata.Password != formdata.ConfirmPassword && <Alert severity={alertt.status} style={{width:"325px",height:"35px",margin:"0 auto"}}>password and confirm password didn't match</Alert>}
             
                    <br></br>

                    <div className="form-checkbox1">
                        <CustomCheckbox style={{padding:"0px"}} name="newslattercheck"checked={checkboxdata.newslattercheck} onChange={handleCheck}/><p>Send me newsletters from Helperland</p>
                    </div>
                    
                    <div className="form-checkbox2">
                    <CustomCheckbox style={{padding:"0px"}}
                    checked={checkboxdata.termcheck} name="termcheck"onChange={handleCheck}
                    />
                    <p>I accept <a href="#">terms and conditions</a> & <a href="#">privacy policy</a></p>
                    </div>

                    <div style={{width:"302px",height:"76px",margin:"0 auto 37px",background:"grey"}}>
                    </div>
                    <CustomButton type="submit">Get Started <img src={arrow} alt="arrow" style={{marginLeft:"8px"}}/></CustomButton>
                </form>
                <div style={{textAlign:"center",padding:"44px 0 30px",height:"40px"}}>
                    <a href="#"><img src={group18} alt="arrow"/></a>
                </div>
            </div>
            <img src={bgimg1} className= "bgimg3" alt="logo" />
            <div className="how-it-work">
            
                <h1>How it works</h1>
                <div className="register-self1">
                    <div className="sub-register">
                        <h2>Register yourself</h2>
                        <p>Provide your basic information to register yourself as a service provider.</p>
                        <a href="#">Read more
                            <img src={shape2} alt="logo" height={"9px"} width={"29px"} style={{marginLeft:"10px"}}/>
                        </a>
                    </div>
                    <img src={group182} alt=""/>
                </div>
                <div className="register-self2">
                    <img src={group184} alt=""/>
                    <div className="sub-register">
                        <h2>Get service requests</h2>
                        <p>You will get service requests from customes depend on service area and profile.</p>
                        <a href="#">Read more
                            <img src={shape2} alt="logo" height={"9px"} width={"29px"} style={{marginLeft:"10px"}}/>
                        </a>
                    </div>
                </div>
                <div className="register-self3">
                    <div className="sub-register">
                        <h2>Complete service</h2>
                        <p>Accept service requests from your customers and complete your work.</p>
                        <a href="#">Read more
                            <img src={shape2} alt="logo" height={"9px"} width={"29px"} style={{marginLeft:"10px"}}/>
                        </a>
                    </div>
                    <img src={group183} alt=""/>
                </div>
            </div>
            <img src={bgimg2} className= "bgimg4" alt="logo" />
            <Subscribe1></Subscribe1>
            <SecondFooter></SecondFooter>
        </>
    );
}

export default BecomeAPropage;