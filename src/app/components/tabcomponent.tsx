import { Container, Tab, Tabs, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { borderBottom, Box } from "@mui/system";
import React from "react";
import CustomizedAccordions from './accordian';
function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    <Typography>{children}</Typography>
                </>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        height: "4px",
        borderRadius: "6px 6px 0 0",
        background: "#1D7A8C"
    },
    '& .MuiTab-root': {
        width:"465px",
        color:"#646464",
        fontSize:"24px",
        background:"#F6F6F6",
        lineHeight:"42px",
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderBottom:"4px solid #1d7a8c"
    },
    '& .MuiTab-root.Mui-selected': {
        background: "#1D7A8C",
        backgroundColor:"#1D7A8C",
        color:"white",
    },
    '& .MuiButtonBase-root-MuiTab-root':{
        padding:"0"
    },
    '& .MuiTabs-flexContainer':{
        height:"66px"
    },
    '& .MuiButtonBase-root':{
        maxWidth:"465px"
    },
    '@media(max-width:992px)':{
        '& .MuiTab-root':{
            width:"400px",
            fontSize:"17px"
        }
    },
    '@media(max-width:767.98px)':{
        '& .MuiTab-root':{
            width:"300px",
            fontSize:"15px"
        }
    },
    '@media(max-width:426px)':{
        '& .MuiTab-root':{
            width:"212px"
        }
    },
    '@media(max-width:376px)':{
            '& .MuiTab-root':{
                width:"187px",
                fontSize:"12px"
            }
    },
    '@media(max-width:321px)':{
        '& .MuiTab-root':{
            width:"160px", 
           

        }
}
});


function   TabComponent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
        <Container style={{maxWidth:"931px",padding:"0px"}}>
            <Box className="custom-tabs">
                <Box>
                    <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="FOR CUSTOMER" {...a11yProps(0)}/>
                        <Tab label="FOR SERVICE PROVIDER" {...a11yProps(1)} />
                    </AntTabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CustomizedAccordions></CustomizedAccordions>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CustomizedAccordions></CustomizedAccordions>
                    <CustomizedAccordions></CustomizedAccordions>

                </TabPanel>
            </Box>
            </Container>
        </>
    );
}

export default TabComponent;