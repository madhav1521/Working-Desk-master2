import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import {keyrightarrow} from '../assets/images';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const Customcontainer= styled(Typography)({
  '& .MuiTypography-root':{
    fontSize:"14px",
    color:"#4F4F4F",
    lineHeight:"24px"

  },
});

function Arrowicon(){
    return(
        <img src={keyrightarrow} style={{transform:"rotate(-180deg)"}}></img>
    );
  };
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
 
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root':{
    background:"white",
    padding:"0",
    borderBottom:"1px solid #E1E1E1"
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<Arrowicon/>}
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

export default function BookserviceAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Customcontainer>
          
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} style={{padding:"0px"}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography >Which Helperland professional will come to my place?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed id diam tincidunt, fringilla ante vitae, dapibus velit. 
              Vivamus id tortor rhoncus, efficitur quam at, suscipit tortor. 
              </Typography>
            </AccordionDetails>
          </Accordion>

      </Customcontainer>
    </div>
  );

}
