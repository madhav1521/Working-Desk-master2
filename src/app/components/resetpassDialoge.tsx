import { Button, Checkbox, TextField,Alert, Modal, Box  } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useHistory  } from "react-router-dom";
import { Loginvalidation } from "../validation/validation";
import { toast, ToastContainer } from "react-toastify";

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

function Resetpass(props:any) {
           const history=useHistory ();
            const [formdata,setformdata]=useState({
                Password:"",
                CPassword:"",
            })
           const[alert,setalert]=useState(false);
            const handleChange = (e:any) =>{
                const name= e.target.name;
                const value=e.target.value.toString();
                setformdata({...formdata,[name]:value})
                
            }
        
            const submitform = (e:React.FormEvent<HTMLFormElement>) =>{
                e.preventDefault()
                const error=Loginvalidation(formdata)
                
                if(formdata.Password != "" && formdata.CPassword != "" && formdata.Password == formdata.CPassword){
                    let a=({token:props.token,NewPassword:formdata.Password})
                    fetch(`http://localhost:5000/account/validateResetPasswordLink/`,{
                        method:"POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                    body:JSON.stringify(a)
                    }).then(res=>res.json()).then(res =>{
                        console.log(res)
                        if(res.error){
                            toast.error("Link is invalid or expired",{position: "top-center"});
                        }
                        else
                        {
                            // console.log(formdata.Password)
                            toast.success("Password reset successsfully",{position: "top-center"});
                            handleClose();
                            history.push("/");
                        }
                            
                    }).catch(e=>console.log(e))
                }
                // if(error.length == 0){
                //     let data={...formdata}
                //     fetch(`http://localhost:5000/user?q=${data.Email}`,{
                //         method:"GET",
                //         headers: {
                //             "Content-type": "application/json; charset=UTF-8"
                //           },
                //     }).then(res=>res.json()).then(res =>{
                //         console.log(res)
                        
                        
                //     }).catch(e=>console.log(e))
                      
                // }
                // else{
                    
                //     toast.error("Please fill all the details",{position: "top-center"});
                // }
            }
            const [open, setOpen] = React.useState(false);
            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);

    return (
        <>
        {/* <CButton className="login-btn"  style={{background:props.background}}onClick={handleOpen}>Login</CButton> */}
            
            <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="login-box">
                <form className="loginmenu"  onSubmit={submitform} method="get">
                    {/* {alertt.showAlert ? <AlertMenu/> : null} */}
                    <h1>Reset Your Password </h1>
                
                    <CustomTextField1  placeholder="Password"  type="Password" 
                    name="Password" onChange={handleChange} value={formdata.Password}/>
                    {!formdata.Password && alert &&<Alert severity="error" style={{width:"268px",height:"35px",margin:"0 15px 10px 0"}}>Password required</Alert>}

                     <CustomTextField1  placeholder="Confirm Password"  type="CPassword" 
                    name="CPassword" onChange={handleChange} value={formdata.CPassword}/>

                    {!formdata.CPassword && alert && <Alert severity="error" style={{width:"268px",height:"35px"}}>Confirm pasword required</Alert>}
                    {formdata.Password != formdata.CPassword && alert && <Alert severity="error"style={{width:"268px",height:"35px"}}>password and confirm password didn't match</Alert>}
                    
                    <CustomButton type="submit" onClick={()=>setalert(true)}>Reset</CustomButton>
                </form>
            </Box>
          </Modal>
         
            <ToastContainer/>
        </>
    );
}

export default Resetpass;