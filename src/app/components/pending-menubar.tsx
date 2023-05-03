import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function PendingMenu(props:any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(e)=>{handleClick(e);
          props.setdata()
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}

        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
           height: "270px",
            width: '20ch',
          },
        }}
      >
       
        <MenuItem  onClick={()=>{handleClose();
          props.modalOpen()}}>Edit & Reschedule</MenuItem>
        <MenuItem  onClick={handleClose}>Refund</MenuItem>
        <MenuItem  onClick={()=>{
          handleClose()
          props.cancel()
          }}>Cancel</MenuItem>
        <MenuItem  onClick={handleClose}>Change SP</MenuItem>
        <MenuItem  onClick={handleClose}>Escalate</MenuItem>
        <MenuItem  onClick={handleClose}>History Log</MenuItem>
        <MenuItem  onClick={handleClose}>Download Invoice</MenuItem>
      </Menu>
    </div>
  );
}
