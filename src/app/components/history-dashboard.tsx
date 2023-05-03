
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {sort,calendar,cap,adminarrow,star1,star2,nextPage,FirstPage,true1,cross,close,calendarbookservice,polygon, calendar2, layer14, a1, a2, a3, a4, a5} from '../assets/images';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
import { lineHeight } from '@mui/system';
import { MenuItem, Pagination, Stack,Select,Box, Input, Modal, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CSVLink } from "react-csv";
import moment from "moment";
import emailjs from 'emailjs-com';

import { toast, ToastContainer } from "react-toastify";

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
const useStyles = makeStyles((theme) => ({
    table: {
      width: "880px",
      border:"1px solid #E1E1E1",
      margin:"0 auto"
    },
    flex:{
      display:"flex",
      alignItems:"center"
    },
    flexdiv:{
      display:"flex",
      alignItems:"center",
      color:"#646464",
      fontSize:"16px",
      lineHeight:"16px",
      fontWeight: '700',
    },
    tableHeaderCell: {
        backgroundColor: "#F9F9F9",
        padding:"15px 2px 15px 14px",
    },
    name: {
        fontSize:"16px",
        lineHeight:"26px",
        color: "#646464",
    },
    date:{
      fontSize:"16px",
      lineHeight:"26px",
      color: "#646464",
      fontWeight:"700",
    },
    cap:{
        // border: "1px solid gray",
        // borderRadius: "50%",
        // padding:" 10px 5px",
        // marginRight:"15px"
        border: "1px solid gray",
        borderRadius: "50%",
        marginRight:"15px",
        width:"50px",
        height:"50px"
    },
    pound:{
        fontSize:"24px",
        color:"#1D7A8C",
        fontWeight:"700",
       
    },
    complete:{
        background:"#67B644",
        color:"#FFFFFF",
        width:"82px",
        height:"22px",
        fontSize:"13px",
        lineHeight:"24px",
        textAlign:"center"
    },
    Cancelled:{
        background:"#FF6B6B",
        color:"#FFFFFF",
        width:"76px",
        height:"22px",
        fontSize:"13px",
        lineHeight:"24px",
        textAlign:"center"
    },
    datepicker:{
        maxWidth:"360px",
        marginTop:"10px",
        display:"flex",
        marginBottom:"10px"
    },
    timepicker:{
        marginLeft:"10px"
    },
   
  }));
  const CustomBox1 = styled(Box)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
      paddingRight:"26px",
    },
    '& .MuiOutlinedInput-root': {
        height: "38px",
        width:"62px",
        color:"#646464",
        
   },
   });
   const CustomTextField1 = styled(TextField)({
 
    '& .MuiOutlinedInput-root':{
        height:"70px",
        width:"350px"
    },
    '@media(max-width:767.99px)':{
     '& .MuiOutlinedInput-root':{
         width:"575px"
     },
     },
     '@media(max-width:575.98px)':{
         '& .MuiOutlinedInput-root':{
             width:"320px"
         },
     }
 });
  const CustomPagination = styled(Pagination)({
    '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':{
  
      backgroundColor:"#1D7A8C",
      color:"#FFFFFF",
      width:"32px",
      height:"32px",
      borderRadius:"50%",
    },
  
     '& .MuiButtonBase-root':{
  
      color:"#777777",
      border:"1px solid #E1E1E1",
      borderRadius:"50%",
      width:"32px",
      height:"32px",
     },
  
    '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover':{
      backgroundColor:"#1D7A8C",
      color:"#FFFFFF",
    }
   })

// let USERS:any = [],STATUSES = ['Completed', 'Cancelled'];
let STATUSES = ['Completed', 'Cancelled'];


function NewIcon(){
  return(
      <img src={adminarrow} style={{marginRight:"20px"}}></img>
  );
};
function datepickericon(){
    return(
        <img src={calendarbookservice}></img>
    );
  };
  function polygonicon(){
    return(
        <img src={polygon} style={{transform: "rotate(-90deg)"  }}></img>
    );
  };
  
function HDashboard() {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [USERS , setadd] = useState<any[]>([]);
  const [conflict , setconflict] = useState<any[]>([]);
  const [data,setdata]=useState({
    Bath: "0",
    Comments: "",
    Date: "",
    EffPeyment: 0,
    ExtraService: "",
    Payment: 0,
    Pet: false,
    Rooms: "",
    ServiceHours: "",
    ServiceId: 0,
    Time: "0",
    Totaltime: "0",
    id: 0,
    userId: 0,
    ServiceAddress:"",
    Email:"",
    Mobile:"",
    SPemail:""
  });
  const [calluse,setcall]=useState(false)
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user')|| '{}')
    // console.log("useeffect call:"+calluse)
    fetch(`http://localhost:5000/user?q=${user.Email}`,{
    method:"GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res=>res.json()).then(res =>{
                let a=res[0].id
                fetch(`http://localhost:5000/Bookservice?userId=${a}&status=${""}&status=${"Accepted"}`,{
                method:"GET",
                headers: {
                   "Content-type": "application/json; charset=UTF-8"
                },
            }).then(res=>res.json()).then(res =>
            {
                USERS.splice(0,10000);
               
                setadd(res);  
                // console.log("called")
            }).catch(e=>console.log(e))
    }).catch(e=>console.log(e))
  },[calluse])
  
  // const reschedule =()=>{
  //       let a={Date:data.Date,Time:data.Time,datetime:time}
  //       console.log("sp:",data.SPemail)
  //       fetch(`http://localhost:5000/Bookservice/${data.id}`,{
  //           method:"PATCH",
  //           headers: {
  //               "Content-type": "application/json; charset=UTF-8"
  //             },
  //           body:JSON.stringify(a)
          
  //           }).then(res=>res.json()).then(res =>{
  //               console.log(res)
  //               emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
  //               // history.push("/upcoming");
  //           }).catch(e=>console.log(e))
  // }
  const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAge(event.target.value);
    };
    const handleChange3 = (date: Date | null) => {
        setTime(date);
        let a=moment(date!).format('DD-MM-YYYY')
        let b=moment(date!).format('HH:mm')
        setdata({...data,Date:a,Time:b})
      };
      const handlecomment = (event:any) => {
      };
    const [time, setTime] = React.useState<Date | null>(new Date());
    const [open, setOpen] = React.useState(false);
   
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
 // Pagination
 const [pageCount, setPageCount] = useState(0)
 const [rowsPerPage, setRowsPerPage] = useState(4)
 const [pageValue, setPageValue] = useState(1)

 const handleResetPageValue = () => {
   setPageValue(1)
 }

 const handleRowsPerPage = (event: any) => {
   console.log(event.target.value)
   setRowsPerPage(event.target.value)
 }

 const calcPageCount = () => {
   setPageCount(Math.ceil(USERS.length / rowsPerPage))
   handleResetPageValue()
 }

 useEffect(() => {
   calcPageCount()
 }, [USERS, rowsPerPage])

 const handlePageChange = (event: any, value: any) => {
   console.log(value)
   setPageValue(value)
 }
//  console.log(rowsPerPage, pageValue)
    const[order,setorder]=useState("ASC")
    const sorting =(col)=>{
      if(order === "ASC"){
        const sorted = [...USERS].sort((a,b)=>
        a[col].toString().toLowerCase()> b[col].toString().toLowerCase() ? 1 : -1
        );
        setadd(sorted);
        setorder("DSC")
      }
      if(order === "DSC"){
        const sorted = [...USERS].sort((a,b)=>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
        );
        setadd(sorted);
        setorder("ASC")
      }
    }
  return (
    <>
        <div className="service-history">
        <h1>Current Service Requests</h1>
        <button style={{width:"200px"}}>Add New Service Request</button>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("ServiceId")}>
              <div className={classes.flexdiv}>Service Id<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("Date")}>
              <div className={classes.flexdiv}>Service Date<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("SPname")}>
              <div className={classes.flexdiv}>Service Provider<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("EffPeyment")}>
              <div className={classes.flexdiv}>Payment<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} >
              <div className={classes.flexdiv}>Actions<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice((pageValue - 1) *rowsPerPage, pageValue *rowsPerPage).map((row) => (
            <TableRow key={row.id} >
                <TableCell>
                <h1>{row.ServiceId}</h1>
              </TableCell>
              <TableCell onClick={()=>{
                setOpen(true)
                setdata(row);
              }
              }>
                <div className={clsx(classes.flex,classes.date)}><img src={calendar2} style={{marginRight:"4px"}} alt="logo"/>{row.Date}</div>  
                <div className={clsx(classes.flex,classes.date)}><img src={layer14} style={{marginRight:"4px"}} alt="logo"/>{row.Time}</div>  
              </TableCell>
              <TableCell>
                <div style={{display:"flex",alignItems:"center"}}>
                    { row.avtar =="a1"?<img src={a1} className={classes.cap} alt={row.avtar}></img>
                      :
                      row.avtar =="a2"?
                          <img src={a2} className={classes.cap} alt={row.avtar}></img>
                      :
                      row.avtar =="a3"?
                          <img src={a3} className={classes.cap} alt={row.avtar}></img>
                      :
                      row.avtar =="a4"?
                          <img src={a4} className={classes.cap} alt={row.avtar}></img>
                      : <img src={a5} className={classes.cap} alt={row.avtar}></img>
                    }
                      {/* <img src={cap} className={classes.cap} alt="logo"/> */}
                      <div className={classes.name}>
                          {row.SPname}
                          <div>
                              <img src={star1} style={{}} alt="logo"/>
                              <img src={star1} style={{}} alt="logo"/>
                              <img src={star1} style={{}} alt="logo"/>
                              <img src={star1} style={{}} alt="logo"/>
                              <img src={star2} style={{}} alt="logo"/> 4
                          </div>
                      </div>
                </div>
              </TableCell>
              <TableCell >
                <div className={classes.pound}><span style={{fontSize:"20px",lineHeight:"24px"}}>€</span>{row.EffPeyment}</div>
              </TableCell>
              <TableCell>
              <Typography><CButton1 onClick={()=>
              {
                handleOpen1()
                setdata(row);
              }}>Reschedule</CButton1><CButton onClick={()=>{
                handleOpen2()
                setdata(row);
                }}>cancel</CButton></Typography>
              </TableCell>
              {/* ========================modal==================== */}
              
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                  <Box className='History-row'>
                    <CloseIcon onClick={handleClose} style={{float:"right", color:"#646464"}}/>
                    <h1>Service Details</h1>
                    <h2>{data.Date} {data.Time}</h2>
                    <h3><strong>Duration:</strong>{data.ServiceHours} Hrs</h3>
                    <div>
                      <h4><strong>Service id:</strong> {data.ServiceId}</h4>
                      <h4><strong>Extras:</strong>
                        {data.ExtraService["Inside cabinets"]?<p>Inside cabinets </p>:null}
                        {data.ExtraService["Inside fridge"]?<p>Inside fridge </p>:null}
                        {data.ExtraService["Inside oven"]?<p>Inside oven </p>:null}
                        {data.ExtraService["Laundry wash & dry"]?<p>Laundry wash & dry</p>:null}
                        {data.ExtraService["Interior windows"]?<p>Interior windows</p>:null}
                      </h4>
                      <h4><strong>Net Amount:</strong><strong style={{color: "#1D7A8C",fontSize: "24px",fontWeight: "700"}}>{data.Payment} €</strong></h4>
                    </div>
                    <div>
                      <h4><strong>Service Address:</strong>{data.ServiceAddress}</h4>
                      <h4><strong>Billing Address:</strong>{data.ServiceAddress}</h4>
                      <h4><strong>Phone:</strong>{data.Mobile}</h4>
                      <h4><strong>Email:</strong>{data.Email}</h4>
                    </div>
                    <div>
                    <h4>Comments:{data.Comments}</h4>
                      {
                        data.Pet?
                        <p style={{display:"flex",alignItems:"center"}}> <img src={true1} style={{width:"30px",height:"20px",marginRight:"5px"}}></img>I have a pets at home</p>
                        :
                        <p style={{display:"flex",alignItems:"center"}}> <img src={cross} style={{width:"20px",height:"20px",marginRight:"5px"}}></img>I don't have a pets at home</p>
                      }
                    </div>
                    <div style={{marginTop:"10px"}}>
                      <CButton1 style={{marginRight:"10px"}}onClick={()=>{handleOpen1();setdata(row)}}>Reschedule</CButton1>
                      <CButton onClick={()=>{handleOpen2();setdata(row)}}>cancel</CButton>
                    </div>
                    
                  </Box>
              </Modal>
           
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className='History-date'>
                  <CloseIcon onClick={handleClose1} style={{float:"right", color:"#646464"}}/>
                  <h1>Reschedule Service Request</h1>
                  <p>Select New Date & Time</p>
                  <Box className={classes.datepicker} sx={{'& .MuiOutlinedInput-root':{height: "46px"},'& .MuiInputAdornment-root':{marginRight:"0"}}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} style={{marginRight:"10px",height:"40px"}}>
                        <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        value={time}
                        onChange={handleChange3}
                        disablePast
                        components={{OpenPickerIcon:datepickericon}}
                        renderInput={(params) => <TextField {...params} />}
                        InputAdornmentProps={
                            {position:'start'}
                        }
                        />
                        <div style={{width:"10px"}}></div>
                        <TimePicker
                        value={time}
                        minutesStep={60}  
                        components={{OpenPickerIcon:polygonicon}}
                        // onChange={(newValue) => {setTime1(newValue);}}
                        onChange={handleChange3}
                        className={classes.timepicker}
                        renderInput={(params) => <TextField {...params} />}
                         />
                    </LocalizationProvider>
                    </Box>
                    <CButton1 onClick={()=>{
                      setcall(!calluse)
                      let a={Date:data.Date,Time:data.Time,datetime:time}
                      // console.log("sp:",data.SPemail)
                      if(data.SPemail)
                      {
                        fetch(`http://localhost:5000/Bookservice?SPemail=${data.SPemail}&status=${"Accepted"}`,{
                        method:"GET",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          }
                        }).then(res=>res.json()).then(res =>{
                          
                          // console.log("conflict:",res)
                          if(Object.keys(res).length != 0)
                          {
                            let samedayservice=res.filter((obj:any) => obj.Date==data.Date)
                            console.log("if object call",samedayservice)
                            if(Object.keys(samedayservice).length != 0)
                            {
                                let conflicts=samedayservice.map((i:any)=>{
                                if(data.ServiceId != i.ServiceId){
                                  let hour1=parseInt(data.Time.slice(0,2));
                                  let hour2=parseInt(i.Time.slice(0,2));
                                  let servicehours=parseInt(i.ServiceHours);
                                  if(hour1-(hour2+servicehours)<1){
                                    if(hour2-(hour1+parseInt(data.ServiceHours))<1){
                                      // setconflict()
                                      return i;
                                    }
                                    else 
                                      return false;
                                  }
                                  else
                                    return false;
                                }
                                else
                                  return false;
                              })
                              conflicts=conflicts.filter((cf:any)=>cf!=false)
                              if(conflicts.length !=0){
                                toast.warn(`Another service has been assigned to the service provider on ${conflicts[0].Date} at 
                                ${conflicts[0].Time} for ${conflicts[0].ServiceHours} hours`,{position: "top-center"} )
                              }
                              else
                              {
                                fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                                  method:"PATCH",
                                  headers: {
                                      "Content-type": "application/json; charset=UTF-8"
                                    },
                                  body:JSON.stringify(a)
                                  
                                  }).then(res=>res.json()).then(res =>{
                                      console.log(res)
                                      emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                                  }).catch(e=>console.log(e))
                              }
                            }
                            else{
                              fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                              method:"PATCH",
                              headers: {
                                  "Content-type": "application/json; charset=UTF-8"
                                },
                              body:JSON.stringify(a)
                              
                              }).then(res=>res.json()).then(res =>{
                                  console.log(res)
                                  emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                              }).catch(e=>console.log(e))
                            }

                          }
                          else
                          {
                            console.log("else object call")
                            fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                              method:"PATCH",
                              headers: {
                                  "Content-type": "application/json; charset=UTF-8"
                                },
                              body:JSON.stringify(a)
                              
                              }).then(res=>res.json()).then(res =>{
                                  console.log(res)
                                  emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                              }).catch(e=>console.log(e))
                          }
                        }).catch(e=>console.log(e))
                        // console.log("conflict:",conflict)
                        // console.log("conflict:",Object.keys(conflict).length)
                        
                      }
                      else
                      {   
                        fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                        method:"PATCH",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                        body:JSON.stringify(a)
                      
                        }).then(res=>res.json()).then(res =>{
                            console.log(res)
                            emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                            // history.push("/upcoming");
                        }).catch(e=>console.log(e))
                      }
                    }}>Update</CButton1>
                </Box>
              </Modal>
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className='History-date'>
                  {/* <img src={close} onClick={handleClose} style={{position:"absolute",top:"5%",right:"5%",height:"20px",width:"20px",cursor:"pointer"}}></img> */}
                  <CloseIcon onClick={handleClose2} style={{float:"right", color:"#646464"}}/>
                  <h1>Cancel Service Request</h1>
                  <p>Why you want to cancel the service request?</p>
                  <CustomTextField1 onChange={handlecomment} value={""}></CustomTextField1>
                    <CButton1 style={{width:"100px",marginTop:"10px"}} onClick={()=>{
                      setcall(!calluse)
                      let a={status:"Cancelled"}
                      fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                      method:"PATCH",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                      body:JSON.stringify(a)              
                      }).then(res=>res.json()).then(res =>{
                          toast.error("Service Cencelled successfully",{position: "top-center"})
                      }).catch(e=>console.log(e))
                    }}>Cancel Now</CButton1>
                </Box>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
  
      
      
        <div className='pagination-sec'>
            <div className='entry-count'>
              <p>Show</p>
              <CustomBox1 style={{paddingRight:"15px"}}>
                <Select
                    value={rowsPerPage}
                    onChange={handleRowsPerPage}
                    IconComponent={NewIcon}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
                </CustomBox1>
              <p>entries</p>
              <p>Total Records : {USERS.length}</p>
            </div>
            <div className='pagination'>
              <div className='page-btn'><img src={FirstPage} /></div>
                <Stack spacing={2}>
                  <CustomPagination 
                    count={pageCount}
                    variant="outlined"
                    shape="rounded"
                    page={pageValue}
                    onChange={handlePageChange}/>  
                </Stack>
              <div className='page-btn2'><img src={FirstPage} /></div>
            </div>
        </div>
        <ToastContainer/>

      </>
  );
}

export default HDashboard;