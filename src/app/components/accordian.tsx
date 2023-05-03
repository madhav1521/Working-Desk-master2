import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const Customcontainer= styled(Typography)({
  '& .MuiTypography-root':{
    fontSize:"16px",
    color:"#646464",
    
  },
  

});


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
 
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root':{
    background:"white"
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandCircleDownOutlinedIcon sx={{ fontSize: '0.9rem',height:"22px",width:"22px" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
 
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Customcontainer>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{padding:"0px",marginTop:"45px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography style={{fontWeight:"600"}}>What's included in a cleaning?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography style={{fontWeight:"600"}}>testQA?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography style={{fontWeight:"600"}}>Which Helperland professional will come to my place??</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel3d-header">
              <Typography style={{fontWeight:"600"}}>Can I skip or reschedule bookings?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel5d-content" id="panel3d-header">
              <Typography style={{fontWeight:"600"}}>test tatva?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel6d-content" id="panel3d-header">
              <Typography style={{fontWeight:"600"}}>test tatvasoft</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel7d-content" id="panel3d-header">
              <Typography style={{fontWeight:"600"}}>Do I need to be home for the booking?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              Integer fermentum convallis eros vel semper. Ut non imperdiet velit. 
              Praesent eu dui vel lacus porta eleifend eget quis dui. 
              Integer tempus massa in gravida tincidunt. 
              Fusce in libero tristique, euismod nisi vel, luctus urna. 
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
               Donec et placerat arcu. Suspendisse lacinia tristique massa. 
               Etiam risus justo, scelerisque id arcu eu, sodales tempor eros. Aliquam efficitur pretium urna, sit amet congue risus malesuada rutrum. 
               Donec id massa vel velit ullamcorper accumsan ut eget nisl. Fusce viverra commodo lacus, sit amet facilisis leo luctus dictum.
              </Typography>
            </AccordionDetails>
          </Accordion>
          

      </Customcontainer>
    </div>
  );

}
