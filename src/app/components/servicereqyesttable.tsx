
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {sort,cap,star1,star2,calendar2,layer14,layer15, calendarbookservice, polygon} from '../assets/images';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
import PendingMenu from './pending-menubar';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import CompleteMenu from './complete-menu';
import { IconButton, Modal, Rating, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


 const CButton = styled(Button)({
  width: "650px",
  height: "45px",
  background: "#1FB6FF",
  borderRadius: "17px",
  color:"#FFFFFF",
  fontSize:"16px",
  margin:"10px 0",
  textTransform:"capitalize",
  '&:hover': {
      backgroundColor: "#525252"
  }
});
const useStyles = makeStyles((theme) => ({
    table: {
      width: "1053px",
      border:"1px solid #E1E1E1",
      margin:"0 auto",
      background:"white"
    },
    flex:{
      display:"flex",
      alignItems:"center"
    },
    tableHeaderCell: {
        fontWeight: '700',
        backgroundColor: "#F9F9F9",
        color:"#646464",
        fontSize:"16px",
        lineHeight:"16px",
        padding:"15px 2px 15px 14px",
        cursor:"pointer"
    },
    name: {
        fontSize:"16px",
        lineHeight:"26px",
        color: "#646464",
    },
    cap:{
        border: "1px solid gray",
        borderRadius: "50%",
        padding:" 10px 5px",
        marginRight:"15px"
    },
    date:{
      fontSize:"16px",
      lineHeight:"26px",
      color: "#646464",
      fontWeight:"700",
    },
    Cancelled:{
      background:"#FF6B6B",
      color:"#FFFFFF",
      height:"24px",
      width:"78px",
      fontSize:"13px",
      lineHeight:"24px",
      textAlign:"center",
      padding:"4px 12px 5px 7px"
    },
    Pending:{
      background:"#1FB6FF",
      color:"#FFFFFF",
      height:"24px",
      width:"78px",
      fontSize:"13px",
      lineHeight:"24px",
      textAlign:"center",
      padding:"4px 12px 5px 7px"},

    New:{
      background:"#F2BB37",
      color:"#FFFFFF",
      height:"24px",
      width:"78px",
      fontSize:"13px",
      lineHeight:"24px",
      textAlign:"center",
      padding:"4px 12px 5px 7px"},
    completed:{
        background:"#67B644",
        color:"#FFFFFF",
        height:"24px",
        width:"78px",
        fontSize:"13px",
        lineHeight:"24px",
        textAlign:"center",
        padding:"4px 12px 5px 7px"
    },
    '@media(maxWidth: 1200px)':{
      table:{
        maxWidth:"1200px"
      }
    }
  }));
  const CustomTextField2 = styled(TextField)({
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"40px",
       width:"300px",
       margin:"5px 0"
   }
});
const CustomTextField1 = styled(TextField)({
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
      margin:"14px 0 13px 15px",
      padding:"0"
 },
 '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
     height:"40px",
     width:"650px"
 }
});

// let USERS:any = [],STATUSES = ['Completed', 'Cancelled', 'Pending','New'];
// for(let i=0;i<14;i++) {
//     USERS[i] = {
//       ServiceID: "323436",
//       Servicedate: "09/04/2018",
//       Servicetime:"12:00 - 18:00",
//       Customername:"David Bough ",
//       address:"Musterstrabe 5,12345 Bonn",
//       Distance: "15km",
//       ServiceProvider:"Lyum Watson",
//       Status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
//     }
// }
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
function RequestTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [calluse,setcall]=useState(false)
  const [USERS , setadd] = useState<any[]>([]);
  const [data,setdata]=useState({
    Rooms: 0,
    Bath: 0,
    Date: "0",
    Time: "0",
    ServiceHours: 0,
    ExtraService: "",
    Comments: "",
    ServiceId: 0,
    ServiceAddress: "0",
    Email: "",
    Mobile: "",
    status: "",
    FirstName: "",
    LastName: "",
    datetime: "",
    Totaltime: 0,
    Payment: 0,
    EffPeyment: 0,
    Pet: false,
    userId: 0,
    id: 0,
    SPemail: "",
    rescheduleservice:"",
    EMPNotes:""

  });
  const [displayerror,setdisplayerror]=useState(false)
  const [address,setaddress]=useState({
    StreetName:"",
    HouseNumber:"",
    PostalCode:"",
    City:"",
    MobileNumber:""
  })
  console.log("address:",address)
  const addresschange1=(e:any)=>{
    const name= e.target.name;
    const value=e.target.value.toString();
    setaddress({...address,[name]:value})
    
}
const reason=(e:any)=>{
  const name= e.target.name;
  const value=e.target.value.toString();
  setdata({...data,[name]:value})
}
  console.log("date:",typeof(data.datetime))

  const [time, setTime] = React.useState<Date | null>(new Date());

  const handleChange3 = (date: Date | null) => {
    setTime(date);
  };
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    
  };
  const handleClose = () => setOpen(false);

 
  useEffect(()=>{

    fetch(`http://localhost:5000/Bookservice`,{
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

    },[calluse])

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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("ServiceId")}>
              <div style={{display:"flex",alignItems:"center"}}>Service ID<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("Date")}>
              <div style={{display:"flex",alignItems:"center"}}>Service date<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div style={{display:"flex",alignItems:"center"}}>Customer details<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div style={{display:"flex",alignItems:"center"}}>Service provider<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("status")}>
              <div style={{display:"flex",alignItems:"center"}}>Status<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Actions </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => (
            <TableRow key={row.name}>
              <TableCell>
                  <Typography className={classes.name}>{row.ServiceId}</Typography>
                </TableCell>
              <TableCell>
                  <Typography className={clsx(classes.flex,classes.date)}><img src={calendar2} style={{marginRight:"4px"}} alt="logo"/>{row.Date}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)}><img src={layer14} style={{marginRight:"4px"}} alt="logo"/>{row.Time}</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.name}>{row.FirstName} {row.LastName}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)}><img src={layer15} style={{marginRight:"6px"}} alt="logo"/>{row.ServiceAddress.slice(0,-18)}</Typography>
              </TableCell>
              <TableCell>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <img src={cap} className={classes.cap} alt="logo"/>
                    <Typography className={classes.name}>
                      {
                        row.ServiceProvider ?
                          (row.ServiceProvider)
                          (<Rating name="read-only" value={row.Rating} readOnly style={{marginRight:"10px"}}/>)
                          :null
                      }
                        
                    </Typography>
                  </div>
                </TableCell>
                
                <TableCell >
                        {
                          row.status  === 'Completed' ?
                            (<Typography className={classes.completed}>{row.status}</Typography>)
                          :
                            row.status  === 'Cancelled' ?
                            (<Typography className={classes.Cancelled}>{row.status}</Typography>) 
                            :
                              row.status  === '' ?
                              (<Typography className={classes.New}>New</Typography>)
                              :(<Typography className={classes.Pending}>Pending</Typography>)
                        }

                </TableCell>
                <TableCell>
                    {
                      row.status  === 'Completed' ?
                        (<CompleteMenu/>) 
                      :
                      row.status  === 'Accepted' ?
                        (<PendingMenu modalOpen={()=>{handleOpen();
                          setaddress({
                            StreetName:data.ServiceAddress.split(',')[1],
                            HouseNumber:data.ServiceAddress.split(',')[0],
                            PostalCode:data.ServiceAddress.split(',')[3],
                            City:data.ServiceAddress.split(',')[2],
                            MobileNumber:data.ServiceAddress.slice(-10)
                          })
                          
                          setTime(new Date(data.datetime))
                        }} setdata={()=>setdata(row)}/>)
                      :
                      row.status==='Cancelled' ?
                      (<PendingMenu modalOpen={()=>{handleOpen();
                        setaddress({
                          StreetName:data.ServiceAddress.split(',')[1],
                          HouseNumber:data.ServiceAddress.split(',')[0],
                          PostalCode:data.ServiceAddress.split(',')[3],
                          City:data.ServiceAddress.split(',')[2],
                          MobileNumber:data.ServiceAddress.slice(-10)
                        })
                        setTime(new Date(data.datetime))
                      }} setdata={()=>setdata(row)}/>)
                      :
                      <IconButton aria-label="more" id="long-button"><MoreVertIcon /></IconButton>
                    }
                </TableCell>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box className='admin-modal'>
                  <CloseIcon onClick={handleClose} style={{float:"right", color:"#646464"}}/>
                  
                  <h1>Edit Service Request</h1>
                  <Grid container>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Grid item lg={6}><h2>Date</h2></Grid>
                      <Grid item lg={6}><h2>Time</h2></Grid>
                      <Grid item lg={6}>
                      <Box sx={{'& .MuiOutlinedInput-root':{height: "46px"},'& .MuiInputAdornment-root':{marginRight:"0"}}}>

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
                        </Box>
                      </Grid>
                      <Grid item lg={6}>
                      <Box sx={{'& .MuiOutlinedInput-root':{height: "46px"},'& .MuiInputAdornment-root':{marginRight:"0"}}}>
                        <TimePicker
                          value={time}
                          components={{OpenPickerIcon:polygonicon}}
                          // onChange={(newValue) => {setTime1(newValue);}}
                          onChange={handleChange3}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        </Box>
                      </Grid>
                  
                        
                    </LocalizationProvider>
                    <Grid item lg={12} style={{margin:"5px 0 5px 0"}}><h2>Service Address</h2></Grid>
                    
                    <Grid item lg={6}><p>Street name</p></Grid>
                    <Grid item lg={6}><p>House Number</p></Grid>
                    <Grid item lg={6}>
                          <CustomTextField2  placeholder="Street name" name="StreetName" onChange={addresschange1} value={address.StreetName}/>
                          {!address.StreetName && displayerror &&<p style={{color:"red"}}>**Streetname is required</p>}
                    </Grid>
                    <Grid item lg={6}>
                      <CustomTextField2  placeholder="House Number" name="HouseNumber" onChange={addresschange1} value={address.HouseNumber}/>
                      {!address.HouseNumber && displayerror &&<p style={{color:"red"}}>**House Number is required</p>}                                
                    </Grid>
                    <Grid item lg={6}><p style={{marginTop:"5px"}}>Postal Code</p></Grid>
                    <Grid item lg={6}><p style={{marginTop:"5px"}}>City</p></Grid>
                    <Grid item lg={6} >
                        <CustomTextField2  placeholder="Postal Code" name="PostalCode" onChange={addresschange1} value={address.PostalCode} style={{marginBottom:"10px"}}/>
                        {!address.PostalCode && displayerror &&<p style={{color:"red"}}>**PostalCode is required</p>}  
                    </Grid>
                    <Grid item lg={6} >
                        <CustomTextField2  placeholder="City" name="City"  onChange={addresschange1} value={address.City}/>
                        {!address.City && displayerror &&<p style={{color:"red"}}>**City Name is required</p>}  
                    </Grid>

                    <Grid item lg={12} style={{margin:"5px 0"}}><h2>Invoice Address</h2></Grid>
                    
                    <Grid item lg={6}><p>Street name</p></Grid>
                    <Grid item lg={6}><p>House Number</p></Grid>
                    <Grid item lg={6}>
                        <CustomTextField2  placeholder="Street name" name="StreetName" onChange={addresschange1} value={address.StreetName}/>
                          {!address.StreetName && displayerror &&<p style={{color:"red"}}>**Streetname is required</p>}
                    </Grid>
                    <Grid item lg={6}>
                      <CustomTextField2  placeholder="House Number" name="HouseNumber" onChange={addresschange1} value={address.HouseNumber}/>
                      {!address.HouseNumber && displayerror &&<p style={{color:"red"}}>**House Number is required</p>}                                
                    </Grid>
                    <Grid item lg={6}><p style={{marginTop:"5px"}}>Postal Code</p></Grid>
                    <Grid item lg={6}><p style={{marginTop:"5px"}}>City</p></Grid>
                    <Grid item lg={6} >
                        <CustomTextField2  placeholder="Postal Code" name="PostalCode" onChange={addresschange1} value={address.PostalCode}style={{marginBottom:"10px"}}/>
                        {!address.PostalCode && displayerror &&<p style={{color:"red"}}>**PostalCode is required</p>}  
                    </Grid>
                    <Grid item lg={6} >
                        <CustomTextField2  placeholder="City" name="City"  onChange={addresschange1} value={address.City}/>
                        {!address.City && displayerror &&<p style={{color:"red"}}>**City Name is required</p>}  
                    </Grid>
                    <Grid item lg={12} style={{margin:"5px 0"}}><h2>Why do you want to reschedule service request?</h2></Grid>
                    <Grid lg={12} style={{margin:"0 0 5px 0"}}>
                      <CustomTextField1  placeholder="Why do you want to reschedule service request?" name="rescheduleservice"  value={data.rescheduleservice} onChange={reason}/>
                      {!data.rescheduleservice && displayerror &&<p style={{color:"red"}}>**required</p>} 
                    </Grid>
                     
                    <Grid item lg={12} style={{margin:"5px 0"}}><h2>Call center EMP Notes</h2></Grid>
                    <Grid lg={12}>
                      <CustomTextField1  placeholder="Enter Notes" name="EMPNotes"  value={data.EMPNotes}  onChange={reason}/>
                      {!data.EMPNotes && displayerror &&<p style={{color:"red"}}>**required</p>}  
                    </Grid>
                    <Grid lg={12}><button className='update-button' onClick={()=>{
                        setdisplayerror(true)
                        if(address.StreetName!="" && address.HouseNumber!="" && address.City!="" && address.PostalCode!="" && data.rescheduleservice!="" && address.StreetName!="" && data.EMPNotes!="")
                        {
                          let a=address.HouseNumber+","+address.StreetName+","+address.City+","+address.PostalCode+","+"Mobile:"+address.MobileNumber;
                          console.log(data.id)
                          let c=moment(time!).format('DD-MM-YYYY')
                          let b=moment(time!).format('h:mm A')
                          let add={ServiceAddress:a,datetime:time,Date:c,Time:b,EMPNotes:data.EMPNotes,rescheduleservice:data.rescheduleservice}
                            fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                              method:"PATCH",
                              headers: {"Content-type": "application/json; charset=UTF-8"},
                              body:JSON.stringify(add)
                              }).then(res=>res.json()).then(res =>{
                                   console.log(res)
                              })
                            setcall(!calluse)
                        }
                    }}>Update</button></Grid>
                  </Grid>
                </Box>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
  );
}



export default RequestTable;