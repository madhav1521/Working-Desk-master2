import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Rating, Table, TableCell, TableRow } from '@mui/material';
import { calendar2, layer14, star1, star2 } from '../assets/images';
const useStyles = makeStyles((theme) => ({
    table: {
      width: "845px",
      border:"1px solid #E1E1E1",
      margin:"0 auto"
    }
   
  }));
function UpcomingRating() {
    const [value, setValue] = React.useState<number | null>(1);
    const classes = useStyles();
    const [USERS , setadd] = useState<any[]>([]);
    // const [calluse,setcall]=useState(false)

    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem('user')|| '{}')
        console.log(user.Email)
        fetch(`http://localhost:5000/Bookservice?status=${"Completed"}&SPemail=${user.Email}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        }).then(res=>res.json()).then(res =>{
            res.map((i:any)=>{
                if(i.Rating){
                    USERS.push(i)
                }
            })
        //   setadd(res)
        //   console.log(res)
        }).catch(e=>console.log(e))
      },[])
    return(
    <>
    {
        USERS.map((row)=>{return(
            <div className="main-upcoming" >
                <div className='upcoming-rating'>
                    <div className='sub-rating'>
                        <div className='sub-rating-1'>
                            <h1>{row.ServiceId}</h1>
                            <p>{row.FirstName} {row.LastName}</p>
                        </div>
                        <div className='sub-rating-2'>
                            <p><img src={calendar2} style={{marginRight:"5px"}} alt="logo"/>{row.Date}</p>
                            <h1><img src={layer14} style={{marginRight:"5px"}} alt="logo"/>{row.Time}</h1>
                        </div>
                    </div>
                    <div className='sub-rating1'>
                        <p>Ratings</p>
                        <Rating name="read-only" value={row.Rating} readOnly/>
                    </div>
                </div>
                <p className='upcoming-comment'>Customer Comment:</p>
                <h2>{row.SPcommnet}</h2>
            </div>)
        })
    }
        
        
    </>
    )
    
}
export default UpcomingRating;