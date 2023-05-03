import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import {adminarrow,add,polygon,logout, sort} from '../assets/images';
import { styled } from '@mui/material/styles';
import { Button, Collapse, InputAdornment, List, ListItemButton, ListItemText, MenuItem, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Box, style } from "@mui/system";
import {Select} from "@mui/material";
import ManagementTable from "./management-table";
import LongMenu1 from "./menuitem1";
import LongMenu from "./menuitem";


const CButton = styled(Button)({

    
    height: "36px",
    borderRadius: "4px",
    backgroundColor: "#1FB6FF",
    color:"#FFFFFF",
    fontSize:"14px",
    lineHeight:"24px",
    textTransform:"capitalize",
    '&:hover': {
        backgroundColor: "#525252"
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
        backgroundColor: "#525252"
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
        width:"500px" 
    }
    },
   '@media(max-width:992px)':{
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
   '@media(max-width:1299.98px)':{
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':{
        width:"500px" 
    }},
   '@media(max-width:992px)':{
    '& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root':{
        width:"400px" 
    }
}
});
const CustomBox = styled(Box)({
    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
        color:"#F1F1F1",
    },
    '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper':{
        backgroundColor:"#1D7A8C",

    },
    '& .css-6hp17o-MuiList-root-MuiMenu-list':{
        backgroundColor:"#1D7A8C",
    },
    '& .MuiOutlinedInput-root': {
        height: "46px",
        width:"100%",
        marginRight:"150px",
        backgroundColor:"#1D7A8C",
   },
   '& .MuiSelect-select':{
        color:"#A0A0A0",
   },
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
        width:"205px",
        height:"46px"
    },
    select2:{
        width:"215px",
        height:"46px"
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
      table: {
      width: "1053px",
      border:"1px solid #E1E1E1",
      margin:"0 auto",
      background:"white"
    },
    
    
    '@media(max-width: 1299.98px)':{
        select1:{
          width:"500px",
          marginBottom:"10px"
        },
        select2:{
            width:"500px",
            marginBottom:"10px"
        }
      },
    '@media(max-width: 992px)':{
      select1:{
        width:"400px",
        marginBottom:"10px"
      },
      select2:{
          width:"400px",
          marginBottom:"10px"
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
 
function Umanagement1() {
    const classes = useStyles();
  

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
  const [ customers, setCustomers ] = useState<any[]>([])
    const [ serviceProviders, setServiceProviders ] = useState<any[]>([])

    const generateCustomersAndSPs = () =>{
    let customersSet = new Set<any>()
    let serviceProvidersSet = new Set<any>()
    USERS.map((ele)=>{
      customersSet.add(ele.FirstName)
      customersSet.add(ele.SPname)
      serviceProvidersSet.add(ele.usertype)
    })
    setCustomers(Array.from(customersSet))
    setServiceProviders(Array.from(serviceProvidersSet))
  }
  useEffect(()=>{
    generateCustomersAndSPs()
  },[USERS])
  const [_user, _setUser] = useState<any[]>([]);
  useEffect(() => {
    _setUser([...USERS])
  }, [USERS])
  
  const [filters, setFilters] = useState(Object);
  
  const handleChange = (event: any) => {
    setFilters((prevFilters: Object) => {
      return { ...prevFilters, [event.target.name]: event.target.value.trim() }
    })
  };
  
  const handleInputChange = (event:any) => {
    setFilters((prevFilters: Object) => {
      return { ...prevFilters, [event.target.name]: event.target.value.trim() }
    })
  };
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
  const filterData = () => {
  
    let selectedFilters = Object.entries(filters).filter(ele => ele[1] != "")

    console.log(selectedFilters)
  
    let filteredData = USERS.filter((ele) => {
      for (let i = 0; i < selectedFilters.length; i++) {
        if (ele[selectedFilters[i][0]] != filters[selectedFilters[i][0]]) {
          return false
        }
      }
      return true
    }
    )
    _setUser(filteredData)
  }
  
  const handleSearch = () => {
    filterData()
  }
  
  const hadleClear = () => {
    setFilters({FirstName : "",Mobile:"", userTypeId:"",PostalCode:""})
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
        <div className="user-back">
            <div className="col-2">
               <div className="User-Management1">
                   <h1>User Management</h1>
                   <CButton><img src={add} style={{marginRight:"7px"}}alt=""/>Add New User</CButton>
               </div>
               
                   <div className="User-Management2">
                       <Select
                           value={filters.FirstName}
                           name="FirstName"
                           onChange={handleInputChange}
                           IconComponent={()=>(
                               <img src={adminarrow} style={{marginRight:"11px"}}/>
                           )}
                           inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
                           className={classes.select1}
                           >
                           <MenuItem value="" disabled selected hidden>
                               <em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>User name</em>
                           </MenuItem>
                           {customers.map(FirstName => <MenuItem value={FirstName}>{FirstName}</MenuItem>)}
                       </Select>
                       
                       <Select
                       name="usertype"
                       value={filters.usertype}
                       onChange={handleInputChange}
                       displayEmpty
                       IconComponent={()=>(
                           <img src={adminarrow} style={{marginRight:"11px"}}/>
                       )}
                       className={classes.select2}
                       inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true} }}
        
                       >
                       <MenuItem defaultValue="Status" disabled selected hidden>
                           <em style={{fontSize:"16px",lineHeight:"32px",color:"#A0A0A0"}}>User role</em>
                       </MenuItem>
                       {serviceProviders.map(usertype => <MenuItem value={usertype}>{usertype}</MenuItem>)}
                       </Select>
                       <CustomTextField3 name="Mobile"
                           value={filters.Mobile}
                           onChange={handleChange}
                           placeholder="Mobile number" 
                           InputProps={{
                           startAdornment: <InputAdornment position="start">+49</InputAdornment>}}
                          />
                       <CustomTextField4 placeholder="Zipcode"
                   name="PostalCode"
                   value={filters.PostalCode}
                   onChange={handleChange}/>
                       <CButton1 onClick={handleSearch}>Search</CButton1>
                       <CButton2 onClick={hadleClear}>Clear</CButton2>  
                       
                       
                   </div>

                   <div style={{overflow:"auto",overflowY:"hidden"}}>
                       {/* <ManagementTable/> */}
                       <Table className={classes.table} aria-label="simple table">
                           <TableHead>
                             <TableRow>
                               <TableCell className="tableHeaderCell" onClick={()=>sorting("FirstName")}>
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>User Name<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell" onClick={()=>sorting("userTypeId")}>
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>User Type<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell">
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Mobile<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell"onClick={()=>sorting("PostalCode")}>
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Postal Code<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell" onClick={()=>sorting("City")}>
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>City<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell" >
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Radius<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell" onClick={()=>sorting("FirstName")}>
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>User Status<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
                               </TableCell>
                               <TableCell className="tableHeaderCell">
                                 <div style={{color:"#646464",fontSize:"16px",lineHeight:"16px",fontWeight: '700'}}>Actions</div>
                               </TableCell>
                             </TableRow>
                           </TableHead>
                           <TableBody>
                             {_user.slice((pageValue - 1) * rowsPerPage, pageValue *rowsPerPage).map((row:any) => (
                               <TableRow key={row.name}>
                                   <TableCell>
                                     <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>{row.FirstName} {row.LastName}</Typography>
                                 </TableCell>
                                 <TableCell>
                                       {
                                         row.userTypeId == 0?
                                           <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>Customer</Typography>
                                         :
                                           row.userTypeId == 1?
                                           <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>Service Provider</Typography>
                                           :
                                             <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>Admin</Typography>
                                       }
                                   </TableCell>
                                   
                                 <TableCell>
                                     <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>{row.Mobile}</Typography>
                                 </TableCell>
                                 <TableCell>
                                     <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>{row.PostalCode}</Typography>
                                 </TableCell>
                                 <TableCell>
                                     <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>{row.City}</Typography>
                                 </TableCell>
                                 <TableCell>
                                     <Typography style={{fontSize:"16px",lineHeight:"26px",color: "#646464",}}>{row.Radius}</Typography>
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
                                 

                                 </TableCell>
                               </TableRow>

                             ))}
                           </TableBody>         
                </Table>
              </div>

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
    );
}

export default Umanagement1;