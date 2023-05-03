import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export default function Dropdown(props:any) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{width: '100%', maxWidth: 272,}}
    >
      <ListItemButton onClick={handleClick} sx={{padding:"0"}}>
        <ListItemText primary={props.title} sx={{paddingRight:"20px"}} />
        {open ? <ExpandLess style={{marginRight:"12px"}}/> : <ExpandMore style={{marginRight:"12px"}} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{background:"#F9F9F9"}} >
          <ListItemButton sx={{padding:"0"}}>
            <ListItemText primary={props.name1} />
          </ListItemButton>
          <ListItemButton sx={{padding:"0"}}>
            <ListItemText primary={props.name2}/>
          </ListItemButton>
          <ListItemButton sx={{padding:"0"}}>
            <ListItemText primary={props.name3}/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
