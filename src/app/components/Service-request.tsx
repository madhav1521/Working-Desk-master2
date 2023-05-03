import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import clsx from 'clsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {adminarrow,add,polygon,logout,admincalendar, sort, calendar2, layer14, layer15, cap} from '../assets/images';
import { styled } from '@mui/material/styles';
import { Button, Grid, IconButton, InputAdornment, MenuItem, Modal, Pagination, Rating, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Box, display, style } from "@mui/system";
import {Select} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { useHistory } from "react-router-dom";
import CompleteMenu from "./complete-menu";
import CloseIcon from '@mui/icons-material/Close';
import PendingMenu from "./pending-menubar";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import emailjs from 'emailjs-com';

const CButton = styled(Button)({

    
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "#1FB6FF",
    color:"#FFFFFF",
    fontSize:"14px",
    lineHeight:"24px",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252",
    }
});
const CButton1 = styled(Button)({
    width:"84px",
    height: "46px",
    borderRadius: "4px",
    backgroundColor: "#1FB6FF",
    color:"#FFFFFF",
    fontSize:"14px",
    lineHeight:"24px",
    textTransform:"capitalize",
    margin:"10px 0",
    '&:hover': {
        backgroundColor: "#525252",
    }
});
const CButton2 = styled(Button)({
    width:"84px",
    height: "46px",
    borderRadius: "4px",
    color:"#646464",
    border: "1px solid #DEDDDD",
    lineHeight:"24px",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252",
        color:"white"
    }
});
const CustomTextField1 = styled(TextField)({
    
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0",
        color:"#A0A0A0",
        fontSize:"16px",
        lineHeight:"32px",
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"110px"
   },
   '@media(max-width:1299.98px)':{
    marginTop:"10px",
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
        width:"400px" ,
        marginBottom:"10px"
    }
    }
});
const CustomTextField4 = styled(TextField)({
    
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
        margin:"14px 0 13px 15px",
        padding:"0"
   },
   '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
       height:"46px",
       width:"140px"
   },
   '@media(max-width:1299.98px)':{
    marginTop:"10px",
    '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root':{
        width:"400px" 
    }
    }
});
const CustomTextField3 = styled(TextField)({
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root': {
        height: "46px",
        padding:"0",
        width:"219px"
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
//    '@media(max-width:992px)':{
//     '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':{
//         width:"400px" 
//     }
// }
});

const CustomDesktopDatePicker = styled(DesktopDatePicker)({
 '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root':{
     width:"135px"
 },
 '& .MuiInputBase-input-MuiOutlinedInput-input':{
     padding:"0px"
 },
 '& .MuiInputBase-root-MuiOutlinedInput-root':{
     height:"40px"
 }
}
);
const Customselect = styled(Select)({
   
    
   });
   
const CustomBox = styled(Box)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
        padding:"0 0 0 10px",
    },
    '@media(max-width:1300px)':{
        display:"flex",
        flexDirection:"column"
    }
   });
   
   function NewIcon(){
    return(
        <img src={adminarrow} style={{marginRight:"20px"}}></img>
    );
  };
  const useStyles = makeStyles((theme) => ({
    select:{
        background:"#1D7A8C"
    },
    select1:{
        width:"127px",
        height:"46px"
    },
    select2:{
        width:"152px",
        height:"46px",
        margin:"0 10px 0 11px"
    },
    select3:{
        width:" 120px",
        height:"46px"
    },
    datepicker:{
        maxWidth:"270px",
        display:"flex",
    },
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
    New:{
        background:"#F2BB37",
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
        padding:"4px 12px 5px 7px"
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
    '@media(maxWidth: 1200px)':{
        table:{
          maxWidth:"1200px"
        }
      },
    '@media(max-width: 1299.98px)':{
      select1:{
        width:"400px",
        marginBottom:"10px"
      },
      select2:{
          width:"400px",
          margin:"0 0 10px 0"
      },
      select3:{
        width:"400px",
        marginBottom:"10px"
      },
      datepicker:{
          maxWidth:"400px"
      }
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
   const CustomPagination = styled(Pagination)({
    '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':{
      backgroundColor:"#1D7A8C",
      color:"#FFFFFF",
    },
    '& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root':{
        padding:"0",
        margin:"0"
    },
     '& .MuiButtonBase-root':{
      color:"#777777",
      border:"1px solid #E1E1E1",
      width:"40px",
      height:"40px",
     },
     '& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':{
        backgroundColor:"#565656",
        color:"white"
     },
    '& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover':{
      backgroundColor:"#565656",
      color:"#FFFFFF",
    }
   })
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
const DatePickerTextField=styled(TextField)({
})
function datepickericon(){
    return(
        <img src={admincalendar}></img>
    );
  };

  function polygonicon(){
    return(
        <img src={polygon} style={{transform: "rotate(-90deg)"  }}></img>
    );
  };
function Srequesttable() {
    const classes = useStyles();
    const history=useHistory();
    const [age, setAge] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [age2, setAge2] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    const handleChange1 = (event: SelectChangeEvent) => {
        setAge1(event.target.value);
    };
    const handleChange4 = (event: SelectChangeEvent) => {
        setAge2(event.target.value); 
    };
    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );
      const [value1, setValue1] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );
    
    
      const handleChange2 = (newValue: Date | null) => {
        setValue(newValue);
      };
      const handleChange5 = (newValue: Date | null) => {
        setValue1(newValue);
      };

  //     const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [calluse,setcall]=useState(false)
  const [USERS , setadd] = useState<any[]>([]);
  const [data,setdata]=useState({
    Rooms: 0,
    Bath: 0,
    Date: "0",
    Time: "0",
    ServiceHours: "",
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
    const [ customers, setCustomers ] = useState<any[]>([])
    const [ serviceProviders, setServiceProviders ] = useState<any[]>([])

    const generateCustomersAndSPs = () =>{
    let customersSet = new Set<any>()
    let serviceProvidersSet = new Set<any>()
    USERS.forEach((ele)=>{
      customersSet.add(ele.FirstName)
      serviceProvidersSet.add(ele.SPname)
    })
    setCustomers(Array.from(customersSet))
    setServiceProviders(Array.from(serviceProvidersSet))
  }

  console.log(customers,serviceProviders)

  useEffect(()=>{
    generateCustomersAndSPs()
  },[USERS])
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
  console.log(rowsPerPage, pageValue)
// =============================filterrrrrrrrrrrrrrr==============
    const [_user, _setUser] = useState<any[]>([]);
  useEffect(() => {
    _setUser([...USERS])
  }, [USERS])

  const [filters, setFilters] = useState(Object);

  const handleChange6 = (event: SelectChangeEvent) => {
    setFilters((prevFilters: Object) => {
      return { ...prevFilters, [event.target.name]: event.target.value.trim() }
    })
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters: Object) => {
      return { ...prevFilters, [event.target.name]: event.target.value.trim() }
    })
  };

  const [fromDate, setFromDate] = React.useState<Date | string>(new Date());
  const handleFromDateChange = (date: Date | string) => {
    setFromDate(date)
  };

  const [toDate, setToDate] = React.useState<Date | string>(new Date());
  const handleToDateChange = (date: Date | string) => {
    setToDate(date)
  };

  const filterData = () => {

    let selectedFilters = Object.entries(filters).filter(ele => ele[1] != "")
    console.log(selectedFilters)

    // filtering data except date filters
    let filteredData = USERS.filter((ele) => {
      for (let i = 0; i < selectedFilters.length; i++) {
        if (ele[selectedFilters[i][0]] != filters[selectedFilters[i][0]]) {
          return false
        }
      }
      return true
    })
    
    let filteredDataByDate = filteredData.filter(ele => new Date(ele.Date.split("-").reverse().join("-")) >= fromDate && new Date(ele.Date.split("-").reverse().join("-")) <= toDate)
    _setUser(filteredDataByDate)
  }

  const handleSearch = () => {
    filterData()
  }

  const hadleClear = () => {
    // let a=filters.FirstName.clearValue();
    setFilters({ServiceId:"",Customer:"",ServiceProvider:"",status:null,FirstName:null,SPname:null})
    
    // filters.SPname.clearValue();
    // filters.status.clearValue();
    _setUser([...USERS])
  }
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
    return(
        <div className="user-back">
    
        <div className="col-2">
            <div className="User-Management1">
                <h1>Service Requests</h1>
            </div>
                <div className="User-Management2">
                <CustomTextField1  placeholder="Service ID" name='ServiceId' onChange={handleInputChange} value={filters.ServiceId}/>
                <CustomBox>
                <Select
                        value={filters.FirstName}
                        name="FirstName"
                        onChange={handleChange6}
                        IconComponent={()=>(
                            <img src={adminarrow} style={{marginRight:"11px"}}/>
                        )}
                        inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                        className={classes.select1}
                        
                        >
                        <MenuItem value="Customer" disabled selected hidden>
                            <em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Customer</em>
                        </MenuItem>
                        {customers && customers.map(FirstName => <MenuItem value={FirstName}>{FirstName}</MenuItem>)}
                    </Select>
                    {console.log("customer:",customers)}
                    <Select
                        name="SPname"
                        onChange={handleChange6}
                        displayEmpty
                        placeholder="Service Provider"
                        IconComponent={()=>(
                            <img src={adminarrow} style={{marginRight:"11px"}}/>
                        )}
                        inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                        className={classes.select2}
                        >
                        <MenuItem defaultValue="Service Provider" disabled selected hidden>
                            <em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Service Provider</em>
                        </MenuItem>
                        {serviceProviders && serviceProviders.map(SPname => <MenuItem value={SPname}>{SPname}</MenuItem>)} 
            
                    </Select>
                    <Select
                        name="status"
                        onChange={handleChange6}
                        displayEmpty
                        IconComponent={()=>(
                            <img src={adminarrow} style={{marginRight:"11px"}}/>
                        )}
                        inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                        className={classes.select3}
                        >
                        <MenuItem defaultValue="Status" disabled selected hidden>
                            <em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Status</em>
                        </MenuItem>
                        <MenuItem  value={"Completed"}><em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Completed</em></MenuItem>
                        <MenuItem  value={"Cancelled"}><em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Cancelled</em></MenuItem>
                        <MenuItem  value={""}><em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>New</em></MenuItem>
                        <MenuItem  value={"Accepted"}><em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>Pending</em></MenuItem>
                    </Select>
                    </CustomBox>
                    
                    <Box className={classes.datepicker} sx={{'& .MuiOutlinedInput-root':{height: "46px"}}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} style={{marginRight:"10px",height:"40px"}}>
                    <CustomDesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={fromDate}
                        onChange={(newVal: any) => handleFromDateChange(newVal)}
                        components={{OpenPickerIcon:datepickericon}}
                        renderInput={(params) => <DatePickerTextField {...params} 
                        // inputProps={{placeholder:"From Date"}}
                        />}
                        InputAdornmentProps={
                            {position:'start'}
                        }
                      
                        />
                        <div style={{width:"10px",marginLeft:"10px"}}></div>
                        <CustomDesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={toDate}
                        onChange={(newVal: any) => handleToDateChange(newVal)}
                        components={{OpenPickerIcon:datepickericon}}
                        InputAdornmentProps={{position:'start'}}
                        renderInput={(params) => <DatePickerTextField {...params}
                         />}
                       
                        />
                    </LocalizationProvider>
                    </Box>
                   
                    <CButton1 onClick={handleSearch}>Search</CButton1>
                    <CButton2 onClick={hadleClear}>Clear</CButton2>   
                    
                    
                </div>
                <div style={{overflow:"auto",overflowY:"hidden"}}>
                {/* <RequestTable/> */}
                <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableHeaderCell" onClick={()=>sorting("ServiceId")}>
              <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Service ID<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className="tableHeaderCell" onClick={()=>sorting("Date")}>
              <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Service date<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className="tableHeaderCell" onClick={()=>sorting("FirstName")}>
              <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Customer details<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className="tableHeaderCell" onClick={()=>sorting("FirstName")}>
              <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Service provider<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className="tableHeaderCell" onClick={()=>sorting("status")}>
              <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Status<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className="tableHeaderCell"><div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Actions</div> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_user.slice((pageValue - 1) * rowsPerPage, pageValue *rowsPerPage).map((row:any) => (
            <TableRow key={row.name}>
              <TableCell>
                  <Typography className={classes.name}>{row.ServiceId}</Typography>
                </TableCell>
              <TableCell>
                  <Typography className={classes.flex}><img src={calendar2} style={{marginRight:"4px"}} alt="logo"/>{row.Date}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)}><img src={layer14} style={{marginRight:"4px"}} alt="logo"/>{row.Time}</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.name}>{row.FirstName} {row.LastName}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)}><img src={layer15} style={{marginRight:"6px"}} alt="logo"/>{row.ServiceAddress.slice(0,-18)}</Typography>
              </TableCell>
              <TableCell>
                {
                  row.SPname?
                  (
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img src={cap} className={classes.cap} alt="logo"/>
                      <Typography className={classes.name}>
                          {row.SPname}
                          <Rating name="read-only" value={row.Rating} readOnly style={{marginRight:"10px"}}/>
                      </Typography>
                    </div>
                  )
                  :null
                }
                  
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
                      row.status  === 'Accepted' || row.status  === ''?
                        (<PendingMenu modalOpen={()=>{handleOpen();
                          setaddress({
                            StreetName:data.ServiceAddress.split(',')[1],
                            HouseNumber:data.ServiceAddress.split(',')[0],
                            PostalCode:data.ServiceAddress.split(',')[3],
                            City:data.ServiceAddress.split(',')[2],
                            MobileNumber:data.ServiceAddress.slice(-10)
                          })
                          setTime(new Date(data.datetime))
                        }} 
                        setdata={()=>setdata(row)}
                        cancel={()=>{
                          let a={status:"Cancelled"}
                          fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                            method:"PATCH",
                            headers: {"Content-type": "application/json; charset=UTF-8"},
                            body:JSON.stringify(a)
                            }).then(res=>res.json()).then(res =>
                            {
                              console.log(res)
                            }).catch(e=>console.log(e))
                            setcall(!calluse)
                        }}
                        />)
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
                          minutesStep={60}  
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
                    </Grid>
                     
                    <Grid item lg={12} style={{margin:"5px 0"}}><h2>Call center EMP Notes</h2></Grid>
                    <Grid lg={12}>
                      <CustomTextField1  placeholder="Enter Notes" name="EMPNotes"  value={data.EMPNotes}  onChange={reason}/>
                    </Grid>
                    <Grid lg={12}><button className='update-button' onClick={()=>{
                        setdisplayerror(true)
                        if(address.StreetName!="" && address.HouseNumber!="" && address.City!="" && address.PostalCode!="" && data.rescheduleservice!="" && address.StreetName!="")
                        {
                          let a=address.HouseNumber+","+address.StreetName+","+address.City+","+address.PostalCode+","+"Mobile:"+address.MobileNumber;
                          console.log(data.id)
                          let c=moment(time!).format('DD-MM-YYYY')
                          let b=moment(time!).format('HH:mm')
                          let add={ServiceAddress:a,datetime:time,Date:c,Time:b,EMPNotes:data.EMPNotes,rescheduleservice:data.rescheduleservice}
                          if(data.SPemail)
                          {
                            fetch(`http://localhost:5000/Bookservice?SPemail=${data.SPemail}&status=${"Accepted"}`,{
                              method:"GET",
                              headers: {
                                  "Content-type": "application/json; charset=UTF-8"
                                }
                              }).then(res=>res.json()).then(res =>{
                                
                                // console.log("conflict:",res)
                                if(Object.keys(res).length != 0){
                                  let samedayservice=res.filter((obj:any) => obj.Date==data.Date)
                                  console.log("if object call",samedayservice)
                                  if(Object.keys(samedayservice).length != 0){
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
                                        headers: {"Content-type": "application/json; charset=UTF-8"},
                                        body:JSON.stringify(add)
                                        }).then(res=>res.json()).then(res =>{
                                             console.log(res)
                                             emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                                        })
                                        setcall(!calluse)
                                    }
                                  }
                                  else{
                                    fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                                      method:"PATCH",
                                      headers: {"Content-type": "application/json; charset=UTF-8"},
                                      body:JSON.stringify(add)
                                      }).then(res=>res.json()).then(res =>{
                                           console.log(res)
                                           emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                                      })
                                      setcall(!calluse)
                                  }
      
                                }
                                else
                                {
                                  fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                                    method:"PATCH",
                                    headers: {"Content-type": "application/json; charset=UTF-8"},
                                    body:JSON.stringify(add)
                                    }).then(res=>res.json()).then(res =>{
                                         console.log(res)
                                         emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                                    })
                                    setcall(!calluse)
                                }
                              }).catch(e=>console.log(e))
                          }
                          else
                          {
                            fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                              method:"PATCH",
                              headers: {"Content-type": "application/json; charset=UTF-8"},
                              body:JSON.stringify(add)
                              }).then(res=>res.json()).then(res =>{
                                   console.log(res)
                                   emailjs.send('service_jvv6rrd','template_ibx5dfg',res,'ITzav1NronUYWixci')
                              })
                            setcall(!calluse)
                          }
                        }
                    }}>Update</button></Grid>
                  </Grid>
                </Box>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
                </div>
                
                <ToastContainer/>

                <div className='pagination-sec1'>
                    <div className='entry-count1'>
                        <p>Show</p>
                        <CustomBox1 style={{paddingRight:"15px"}}>
                            <Select
                                value={rowsPerPage}
                                onChange={handleRowsPerPage}
                                IconComponent={NewIcon}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                                >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                            </Select>
                        </CustomBox1>
                        <p>Entries:{USERS.length}</p>
                    </div>
                    <div className='pagination'>
                        <div className="square-icon">
                            <img src={polygon} alt=""/>
                        </div>
                        <Stack spacing={2} >
                            <CustomPagination 
                            count={pageCount}
                            variant="outlined"
                            shape="rounded"
                            page={pageValue}
                            onChange={handlePageChange}
                            />
                        </Stack>
                        <div className="square-icon square-icon2">
                            <img src={polygon} alt=""/>
                        </div>
                    </div>
                </div>
                <p className="copyright">©2018 Helperland. All rights reserved.</p>
        </div>
    </div>
    )
}
export default Srequesttable;