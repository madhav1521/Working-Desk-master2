import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {sparrowdown} from '../assets/images';
import { styled } from '@mui/material/styles';
// const CMenuItem = styled(MenuItem)({
//     '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
//         border:"none"
//     }
// });
const CFormControl= styled(FormControl)({
  '& .MuiSelect-select':{
    padding:"0px"
  },
  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{
    paddingRight:"0"
  },
  '& .MuiOutlinedInput-notchedOutline':{
    border:"none"
  }

});
export default function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  
  function Icon(){
    return(
        <img src={sparrowdown} style={{margin:"-5px 0 0 7px"}}></img>
    );
};
  return (
    <div>
      <CFormControl>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label','MenuProps': {disableScrollLock: true}}}
          IconComponent={Icon}
        >
          <MenuItem value="">
            <em><img src={require('../assets/images/ic-flag.png')} alt="" /></em>
          </MenuItem>
          <MenuItem value={10}>German</MenuItem>
          <MenuItem value={20}>English</MenuItem>
          <MenuItem value={30}>Other</MenuItem>
        </Select>
      </CFormControl>
    </div>
  );
}