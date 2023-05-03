
import { Alert, Button, Checkbox, Container, Grid, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Subscribe1 from "./sunscribe1";
import SecondFooter from "./secondfooter";
import NavbarComponent from "./navbarComponent";
import {arrow,group18,shape2,group182,group183,group184,bgimg1,bgimg2} from '../assets/images';
import { Helmet } from "react-helmet";
import { useHistory  } from "react-router-dom";
import { addressvalidation, Loginvalidation, Proregistration } from "../validation/validation";

const CustomButton = styled(Button)({

    width: "140px",
    height: "46px",
    background: "#1D7A8C 0% 0% no-repeat padding-box",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"16px",
    margin:"20px 20px 0 0",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
});


const CustomTextField2 = styled(TextField)({
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
       width:"300px",
       margin:"8px 0 7px"
   },
   '@media(max-width:380px)':{
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
      width:"300px" 
    }
}
});

// interface Props{
//     onsub:string;
// }
function AddAddress(props:any) {
    type AlertType={
        showAlert:boolean
        status:"success" | "error"
        message:string | React.ReactNode
    }
    const [alertt,setalert]=useState<AlertType>({
        showAlert:false,
        status:"success",
        message:" "
    })
    const AlertMenu = () =>{
         return <Alert severity={alertt.status}>{alertt.status == "success" ? "" :"An error occured,please try again."}{alertt.message}</Alert>
         }
    const history=useHistory ();
    const [age, setAge] = React.useState('');
  
    const [formdata,setformdata]=useState({
        StreetName:"",
        HouseNumber:"",
        PostalCode:props.pincode,
        City:"",
        MobileNumber:"",
    })
   
    const handleChange = (e:any) =>{
        const name= e.target.name;
        const value=e.target.value.toString();
        setformdata({...formdata,[name]:value})
        console.log(formdata)
    }
    
    const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const error=addressvalidation(formdata)
        console.log(error)
        if(error.length == 0){

            let user=JSON.parse(localStorage.getItem('user')|| '{}')
            fetch(`http://localhost:5000/user?q=${user.Email}`,{
            method:"GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            }).then(res=>res.json()).then(res =>{
                let data={...formdata,"userId":res[0].id}
                fetch("http://localhost:5000/Address",{
                    method:"POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                    body:JSON.stringify(data)
                  
                }).then(res=>res.json()).then(res =>{
                    console.log(res)
                    console.log(JSON.stringify(data))
                }).catch(e=>console.log(e))
                
            }).catch(e=>console.log(e))
        }
        else{
            setalert({
                showAlert:true,
                status:"error",
                message:error.map((item)=><p key={item + "1"} style={{textAlign:"left"}}>{item}<br/></p>)
                // message:"Please fill all the details"
            })
        }

        // if(error.length == 0){
        //     let data={...formdata,"userId":userId}
        //     fetch("http://localhost:5000/Address",{
        //         method:"POST",
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8"
        //           },
        //         body:JSON.stringify(data)
                
        //     }).then(res=>res.json()).then(res =>{
        //         console.log(res)
        //         console.log(JSON.stringify(data))
        //     }).catch(e=>console.log(e))
        // }
        // else{
        //     setalert({
        //         showAlert:true,
        //         status:"error",
        //         message:error.map((item)=><p key={item + "1"} style={{textAlign:"left"}}>{item}<br/></p>)
        //         // message:"Please fill all the details"
        //     })
        // }
        
    }
    return (
        <>
                <form className="AddAdress" onSubmit={submitform} method="post">
                    {/* {alertt.showAlert ? <AlertMenu/> : null} */}
                    <h2>Street Name</h2> 
                    <CustomTextField1  placeholder="Street Name"    
                    name="StreetName" onChange={handleChange} value={formdata.StreetName}/>
                    {!formdata.StreetName && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 15px 0"}}>StreetName required</Alert>}


                    <h2>House Number</h2>
                    <CustomTextField1  placeholder="House Number"     
                    name="HouseNumber" onChange={handleChange} value={formdata.HouseNumber}/>
                    {!formdata.HouseNumber && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 15px 0"}}>HouseNumber required</Alert>}

                    <h2>Postal Code</h2>
                    <CustomTextField1  placeholder="Postal Code" type="number" 
                    name="PostalCode" onChange={handleChange} value={formdata.PostalCode} disabled/>
                    {!formdata.PostalCode && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 15px 0"}}>PostalCode required</Alert>}
                    
                    <h2>City</h2>
                    <CustomTextField1  placeholder="City"  
                    name="City" onChange={handleChange} value={formdata.City}/>
                    {!formdata.City && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"0 15px 15px 0"}}>City required</Alert>}

                    <h2>Phone Number</h2>
                    <CustomTextField2  placeholder="Mobile number" type="number" name="MobileNumber" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+46</InputAdornment>
                          }}
                          onChange={handleChange} value={formdata.MobileNumber}/>
                    {!formdata.MobileNumber && alertt.showAlert &&<Alert severity={alertt.status} style={{width:"268px",height:"35px",margin:"5px 15px 0 0"}}>MobileNumber required</Alert>}

                                        
                    <CustomButton type="submit" onClick={props.onsub}>Save</CustomButton>
                    <CustomButton type="reset" onClick={props.onclose}>Cancel</CustomButton>

                </form>
        </>
    );
}

export default AddAddress;