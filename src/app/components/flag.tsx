import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { icflag, sparrowdown } from '../assets/images/index';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

function NewIcon(){
  return(
      <><><img src={icflag} /></>
      <img src={sparrowdown} style={{ marginRight: "20px" }}></img></>
  );
};

const CustomMenuItem=styled(MenuItem)({
  '& .MuiButtonBase-root':{
    marginLeft:"10px"
  },
});

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button style={{border:"none",borderRadius:"0",backgroundColor:"transparent"}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NewIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <CustomMenuItem onClick={handleClose}>English</CustomMenuItem>
        <CustomMenuItem onClick={handleClose}>German</CustomMenuItem>
      </Menu>
    </div>
  );
}
