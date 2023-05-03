import { Button, Checkbox, Container, Grid, InputAdornment, MenuItem, Select, TextField,Alert } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Titlecomp from "../components/titlecomponent";
import { styled } from '@mui/material/styles';
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import { Box } from "@mui/system";
import { SelectChangeEvent } from '@mui/material/Select';
import { Helmet } from "react-helmet";
import { useHistory  } from "react-router-dom";
import { Uservalidation } from "../validation/validation";
import Login from "../components/loginmenu"
import { toast, ToastContainer } from "react-toastify";
import validator from 'validator';

const CustomButton = styled(Button)({
    // '& .css-1g527n3-MuiButtonBase-root-MuiButton-root': {
    //     width: "163px",
    //     height: "46px"
    // },
    width: "163px",
    height: "46px",
    background: "#1D7A8C 0% 0% no-repeat padding-box",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"20px",
    lineHeight:"30px",
    margin:"20px 0",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
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
const CustomTextField1 = styled(TextField)({
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"300px",
       margin:"8px 0 7px"
   },
   '@media(max-width:380px)':{
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
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
const CustomCheckbox = styled(Checkbox)({

    '& .MuiSvgIcon-root':{
        fill: "#C8C8C8",
    }
});

function UserRegistration() {
    const history=useHistory ();
    type AlertType={
        showAlert:boolean
        status: "error"
    }
   
    const [alertt,setalert]=useState<AlertType>({
        showAlert:false,
        status:"error",
 
    })
 
    const [formdata,setformdata]=useState({
        FirstName:"",
        LastName:"",
        Email:"",
        Mobile:"",
        Password:"",
        ConfirmPassword:"",

    })
    const [checked, setChecked] = React.useState(false);
    const handleCheck = (event:any) => {
        setChecked(event.target.checked);
      };
    const handleChange = (e:any) =>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setformdata({...formdata,[name]:value})
    }
    const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const error=Uservalidation(formdata,checked)
        console.log(error)
        if(error.length === 0){
            let data={...formdata,"userTypeId":0,status: "Active"}
            fetch(`http://localhost:5000/user?q=${data.Email}`,{
                method:"GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
            }).then(res=>res.json()).then(res =>{
                console.log(res)
                if(res.length===0){
                    fetch("http://localhost:5000/user",{
                        method:"POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                        body:JSON.stringify(data)
                        
                    }).then(res=>res.json()).then(res =>{
                        console.log(res)
                        console.log(JSON.stringify(data))
                        history.push("/upcoming");
                    }).catch(e=>console.log(e))
                }
                else {
                    toast.warn("Email Id already registered.Please Login!",{position: "top-center"});
                }
              
                
            }).catch(e=>console.log(e))
        }
        else{
            setalert({
                showAlert:true,
                status:"error",
                // message:error.map((item)=>{console.log(item);<p key={item + "1"}>{item}<br/></p>})

            })
        }
        
    }

    
    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <Navbar></Navbar>
            
            

            <div className="contact-form" style={{marginTop:"100px"}}>
            <Titlecomp heading="Create an account"></Titlecomp>
                <form onSubmit={submitform} method="post">
                <Box component="form" sx={{'& .MuiTextField-root': {margin:"0 14px 15px 0"}}} style={{display:"flex",flexWrap:"wrap"}} >
                <Grid container >
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2  placeholder="First name" name="FirstName" onChange={handleChange} value={formdata.FirstName}/>
                        {!formdata.FirstName && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 15px 0"}}>FirstName required</Alert>}
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2 placeholder="Last name" name="LastName" onChange={handleChange} value={formdata.LastName}/>
                        {!formdata.LastName && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",marginBottom:"15px"}}>Lastname required</Alert>}
                    </Grid>
                    
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField2 placeholder="Email address" name="Email" type="email" onChange={handleChange} value={formdata.Email}/>
                        {!formdata.Email && alertt.showAlert && <Alert severity={alertt.status} style={{width:"268px",height:"35px",marginRight:"15px"}}>Email required</Alert>}
                        {
                            !validator.isEmail(formdata.Email)?
                            formdata.Email && alertt.showAlert && <Alert severity={alertt.status} style={{width:"268px",height:"35px",marginRight:"15px"}}>Enter valid Email</Alert>
                            :null
                        }
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField3 placeholder="Mobile number" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+49</InputAdornment>
                          }}
                          name="Mobile" onChange={handleChange} value={formdata.Mobile}/>     
                        {!formdata.Mobile && alertt.showAlert && <Alert severity={alertt.status} style={{width:"268px",height:"35px"}}>Mobile required</Alert>}
               
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField1  placeholder="Password"  type="Password"  name="Password" onChange={handleChange} value={formdata.Password}/>
                        {!formdata.Password && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 10px 0"}}>Password required</Alert>}
                    </Grid>
                    <Grid item lg={6} xs={6} md={6}>
                        <CustomTextField1  placeholder="Confirm Password" type="Password" name="ConfirmPassword" onChange={handleChange} value={formdata.ConfirmPassword}/>
                        {!formdata.ConfirmPassword && alertt.showAlert && <Alert severity={alertt.status} style={{width:"268px",height:"35px"}}>Confirm pasword required</Alert>}
                        {formdata.Password !== formdata.ConfirmPassword && alertt.showAlert && <Alert severity={alertt.status}style={{width:"268px",height:"35px"}}>password and confirm password didn't match</Alert>}
                    </Grid>
                    
                </Grid>
                    
                </Box>
                <div className="privacyP">
                        <CustomCheckbox 
                        style={{padding:"0px"}}
                        checked={checked}
                        onChange={handleCheck}
                        />
                        <p>I have read the <a href="#">privacy policy</a></p>
                </div>
                {!checked && alertt.showAlert && <Alert severity={alertt.status} style={{width:"268px",height:"35px",marginTop:"10px"}}>Please Accept terms and condtions</Alert>}
                <CustomButton type="submit" >Register</CustomButton>
                <p style={{color:"#A0A0A0"}}>Already registered? 
                <a href="/" style={{color:"#1D7A8C"}} 
                onClick={e => {document.body.classList.toggle('login-open')
                            document.body.classList.remove('forgot-open')}}>Login now</a></p>
                </form>
            </div>
                        
                          
            <Login/>
            <Subscribe1></Subscribe1>
            <SecondFooter></SecondFooter>
            <ToastContainer/>
        </>
    );
}

export default UserRegistration;