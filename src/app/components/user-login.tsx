import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {sparrowdown,user} from '../assets/images';
import { styled } from '@mui/material/styles';
import { useHistory  } from "react-router-dom";

// const CMenuItem = styled(MenuItem)({
//     '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
//         border:"none"
//     }
// });
const CFormControl= styled(FormControl)({
  '& .MuiSelect-select':{
    padding:"0px",
  },
  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
    paddingRight:"0"
  },
  '& .MuiOutlinedInput-notchedOutline':{
    border:"none"
  },
  '& .css-6hp17o-MuiList-root-MuiMenu-list':{
    background: "#f64f4f",
  }

});
export default function UserLogin(props:any) {
  const [age, setAge] = React.useState('1');
  const history=useHistory ();
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  React.useEffect(()=>{
    if(props.show){
      setAge('1')
    }
  },[props.show])
  
  function Icon(){
    return(
        <img src={sparrowdown} style={{margin:"-5px 0 0 7px"}}></img>
    );
};

function Logout(){
  localStorage.clear();
  history.push("./");
}
  return (
    <div>
      <CFormControl>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true}}}
          IconComponent={Icon}
          style={{background:"#525252"}}
        >
            <MenuItem value={1} style={{display:"flex",flexDirection:"column"}}>
              <em style={{textAlign:"center"}}><img src={user} alt="" /></em>
            </MenuItem>
            {/* <div style={{display:"flex",flexDirection:"column"}}> */}
              <MenuItem value={2} >My Dashboard</MenuItem>
              <MenuItem value={3} onClick={props.setting}>My Settings</MenuItem>
              <MenuItem value={4} onClick={Logout}>Logout</MenuItem>
          {/* </div> */}
        </Select>
      </CFormControl>
    </div>
  );
}