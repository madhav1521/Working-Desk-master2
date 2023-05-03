
import React, { useEffect, useState } from 'react';
import {sort,calendar,cap,adminarrow,star1,star2,nextPage,FirstPage,true1,cross,close} from '../assets/images';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
  import { toast, ToastContainer } from "react-toastify";



const CButton = styled(Button)({
    width: "71px",
    height: "34px",
    background: "#f64f4f",
    borderRadius: "17px",
    color:"#FFFFFF",
    fontSize:"14px",
    marginTop:"10px",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
    }
  });
  const CButton1 = styled(Button)({
      width: "85px",
      height: "34px",
      background: "#6DA9B5 0% 0% no-repeat padding-box",
      borderRadius: "17px",
      color:"#FFFFFF",
      fontSize:"14px",
      marginRight:"5px",
      textTransform:"capitalize",
      '&:hover': {
          backgroundColor: "#525252"
      }
    });
const useStyles = makeStyles(() => ({
    
    cap:{
        border: "1px solid gray",
        borderRadius: "50%",
        padding:" 10px 5px",
        marginBottom:"15px"
    }
   
  }));
function NewIcon(){
  return(
      <img src={adminarrow} style={{marginRight:"20px"}}></img>
  );
};

function UpcomingBlock() {
  const [USERS , setadd] = useState<any[]>([]);
  const blocklist =[];
  const [Bobj,setBoj]=useState([]);
  const [call,setcall]=useState(false)
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user')|| '{}')
    fetch(`http://localhost:5000/Bookservice?SPemail=${user.Email}`,{
      method:"GET",
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      },
      }).then(res=>res.json()).then(res =>
      {
          USERS.splice(0,10000);
          setadd(res);  
          console.log("called")
      }).catch(e=>console.log(e))

      fetch(`http://localhost:5000/Block-user`,{
      method:"GET",
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      },
      }).then(res=>res.json()).then(res =>
      {
        
          Bobj.splice(0,10000);
          setBoj(res);  
          // console.log("called")
      }).catch(e=>console.log(e))

  },[call])

    const classes = useStyles();
  return (
    <>
       <Grid container >
        {
          USERS.map((i:any)=>{
          if (blocklist.indexOf(i.Email) === -1){
            blocklist.push(i.Email)
            return(
              <Grid item lg={6} md={2} sm={4} xs={12} >
                <div className='Favourite-Provicer' style={{width:"250px",height:"150px"}}>
                    <img src={cap} className={classes.cap} alt="logo"/>
                    <p>{i.FirstName+" "+i.LastName}</p>
                    {
                      Bobj.map((bobj:any,index)=>
                      {
                        return(bobj.userEmail == i.Email?
                          bobj.Blocked==true?
                            <CButton onClick={()=>{
                              let user=JSON.parse(localStorage.getItem('user')|| '{}')
                              fetch(`http://localhost:5000/user?q=${user.Email}`,{
                                method:"GET",
                                headers: {
                                   "Content-type": "application/json; charset=UTF-8"
                                },
                                }).then(res=>res.json()).then(res =>
                                {   
                                    let data={Blocked:false}
                                    console.log("called",res)
                                    fetch(`http://localhost:5000/Block-user/${bobj.id}`,{
                                    method:"PATCH",
                                    headers: {
                                       "Content-type": "application/json; charset=UTF-8"
                                    },
                                    body:JSON.stringify(data)
                                    }).then(res=>res.json()).then(res =>
                                    {
                                      toast.success("Unblocked Suucessfully!",{position: "top-center"});
                                      console.log("called",res)
                                      setcall(!call);
                                    }).catch(e=>console.log(e))
                                    }).catch(e=>console.log(e))
                            }}>UnBlock</CButton>
                          
                          :
                            <CButton onClick={()=>{
                                let user=JSON.parse(localStorage.getItem('user')|| '{}')
                                fetch(`http://localhost:5000/user?q=${user.Email}`,{
                                  method:"GET",
                                  headers: {
                                     "Content-type": "application/json; charset=UTF-8"
                                  },
                                  }).then(res=>res.json()).then(res =>
                                  {   
                                      let data={Blocked:true}
                                      console.log("called",res)
                                      fetch(`http://localhost:5000/Block-user/${bobj.id}`,{
                                      method:"PATCH",
                                      headers: {
                                         "Content-type": "application/json; charset=UTF-8"
                                      },
                                      body:JSON.stringify(data)
                                      }).then(res=>res.json()).then(res =>
                                      {
                                        toast.success("Blocked Suucessfully!",{position: "top-center"});
                                        console.log("called",res)
                                        setcall(!call);
                                      }).catch(e=>console.log(e))
                                      }).catch(e=>console.log(e))
                            }}>Block</CButton>
                          
                        :
                          <CButton onClick={()=>{
                              let user=JSON.parse(localStorage.getItem('user')|| '{}')
                              fetch(`http://localhost:5000/user?q=${user.Email}`,{
                                method:"GET",
                                headers: {
                                   "Content-type": "application/json; charset=UTF-8"
                                },
                                }).then(res=>res.json()).then(res =>
                                {   
                                    let data={Userid:i.userId,Targetid:res[0].id,Blocked:true,userEmail:i.Email}
                                    console.log("called",res)
                                    fetch(`http://localhost:5000/Block-user`,{
                                    method:"POST",
                                    headers: {
                                       "Content-type": "application/json; charset=UTF-8"
                                    },
                                    body:JSON.stringify(data)
                                    }).then(res=>res.json()).then(res =>
                                    {
                                      toast.success("Blocked Suucessfully!",{position: "top-center"});
                                      console.log("called",res)
                                      setcall(!call);
                                    }).catch(e=>console.log(e))
                                    }).catch(e=>console.log(e))
                                }}>Block</CButton>)
                      
                      })
                    }
                </div>
              </Grid>  
            )
          }
          else
            return(null)
          })
          
        }
         {/* {
           blocklist.map((i:any,index)=>{
            return(
              <Grid item lg={6} md={2} sm={4} xs={12} >
                <div className='Favourite-Provicer' style={{width:"250px",height:"150px"}}>
                    <img src={cap} className={classes.cap} alt="logo"/>
                    <p>{i}</p>
                    <CButton>Block</CButton>
                </div>
              </Grid>  
            )
           })
         } */}
         {console.log(blocklist)}
        </Grid> 
      
        <ToastContainer/>
      
    </>
  );
}

export default UpcomingBlock;