
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SelectChangeEvent } from '@mui/material/Select';
import {sort,calendar,cap,adminarrow,star1,star2,nextPage,FirstPage} from '../assets/images';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
import { lineHeight } from '@mui/system';
import { MenuItem, Pagination, Stack,Select,Box, Container, IconButton } from '@mui/material';
import LongMenu1 from './menuitem1';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LongMenu from './menuitem';


const useStyles = makeStyles((theme) => ({
    table: {
      width: "1053px",
      border:"1px solid #E1E1E1",
      margin:"0 auto",
      background:"white"
    },
    flexclass:{
      display:"flex",
      alignItems:"center",
      color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700',
    },
    tableHeaderCell: {
        backgroundColor: "#F9F9F9",
        padding:"15px 2px 15px 14px",
        cursor:"pointer"
    },
    uname:{
      fontSize:"16px",
      lineHeight:"26px",
      color: "#646464",
    },
  
    active:{
        background:"#67B644",
        color:"#FFFFFF",
        width:"60px",
        margin:"0 auto",
        height:"24px",
        fontSize:"13px",
        lineHeight:"24px",
        textAlign:"center"
    },
    Inactive:{
        background:"#FF6B6B",
        color:"#FFFFFF",
        width:"62px",
        height:"24px",
        margin:"0 auto",
        fontSize:"13px",
        lineHeight:"24px",
        textAlign:"center"
    },
    '@media(max-width: 1053px)':{
      table:{
        width:"1024px"
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


function ManagementTable() {
  const classes = useStyles();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [USERS , setadd] = useState<any[]>([]);
  const [calluse,setcall]=useState(false)
  const[Status,setstatus]=useState({
    status:"",
    id:""
  })
  useEffect(()=>{
      fetch(`http://localhost:5000/user?userTypeId=${0}&userTypeId=${1}`,{
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

    const active=()=>{
        let a={status:"Active"}
        fetch(`http://localhost:5000/user/${Status.id}`,{
          method:"PATCH",
          headers: {"Content-type": "application/json; charset=UTF-8"},
          body:JSON.stringify(a)
          }).then(res=>res.json()).then(res =>
          {
            console.log(res)
          }).catch(e=>console.log(e))
          setcall(!calluse)
      }
      const deactivate=()=>{
        let a={status:"Inactive"}
        fetch(`http://localhost:5000/user/${Status.id}`,{
          method:"PATCH",
          headers: {"Content-type": "application/json; charset=UTF-8"},
          body:JSON.stringify(a)
          }).then(res=>res.json()).then(res =>
          {
            console.log(res)
          }).catch(e=>console.log(e))
          setcall(!calluse)
      }
// ========================
  const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
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
    setFilters({ServiceId:"",Customer:"",ServiceProvider:"",status:""})
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
  return (
    <>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div className={classes.flexclass}>User Name<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("userTypeId")}>
              <div className={classes.flexclass}>User Type<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexclass}>Role<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}onClick={()=>sorting("PostalCode")}>
              <div className={classes.flexclass}>Postal Code<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("City")}>
              <div className={classes.flexclass}>City<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} >
              <div className={classes.flexclass}>Radius<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div className={classes.flexclass}>User Status<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexclass}>Actions</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => (
            <TableRow key={row.name}>
                <TableCell>
                  <Typography className={classes.uname}>{row.FirstName} {row.LastName}</Typography>
              </TableCell>
              <TableCell>
                    {
                      row.userTypeId == 0?
                        <Typography className={classes.uname}>Customer</Typography>
                      :
                        row.userTypeId == 1?
                        <Typography className={classes.uname}>Service Provider</Typography>
                        :
                          <Typography className={classes.uname}>Admin</Typography>
                    }
                </TableCell>
              
              <TableCell>
                  <Typography className={classes.uname}>{row.Role}</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.uname}>{row.PostalCode}</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.uname}>{row.City}</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.uname}>{row.Radius}</Typography>
              </TableCell>
              <TableCell >
                {/* <Typography className={classes.active}>Active</Typography> */}
                {
                  row.status  === 'Active' ?
                    (<Typography className={classes.active}>{row.status}</Typography>)
                  :
                    (<Typography className={classes.Inactive}>{row.status}</Typography>)
                }
                </TableCell>
              <TableCell>
                {
                  row.status == 'Active'?
                  <LongMenu1 setdata={()=>setstatus(row)} deactivate={()=>deactivate()}/>
                  :
                  <LongMenu setdata={()=>setstatus(row)} activate={()=>active()}/>
                }
              {/* {setdata={()=>setdata(row)}
                  row.status == 'Active'?
                  <LongMenu1 setdata={setstatus(row)} deactivate={()=>deactivate}/>
                  :
                  <LongMenu setdata={setstatus(row)} />
                } */}
              
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
        
                
      </Table>
  
      
      
      
      </>
  );
}

export default ManagementTable;