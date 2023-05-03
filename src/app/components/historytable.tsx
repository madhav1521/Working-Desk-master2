
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SelectChangeEvent } from '@mui/material/Select';
import {sort,calendar,cap,adminarrow,star1,a1,a2,a3,a4,a5,star2,nextPage,FirstPage,true1,cross,close, layer14, calendar2} from '../assets/images';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Avatar,Grid,Typography,TablePagination,TableFooter,Button} from '@material-ui/core';
import { lineHeight } from '@mui/system';
import { CSVLink } from "react-csv";
import { MenuItem, Pagination, Stack,Select,Box, Input, Modal, TextField, Rating } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";

 const CButton = styled(Button)({
  width: "71px",
  height: "34px",
  background: "#6DA9B5 0% 0% no-repeat padding-box",
  borderRadius: "17px",
  color:"#FFFFFF",
  fontSize:"14px",
  textTransform:"capitalize",
  '&:hover': {
      backgroundColor: "#525252"
  }
});
const useStyles = makeStyles((theme) => ({
    table: {
      width: "861px",
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
        cursor:"pointer"
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
 const CButton1 = styled(Button)({
  width: "100px",
  height: "34px",
  background: "#146371",
  borderRadius: "17px",
  color:"#FFFFFF",
  fontSize:"14px",
  marginTop:"20px",
  textTransform:"capitalize",
  '&:hover': {
      backgroundColor: "#525252"
  }
});
// let USERS:any = [],STATUSES = ['Completed', 'Cancelled'];
let STATUSES = ['Completed', 'Cancelled'];


function NewIcon(){
  return(
      <img src={adminarrow} style={{marginRight:"20px"}}></img>
  );
};
function HTable() {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


  const [USERS , setadd] = useState<any[]>([]);
  const [comment,setcomment]=useState("");
  const [calluse,setcall]=useState(false)
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user')|| '{}')

    fetch(`http://localhost:5000/user?q=${user.Email}`,{
    method:"GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res=>res.json()).then(res =>{
                let a=res[0].id
                fetch(`http://localhost:5000/Bookservice?status=${"Completed"}&status=${"Cancelled"}&userId=${a}`,{
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
    }).catch(e=>console.log(e))
  },[calluse])
  

// ========================
  const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAge(event.target.value);
    };
    const [data,setdata]=useState({
      Bath: "0",
      Comments: "",
      Date: "",
      EffPeyment: 0,
      ExtraService: {},
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
      SPcommnet:"",
      Rating:"",
      avtar:"",
      SPname:""
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    // =======rating=================
    const [value, setValue] = React.useState<number | null>(0);
    const [value1, setValue1] = React.useState<number | null>(0);
    const [value2, setValue2] = React.useState<number | null>(0);
    const [total, settotal] = React.useState<number | null>(0);
  // Pagination
  const [pageCount, setPageCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(1)
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
      <div className="service-history">
        <h1>Service History</h1>
        <button className="export"><CSVLink data={USERS} filename={"User-History-Data"}>Export</CSVLink></button>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} style={{width:"100px"}} onClick={()=>sorting("ServiceId")}>
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
            <TableCell className={classes.tableHeaderCell} onClick={()=>sorting("status")}>
              <div className={classes.flexdiv}>Status<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              <div className={classes.flexdiv}>Rate SP<img src={sort} style={{marginLeft:"4px"}} alt="logo"/></div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {_user.slice((pageValue - 1)  rowsPerPage, pageValue  rowsPerPage) */}
          {USERS.slice((pageValue - 1) *rowsPerPage, pageValue *rowsPerPage).map((row:any) => (
            <TableRow key={row.name} >
              <TableCell onClick={()=>{
                setOpen(true)
                setdata(row);
              }} >
                  <p>{row.ServiceId}</p>
              </TableCell>
                <TableCell onClick={()=>{
                setOpen(true)
                setdata(row);
              }}>
                  <div className={clsx(classes.flex,classes.date)}><img src={calendar2} style={{marginRight:"4px"}} alt="logo"/>{row.Date}</div>
                  <div className={clsx(classes.flex,classes.name)}><img src={layer14} style={{marginRight:"4px"}} alt="logo"/>{row.Time}</div>
              </TableCell>
              <TableCell >
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
                    <div className={classes.name}>
                      <p>{row.SPname}</p>
                        <div style={{display:"flex"}}><Rating name="read-only" value={row.Rating} readOnly style={{marginRight:"10px"}}/></div>
                    </div>
                  </div>
                </TableCell>
              
              <TableCell>
                  <div className={classes.pound}><span style={{fontSize:"20px",lineHeight:"24px"}}>€</span>{row.EffPeyment}</div>
              </TableCell>
              <TableCell >
                {/* <div className={classes.complete}>Completed</div> */}
                {
                  row.status  === 'Completed' ?
                    (<div className={classes.complete}>{row.status}</div>)
                  :
                    (<div className={classes.Cancelled}>{row.status}</div>)
                }
              </TableCell>
              <TableCell>
              <Typography>
                {
                  row.status=='Cancelled'?
                    <CButton disabled>Rate SP</CButton>
                  :
                    <CButton onClick={()=>{handleOpen1();setdata(row);}}>Rate SP</CButton>
                }
              
                </Typography>
              </TableCell>
              {/* ========================modal==================== */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className='History-row'>
                  {/* <img src={close} onClick={handleClose} style={{position:"absolute",top:"5%",right:"5%",height:"20px",width:"20px",cursor:"pointer"}}></img> */}
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
                  
                </Box>
              </Modal>
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className='provider-rating'>
                  {/* <img src={close} onClick={handleClose} style={{position:"absolute",top:"5%",right:"5%",height:"20px",width:"20px",cursor:"pointer"}}></img> */}
                  <CloseIcon onClick={handleClose1} style={{float:"right", color:"#646464"}}/>
                  <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                  { data.avtar =="a1"?<img src={a1} className={classes.cap} alt={row.avtar}></img>
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
                    <div className={classes.name} >
                       <p>{data.SPname}</p> 
                        {/* <p>sandip</p> */}
                        <Rating name="read-only" value={(value+value1+value2)/3} readOnly />
                    </div>
                  </div>
                  <h1>Rate your service provider</h1>

                  <div style={{padding:"10px 0"}}>
                      <p style={{display:"flex",alignItems:"center"}}>On time Arrival
                      <Box style={{marginLeft:"29px"}}>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </Box>   
                      </p>
                      <p style={{display:"flex",alignItems:"center"}}>Friendly
                      <Box style={{marginLeft:"77px"}}>
                        <Rating
                          name="simple-controlled"
                          value={value1}
                          onChange={(event, newValue) => {
                            setValue1(newValue);
                          }}
                        />
                      </Box>   
                      </p>
                      <p style={{display:"flex",alignItems:"center"}}>Qaulity of Service
                      <Box style={{marginLeft:"10px"}}>
                        <Rating
                          name="simple-controlled"
                          value={value2}
                          onChange={(event, newValue) => {
                            setValue2(newValue);
                          }}
                        />
                      </Box>   
                      </p>
                  </div>
                  <h2>FeedBack on service provider</h2>
                  <CustomTextField1 onChange={(e)=>{
                    setcomment(e.target.value)
                  }} value={comment}></CustomTextField1>
                  <CButton1 onClick={()=>{
                    let a={Rating:(value+value1+value2)/3,SPcommnet:comment}
                    fetch(`http://localhost:5000/Bookservice/${data.id}`,{
                    method:"PATCH",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    },
                    body:JSON.stringify(a)              
                    }).then(res=>res.json()).then(res =>{
                    toast.success("Feedback submitted Successfully",{position: "top-center"})
                    setcall(true)
                    }).catch(e=>console.log(e))
                    setcall(true)
                  }}>Submit</CButton1>
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
                    onChange={handlePageChange}
                  />  
                </Stack>
              <div className='page-btn2'><img src={FirstPage} /></div>
            </div>
        </div>
        <ToastContainer/>
      </>
  );
}

export default HTable;