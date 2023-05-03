
import React, { useEffect, useState } from 'react';
import {sort,calendar,cap,adminarrow,star1,star2,nextPage,FirstPage,true1,cross,close} from '../assets/images';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';



const CButton = styled(Button)({
    width: "71px",
    height: "34px",
    background: "#f64f4f",
    borderRadius: "17px",
    color:"#FFFFFF",
    fontSize:"14px",
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
function FavouriteProviders() {
    const classes = useStyles();
  return (
    <>
       <Grid container >
            <Grid item lg={3} md={2} sm={4} xs={12} >
            <div className='Favourite-Provicer'>
                <img src={cap} className={classes.cap} alt="logo"/>
                <p>Sandip patel</p>
                <div style={{margin:"10px 0"}}>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star2} style={{margin:"0 5px"}} alt="logo"/> 4
                </div>
                <h1>1 Cleanings</h1>
                <CButton1 >Remove</CButton1><CButton>Block</CButton>
            </div>
            </Grid>
            <Grid item lg={3} md={2} sm={4} xs={12} style={{margin:"0 auto"}}>
            <div className='Favourite-Provicer'>
                <img src={cap} className={classes.cap} alt="logo"/>
                <p>Sandip patel</p>
                <div style={{margin:"10px 0"}}>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star1} style={{margin:"0 5px"}} alt="logo"/>
                    <img src={star2} style={{margin:"0 5px"}} alt="logo"/> 4
                </div>
                <h1>1 Cleanings</h1>
                <CButton1 >Remove</CButton1><CButton>Block</CButton>
            </div>

            </Grid>
            <Grid item lg={3} md={2} sm={4} xs={12} >
                
            </Grid>
        </Grid> 
      
      
      
    </>
  );
}

export default FavouriteProviders;