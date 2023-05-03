import { Button, Checkbox, TextField,Alert, Modal, Box  } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useHistory  } from "react-router-dom";
import { Loginvalidation } from "../validation/validation";
import { toast, ToastContainer } from "react-toastify";
import emailjs from 'emailjs-com';

const CustomTextField1 = styled(TextField)({
   
   '& .MuiOutlinedInput-root':{
       height:"46px",
       width:"286px",
       margin:"10px auto",
   },
   '& .MuiOutlinedInput-input':{
       padding:"11px 14px"
   }

});


const CButton = styled(Button)({

    height: "40px",
    width: "97px",
    fontSize: "17px",
    borderRadius: "20px",
    lineHeight: "24px",
    color:" #FFFFFF",
    border: "1px solid #FFFFFF",
    textTransform: "capitalize",
    marginRight:" 11px",
    '&:hover': {
        backgroundColor: "#FFFFFF",
        color:"black"
    }
});
const CustomTextField2 = styled(TextField)({
   
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
        height:"46px",
        width:"286px",
        margin:"10px 17px"
    },
 //    '@media(max-width:380px)':{
 //     '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
 //       width:"300px" 
 //     }
 // }
 });
const CustomButton1 = styled(Button)({

    width: "125px",
    height: "46px",
    background: "#1D7A8C 0% 0% no-repeat padding-box",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"16px",
    margin:"10px auto",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
});


const CustomButton = styled(Button)({

    width: "125px",
    height: "46px",
    background: "#1D7A8C",
    borderRadius: "23px",
    color:"#FFFFFF",
    fontSize:"16px",
    margin:"10px auto",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
});
const CustomCheckbox = styled(Checkbox)({

    '& .MuiSvgIcon-root':{
        fill: "#C8C8C8",
    }
});

function Login(props:any) {
           const history=useHistory ();
            const [formdata,setformdata]=useState({
                Email:"",
                Password:"",
            })
            const [resetEmail,setreset]=useState("");
            const [checkboxdata,setcheckboxdata]=useState({
               newslattercheck:false,
               termcheck:false
            })
            const handleChange = (e:any) =>{
                const name= e.target.name;
                const value=e.target.value.toString();
                setformdata({...formdata,[name]:value})
                console.log(value)
            }
            const submitform1 = (e:any) =>{
                e.preventDefault();
                let a={Email:resetEmail}
                fetch(`http://localhost:5000/account/forgotpassword/`,{
                    method:"POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                body:JSON.stringify(a)
                }).then(res=>res.json()).then(res =>{
                    console.log(res)
                    if(res=="Sent"){
                        toast.success(res,{position: "top-center"});
                    }
                    else
                        toast.error(res,{position: "top-center"});
                }).catch(e=>console.log(e))
                
            }
            const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
                e.preventDefault()
                const error=Loginvalidation(formdata)
                console.log(error)
                if(error.length == 0){
                    let data={...formdata}
                    fetch(`http://localhost:5000/user?q=${data.Email}`,{
                        method:"GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                    }).then(res=>res.json()).then(res =>{
                        console.log(res)
                        if(res.length==0){
                            toast.error("Email Address is not exist please register",{position: "top-center"});
                        }
                        else if(res[0].status=="Inactive"){
                            toast.error("Account is Not activated",{position: "top-center"});
                        }
                        else if(res[0].Password != data.Password){
                            
                            console.log("Details are not valid")
                            toast.error("Details are not valid",{position: "top-center"});
                        }
                        else{
                            if(res[0].userTypeId == 0){
                                // props.handelClose();
                                let a={...data,userTypeId:res[0].userTypeId}
                                localStorage.setItem("user",JSON.stringify(a)); 
                                history.push("/history")
                            }
                            else if(res[0].userTypeId ==1){
                                let a={...data,userTypeId:res[0].userTypeId}
                                localStorage.setItem("user",JSON.stringify(a)); 
                                history.push("/upcoming");
                            }
                            else{
                                let a={...data,userTypeId:res[0].userTypeId}
                                localStorage.setItem("user",JSON.stringify(a)); 
                                history.push("/srequest");
                            }
                        }
                        
                    }).catch(e=>console.log(e))
                      
                }
                else{
                    
                    toast.error("Please fill all the details",{position: "top-center"});
                }
            }
            const [open, setOpen] = React.useState(false);
            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);

            const [open1, setOpen1] = React.useState(false);
            const handleOpen1 = () => {
                setOpen1(true)
                setOpen(false)
            };
            const handleClose1 = () => {
                setOpen1(false)
                setOpen(true)
            };
    return (
        <>
        <CButton className="login-btn"  style={{background:props.background}}onClick={handleOpen}>Login</CButton>
            
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="login-box">
                <form className="loginmenu"  onSubmit={submitform} method="get">
                    {/* {alertt.showAlert ? <AlertMenu/> : null} */}
                    <h1>Login to Your account</h1>
                    <CustomTextField1  placeholder="Email Address" 
                    onChange={handleChange} value={formdata.Email}
                    name="Email" />
                    <CustomTextField1  placeholder="Password"  type="Password" 
                    name="Password" onChange={handleChange} value={formdata.Password}/>
                    <div className="remember">
                        <CustomCheckbox style={{padding:"0px"}}/>
                        <p>Remember me</p>
                    </div>
                    <CustomButton type="submit" onClick={e => {document.body.classList.remove('login-open')}}>Login</CustomButton>
                    <h2 onClick={handleOpen1}
                    >Forgot Password?</h2>
                    <h3>Don't have an account? <Link to="/uregistration">Create an account</Link></h3>
                </form>
            </Box>
          </Modal>
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="forgot-box">
                <form className="forgot-password" onSubmit={submitform1}>
                    <h1>Forgot password</h1>
                    <CustomTextField2  placeholder="Email Address" value={resetEmail} type="email" name="Email" onChange={(e)=>setreset(e.target.value)} />
                    <CustomButton1 type="submit">Send</CustomButton1>
                    <a href="#" onClick={()=>{handleClose1();}}
                        type="submit">Login now</a>
                </form>
            </Box>
          </Modal>
            <ToastContainer/>
        {/* </Container> */}
        </>
    );
}

export default Login;