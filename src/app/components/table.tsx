
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {sort,calendar2,layer14,layer15, true1, cross, FirstPage, adminarrow} from '../assets/images';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Table,TableBody,TableCell,TableHead,TableRow,
  Typography,Button} from '@material-ui/core';
  import CloseIcon from '@mui/icons-material/Close';
import { Box, MenuItem, Modal, Pagination, Select, Stack } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";

 const CButton = styled(Button)({
  width: "80px",
  height: "34px",
  background: "#FF6B6B 0% 0% no-repeat padding-box",
  borderRadius: "17px",
  color:"#FFFFFF",
  fontSize:"16px",
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
    flexclass:{
      display:"flex",
      alignItems:"center",
      color:"#646464",
      fontSize:"16px",
      lineHeight:"16px",
      fontWeight: '700',
    },
    tableHeaderCell: {
        fontWeight: '700',
        backgroundColor: "#F9F9F9",
        padding:"14px 34px 16px 14px"
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
    '@media(max-width: 1200px)':{
      table:{
        marginTop:"20px",
        width:"1000px"
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
   function NewIcon(){
    return(
        <img src={adminarrow} style={{marginRight:"20px"}}></img>
    );
  };
 
function MTable() {
  const classes = useStyles();
  const [USERS , setadd] = useState<any[]>([]);
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        fetch(`http://localhost:5000/Bookservice?status=${"Accepted"}&SPemail=${user.Email}`,{
        method:"GET",
        headers: {
           "Content-type": "application/json; charset=UTF-8"
        },
        }).then(res=>res.json()).then(res =>
        {
            USERS.splice(0,10000);
            setadd(res) 
        }).catch(e=>console.log(e))
  },[calluse])
// =======pagination================
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
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("ServiceId")}>
              <div className={classes.flexclass}>Service ID<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("Date")}>
              <div className={classes.flexclass}>Service date<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("FirstName")}>
              <div className={classes.flexclass}>Customer details<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell} >
              <div className={classes.flexclass}>Distance<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexclass}>Actions</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice((pageValue - 1) *rowsPerPage, pageValue *rowsPerPage).map((row:any,index) => (
            <TableRow key={row.name}>
              <TableCell>
                  <Typography className={classes.name} onClick={()=>{setOpen(true);setdata(row)}}>{row.ServiceId}</Typography>
                </TableCell>
              <TableCell>
                  <Typography className={clsx(classes.flex,classes.date)}><img src={calendar2} style={{marginRight:"4px"}} alt="logo"/>{row.Date}</Typography>
                  {/* {
                     let hour2=parseInt(i.Time.slice(0,2));
                     let servicehours=parseInt(i.ServiceHours);
                  } */}
                  <Typography className={clsx(classes.flex,classes.name)}><img src={layer14} style={{marginRight:"4px"}} alt="logo"/>{row.Time}-{parseInt(row.Time.slice(0,2)) + parseInt(row.ServiceHours)}:00</Typography>
              </TableCell>
              <TableCell>
                  <Typography className={classes.name} style={{marginLeft:"26px"}}>{row.FirstName} {row.LastName}</Typography>
                  <Typography className={clsx(classes.flex,classes.name)} ><img src={layer15} style={{marginRight:"6px"}} alt="logo"/>{row.ServiceAddress.slice(0,-18)}</Typography>
              </TableCell>
              <TableCell className={classes.name}>50</TableCell>
              <TableCell>
              <Typography><CButton onClick={()=>{
                        let a={status:"Cancelled"}
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
                      }}>Cancel</CButton></Typography>
              </TableCell>
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
                      <h4><strong>Net Amount:</strong><strong style={{color: "#1D7A8C",fontSize: "24px",fontWeight: "700"}}>{USERS[index].Payment} €</strong></h4>
                    </div>
                    <div>
                      <h4><strong>Customer Name:</strong>{data.FirstName} {data.LastName}</h4>
                      <h4><strong>Service Address:</strong>{data.ServiceAddress.slice(0,-18)}</h4>
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
                      <CButton onClick={()=>{
                        let a={status:"Cancelled"}
                        fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                        method:"PATCH",
                        headers: {
                          "Content-type": "application/json; charset=UTF-8"
                        },
                        body:JSON.stringify(a)              
                        }).then(res=>res.json()).then(res =>{
                        
                        toast.error("Service Cancelled successfully",{position: "top-center"})
                        }).catch(e=>console.log(e))
                        setcall(!calluse)
                        handleClose()
                      }}>cancel</CButton>
                      <CButton style={{backgroundColor:"#1D7A8C",marginLeft:"10px",width:"100px"}} onClick={()=>{
                          let a={status:"Completed"}
                          fetch(`http://localhost:5000/Bookservice/${USERS[index].id}`,{
                          method:"PATCH",
                          headers: {
                            "Content-type": "application/json; charset=UTF-8"
                          },
                          body:JSON.stringify(a)              
                          }).then(res=>res.json()).then(res =>{
                          
                          toast.success("Service Completed successfully",{position: "top-center"})
                          }).catch(e=>console.log(e))
                          setcall(!calluse)
                          handleClose()
                        }}>Complete</CButton>
                    </div>
                    
                  </Box>
              </Modal>
            </TableRow>
            
          ))}
        </TableBody>
        <ToastContainer/>

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
              <p>Total Records :{USERS.length}</p>
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
      </>
  );
}

export default MTable;