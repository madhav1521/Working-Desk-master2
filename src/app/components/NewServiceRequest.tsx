
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {sort,calendar,cap,adminarrow,star1,star2,nextPage,FirstPage,true1,cross,close,calendarbookservice,polygon, calendar2, layer14, layer15} from '../assets/images';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
import { lineHeight } from '@mui/system';
import { MenuItem, Pagination, Stack,Select,Box, Input, Modal, TextField, Checkbox } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
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
      width: "845px",
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
        border: "1px solid gray",
        borderRadius: "50%",
        padding:" 10px 5px",
        marginRight:"15px"
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
    titlediv:{
        display:"flex",
        alignItems:"center",
        marginBottom:"5px"
    }
   
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
  const CustomCheckbox1 = styled(Checkbox)({
    height:"22px",
    width:"22px",
    marginRight:"10px",
    '& .MuiSvgIcon-root':{
        fill: "#1D7A8C",
    }
});

function NewIcon(){
  return(
      <img src={adminarrow} style={{marginRight:"20px"}}></img>
  );
};
function NewIcon1(){
    return(
        <img src={adminarrow} style={{marginRight:"10px",marginLeft:"-10px"}}></img>
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
  
function Newservice() {
  const classes = useStyles();
  const [complete1,setcomplete1]=useState('');
  const [dummy , setdummy] = useState<any[]>([]);
  const [USERS , setadd] = useState<any[]>([]);
  const [block , setblock] = useState<any[]>([]);
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
    status:"",
    ServiceAddress:"",
    Email:"",
    Mobile:"",
    FirstName: "",
    LastName: "",
  });
  const [calluse,setcall]=useState(false)
  
  useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        fetch(`http://localhost:5000/user?q=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        }).then(res=>res.json()).then(res =>{
          
            fetch(`http://localhost:5000/Block-user?Targetid=${res[0].id}&Blocked=${true}`,{
            method:"GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            }).then(blk=>blk.json()).then(blk =>
            {
              fetch(`http://localhost:5000/Bookservice?status=${""}&Postalcode=${res[0].PostalCode}`,{
              method:"GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              }).then(res=>res.json()).then(res =>
              {
                if(Object.keys(blk).length == 0){
                  USERS.splice(0,10000);
                  setadd(res) 
                }
                else
                {
                  let a;
                
                  blk.map((i:any)=>{
                     a=res.filter((obj:any)=>obj.userId != i.Userid && i.Blocked==true)
                    setadd(a)
                  })
                }
                // setadd(res)
              }).catch(e=>console.log(e))
          }).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
        
        
  },[calluse])
  

  const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAge(event.target.value);
    };
    const handleChange3 = (date: Date | null) => {
        setTime(date);
        let a=moment(date!).format('DD-MM-YYYY')
        let b=moment(date!).format('h:mm A')
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
  const [rowsPerPage, setRowsPerPage] = useState(5)
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
  // console.log(rowsPerPage, pageValue)
  // =======================sssssss=====================
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
        <div className={classes.titlediv}>
            <p>Service Area:</p>
            <Select
                    value={age}
                    onChange={()=>handleChange}
                    style={{height:"30px",margin:"0 10px"}}
                    IconComponent={NewIcon1}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                    >
                    <MenuItem value="" >
                        <em>10 km</em>
                    </MenuItem>
                    <MenuItem value={20}>20 km</MenuItem>
                    <MenuItem value={30}>30 km</MenuItem>
                    <MenuItem value={40}>40 km</MenuItem>
                    <MenuItem value={50}>50 km</MenuItem>
                </Select>
            <CustomCheckbox1 onChange={(e:any)=>setcomplete1(e.target.checked)}/>
            {/* <CustomCheckbox1 onChange={(e:any)=>setcomplete(e.target.checked)}/> */}
            <p>Include Pet at home</p>
        </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("ServiceId")}>
              <div className={classes.flexdiv}>Service Id<img src={sort} style={{marginLeft:"2px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("Date")}>
              <div className={classes.flexdiv}>Service Date<img src={sort} style={{marginLeft:"2px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div className={classes.flexdiv}>Customer Detail<img src={sort} style={{marginLeft:"2px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("EffPeyment")}>
              <div className={classes.flexdiv}>Payment<img src={sort} style={{marginLeft:"2px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexdiv}>Time Conflicts<img src={sort} style={{marginLeft:"2px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexdiv}>Actions</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice((pageValue - 1) *rowsPerPage, pageValue *rowsPerPage).map((row,index) => (
            complete1? 
              row.Pet?            
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
                  <Typography className={classes.name} style={{marginLeft:"26px"}}>{row.FirstName} {row.LastName}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)} ><img src={layer15} style={{marginRight:"6px"}} alt="logo"/>{row.ServiceAddress.slice(0,-18)}</Typography>
              </TableCell>
              <TableCell >
                <div className={classes.pound}><span style={{fontSize:"20px",lineHeight:"24px"}}>€</span>{row.EffPeyment}</div>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <CButton style={{backgroundColor:"#1D7A8C"}} onClick={()=>{
                    let user=JSON.parse(localStorage.getItem('user')|| '{}')
                          
                    fetch(`http://localhost:5000/user?q=${user.Email}`,{
                    method:"GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                    }).then(res=>res.json()).then(res =>{
                        console.log(res)
                        let SPname=res[0].FirstName + " "+ res[0].LastName;
                        let a={status:"Accepted",SPemail:user.Email,SPname:SPname}
                        fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                        method:"PATCH",
                        headers: {
                          "Content-type": "application/json; charset=UTF-8"
                        },
                        body:JSON.stringify(a)              
                        }).then(res=>res.json()).then(res =>{
                            console.log(res)
                            toast.success("Service Accepted successfully",{position: "top-center"})
                        }).catch(e=>console.log(e))
                        setcall(!calluse)
                    }).catch(e=>console.log(e))

                     
            
                }}>Accept</CButton>
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
                      <h4><strong>Extras:</strong>{data.id}</h4>
                      <h4><strong>Net Amount:</strong><strong style={{color: "#1D7A8C",fontSize: "24px",fontWeight: "700"}}>{data.Payment} €</strong></h4>
                    </div>
                    <div>
                      <h4><strong>Customer Name:</strong>{data.FirstName} {data.LastName}</h4>
                      <h4><strong>Service Address:</strong>{data.ServiceAddress}</h4>
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
                      <CButton style={{backgroundColor:"#1D7A8C"}} onClick={()=>{
                          let user=JSON.parse(localStorage.getItem('user')|| '{}')
                          
                          fetch(`http://localhost:5000/user?q=${user.Email}`,{
                          method:"GET",
                          headers: {
                              "Content-type": "application/json; charset=UTF-8"
                            },
                          }).then(res=>res.json()).then(res =>{
                              console.log(res)
                              let SPname=res[0].FirstName + " "+ res[0].LastName;
                              let a={status:"Accepted",SPemail:user.Email,SPname:SPname}
                              fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                              method:"PATCH",
                              headers: {
                                "Content-type": "application/json; charset=UTF-8"
                              },
                              body:JSON.stringify(a)              
                              }).then(res=>res.json()).then(res =>{
                                  console.log(res)
                                  toast.success("Service Accepted successfully",{position: "top-center"})
                              }).catch(e=>console.log(e))
                              setcall(!calluse)
                          }).catch(e=>console.log(e))
                          handleClose()
                        }}>Accept</CButton>
                      <CButton style={{marginLeft:"10px"}} onClick={()=>{
                        let user=JSON.parse(localStorage.getItem('user')|| '{}')
                        let a={status:"Cancelled",SPemail:user.Email}
                        fetch(`http://localhost:5000/Bookservice/${row.id}`,{
                        method:"PATCH",
                        headers: {
                          "Content-type": "application/json; charset=UTF-8"
                        },
                        body:JSON.stringify(a)              
                        }).then(res=>res.json()).then(res =>{
                        
                        toast.error("Service Cencelled successfully",{position: "top-center"})
                        }).catch(e=>console.log(e))
                        setcall(!calluse)
                      }}>cancel</CButton>
                    </div>
                    
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
                      let user=JSON.parse(localStorage.getItem('user')|| '{}')
                      let a={status:"Cancelled",SPemail:user.Email}
                      fetch(`http://localhost:5000/Bookservice/${row.id}`,{
                      method:"PATCH",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                      body:JSON.stringify(a)              
                      }).then(res=>res.json()).then(res =>{
                      
                      toast.error("Service Cencelled successfully",{position: "top-center"})
                      }).catch(e=>console.log(e))
                      setcall(!calluse)
                    }}>Cancel Now</CButton1>
                </Box>
              </Modal>
              </TableRow>
              :null
            : <TableRow key={row.id} >
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
              <Typography className={classes.name} style={{marginLeft:"26px"}}>{row.FirstName} {row.LastName}</Typography>
              <Typography className={clsx(classes.flex,classes.name)} ><img src={layer15} style={{marginRight:"6px"}} alt="logo"/>{row.ServiceAddress.slice(0,-18)}</Typography>
          </TableCell>
          <TableCell >
            <div className={classes.pound}><span style={{fontSize:"20px",lineHeight:"24px"}}>€</span>{row.EffPeyment}</div>
          </TableCell>
          <TableCell>
          </TableCell>
          <TableCell>
            <CButton style={{backgroundColor:"#1D7A8C"}} onClick={()=>
            {
                let user=JSON.parse(localStorage.getItem('user')|| '{}')
                      
                fetch(`http://localhost:5000/user?q=${user.Email}`,{
                method:"GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
                }).then(res1=>res1.json()).then(res1 =>{
                    let SPname=res1[0].FirstName + " "+ res1[0].LastName;
                    let a={status:"Accepted",SPemail:user.Email,SPname:SPname}
                    fetch(`http://localhost:5000/Bookservice?SPemail=${user.Email}&status=${"Accepted"}`,{
                      method:"GET",
                      headers: {
                          "Content-type": "application/json; charset=UTF-8"
                        }
                      }).then(res=>res.json()).then(res =>{
                      
                    if(Object.keys(res).length != 0)
                  {
                    let samedayservice=res.filter((obj:any) => obj.Date==data.Date)
                    console.log("if object call",samedayservice)
                    if(Object.keys(samedayservice).length != 0)
                    {
                      console.log("nested if object call",samedayservice)

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
                        toast.warn(`Another service has been assigned by you on ${conflicts[0].Date} at 
                        ${conflicts[0].Time} for ${conflicts[0].ServiceHours} hours`,{position: "top-center"} )
                      }
                      else
                      {
                        fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                          method:"PATCH",
                          headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                          body:JSON.stringify(a)              
                          }).then(res=>res.json()).then(res =>{
                              console.log(res)
                              toast.success("Service Accepted successfully",{position: "top-center"})
                          }).catch(e=>console.log(e))
                        setcall(!calluse)
                      }
                    }
                  else{
                    fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                      method:"PATCH",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                      body:JSON.stringify(a)              
                      }).then(res=>res.json()).then(res =>{
                          console.log(res)
                          toast.success("Service Accepted successfully",{position: "top-center"})
                      }).catch(e=>console.log(e))
                    setcall(!calluse)
                  }

                    }
                    else
                  {
                    fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                      method:"PATCH",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      },
                      body:JSON.stringify(a)              
                      }).then(res=>res.json()).then(res =>{
                          console.log(res)
                          toast.success("Service Accepted successfully",{position: "top-center"})
                      }).catch(e=>console.log(e))
                    setcall(!calluse)
                    }
                  }).catch(e=>console.log(e))
                }).catch(e=>console.log(e))

            }}>Accept</CButton>
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
                  <h4><strong>Extras:</strong>{data.id}</h4>
                  <h4><strong>Net Amount:</strong><strong style={{color: "#1D7A8C",fontSize: "24px",fontWeight: "700"}}>{data.Payment} €</strong></h4>
                </div>
                <div>
                  <h4><strong>Customer Name:</strong>{data.FirstName} {data.LastName}</h4>
                  <h4><strong>Service Address:</strong>{data.ServiceAddress}</h4>
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
                  <CButton style={{backgroundColor:"#1D7A8C"}} onClick={()=>{
                      let user=JSON.parse(localStorage.getItem('user')|| '{}')
                      
                      fetch(`http://localhost:5000/user?q=${user.Email}`,{
                      method:"GET",
                      headers: {
                          "Content-type": "application/json; charset=UTF-8"
                        },
                      }).then(res1=>res1.json()).then(res1 =>{
                          // console.log(res1)
                          let SPname=res1 [0].FirstName + " "+ res1[0].LastName;
                          let a={status:"Accepted",SPemail:user.Email,SPname:SPname}
                          fetch(`http://localhost:5000/Bookservice?SPemail=${user.Email}&status=${"Accepted"}`,{
                            method:"GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                              }
                            }).then(res=>res.json()).then(res =>{
                          
                          if(Object.keys(res).length != 0)
                          {
                            let samedayservice=res.filter((obj:any) => obj.Date==data.Date)
                            console.log("if object call",samedayservice)
                            if(Object.keys(samedayservice).length != 0)
                            {
                              console.log("nested if object call",samedayservice)

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
                                toast.warn(`Another service has been assigned by you on ${conflicts[0].Date} at 
                                ${conflicts[0].Time} for ${conflicts[0].ServiceHours} hours`,{position: "top-center"} )
                              }
                              else
                              {
                                fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                                  method:"PATCH",
                                  headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                  },
                                  body:JSON.stringify(a)              
                                  }).then(res=>res.json()).then(res =>{
                                      console.log(res)
                                      toast.success("Service Accepted successfully",{position: "top-center"})
                                  }).catch(e=>console.log(e))
                                setcall(!calluse)
                              }
                            }
                          else{
                            fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                              method:"PATCH",
                              headers: {
                                "Content-type": "application/json; charset=UTF-8"
                              },
                              body:JSON.stringify(a)              
                              }).then(res=>res.json()).then(res =>{
                                  console.log(res)
                                  toast.success("Service Accepted successfully",{position: "top-center"})
                              }).catch(e=>console.log(e))
                            setcall(!calluse)
                          }

                          }
                          else
                          {
                            fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                              method:"PATCH",
                              headers: {
                                "Content-type": "application/json; charset=UTF-8"
                              },
                              body:JSON.stringify(a)              
                              }).then(res=>res.json()).then(res =>{
                                  console.log(res)
                                  toast.success("Service Accepted successfully",{position: "top-center"})
                              }).catch(e=>console.log(e))
                            setcall(!calluse)
                          }
                        }).catch(e=>console.log(e))

                      }).catch(e=>console.log(e))
                      handleClose()
                    }}>Accept</CButton>

                  <CButton style={{marginLeft:"10px"}} onClick={()=>{
                    let user=JSON.parse(localStorage.getItem('user')|| '{}')
                    let a={status:"Cancelled",SPemail:user.Email}
                    fetch(`http://localhost:5000/Bookservice/${row.id}`,{
                    method:"PATCH",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    },
                    body:JSON.stringify(a)              
                    }).then(res=>res.json()).then(res =>{
                    
                    toast.error("Service Cencelled successfully",{position: "top-center"})
                    }).catch(e=>console.log(e))
                    setcall(!calluse)
                  }}>cancel</CButton>
                </div>
                
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
                  let user=JSON.parse(localStorage.getItem('user')|| '{}')
                  let a={status:"Cancelled",SPemail:user.Email}
                  fetch(`http://localhost:5000/Bookservice/${row.id}`,{
                  method:"PATCH",
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
                  body:JSON.stringify(a)              
                  }).then(res=>res.json()).then(res =>{
                  
                  toast.error("Service Cencelled successfully",{position: "top-center"})
                  }).catch(e=>console.log(e))
                  setcall(!calluse)
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
                    onChange={handlePageChange} />  
                </Stack>
              <div className='page-btn2'><img src={FirstPage} /></div>
            </div>
        </div>
        <ToastContainer/>
      
      </>
  );
}

export default Newservice;