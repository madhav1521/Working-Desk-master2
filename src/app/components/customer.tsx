import { makeStyles } from "@mui/styles";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import {uparrow,group31,group32,group33,shape2,layer598,msg} from "../assets/images"
const useStyles = makeStyles({
    
    content: {
        fontSize:"16px",
        color:"#565656",
        margin:"0 0 20px 0"
    },
    link:{
        fontSize:"18px",
        color:"#565656",
    },
    Hover:{
        maxWidth:"160px",
        '&:hover': {
            cursor:"pointer",
         },
    },
    bord:{
        borderLeft: "3px solid #1d7a8c",
        margin:"0 auto 50px",
        "&:hover":{
            transform:"scale(1.02)",
            cursor:"pointer",
        },
    },
    
  });
function Customer() {
    const Style = useStyles();
    return (
        <>
            <div className="customerbg">
                <h1 className="customer-title">What Our Customers Say</h1>
                <div className="Customer">
                    <Grid container >
                        <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                            <Card  className={Style.bord}  sx={{ maxWidth: 357 }}>
                                <img className="msg" src={msg} alt="logo" />
                                <img src={group31} alt="logo" style={{padding:"43px 0 0 38px"}}/>
                                <div style={{margin:"-60px 122px 25px ",maxWidth:"fit-content"}}>
                                    <h1 style={{fontWeight:"bold",width:"111px",marginBottom:"5px"}}>Lars Watson</h1>
                                    <h1 style={{color:"#8E8E8E",fontSize:"14px"}}>Manchester</h1>
                                </div>
                            
                                    <CardContent style={{padding:"25px 25px 24px 38px"}}>
                                    <Typography variant="body2" className={Style.content}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                            Sed fermentum metus pulvinar aliquet consequat. Praesent nec malesuada nibh. 
                                    </Typography>
                                    <Typography variant="body2" className={Style.content}> 
                                        Nullam et metus congue, auctor augue sit amet, consectetur tortor.
                                    </Typography>
                                <div className={Style.Hover}>
                                    <a className={Style.link} style={{margin: "0 11px 0 0"}}>Read the Post </a>
                                    <img src={shape2} alt="logo" height={"9px"} width={"29px"} className={Style.link}/>
                                </div>
                                    </CardContent>
                            </Card>
                            
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                            <Card  className={Style.bord}  sx={{ maxWidth: 357 }}>
                                <img className="msg" src={msg} alt="logo" />
                                <img src={group32} alt="logo" style={{padding:"43px 0 0 38px"}}/>
                                <div style={{margin:"-60px 122px 25px ",maxWidth:"fit-content"}}>
                                    <h1 style={{fontWeight:"bold",width:"102px",marginBottom:"5px"}}>John Smith</h1>
                                    <h1 style={{color:"#8E8E8E",fontSize:"14px"}}>Manchester</h1>
                                </div>
                            
                                    <CardContent style={{padding:"25px 25px 24px 38px"}}>
                                    <Typography variant="body2" className={Style.content}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                            Sed fermentum metus pulvinar aliquet consequat. Praesent nec malesuada nibh. 
                                    </Typography>
                                    <Typography variant="body2" className={Style.content}> 
                                        Nullam et metus congue, auctor augue sit amet, consectetur tortor.
                                    </Typography>
                                <div className={Style.Hover}>
                                    <a className={Style.link} style={{margin: "0 11px 0 0"}}>Read the Post </a>
                                    <img src={shape2} alt="logo" height={"9px"} width={"29px"} className={Style.link}/>
                                </div>
                                    </CardContent>
                            </Card>
                        
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                    
                            <Card  className={Style.bord}  sx={{ maxWidth: 357 }}>
                                <img className="msg" src={msg} alt="logo" />
                                <img src={group33} alt="logo" style={{padding:"43px 0 0 38px"}}/>
                                <div style={{margin:"-60px 122px 25px ",maxWidth:"fit-content"}}>
                                    <h1 style={{fontWeight:"bold",width:"121px ",marginBottom:"5px"}}>Lars Johnson</h1>
                                    <h1 style={{color:"#8E8E8E",fontSize:"14px"}}>Manchester</h1>
                                </div>
                            
                                    <CardContent style={{padding:"25px 25px 24px 38px"}}>
                                    <Typography variant="body2" className={Style.content}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                            Sed fermentum metus pulvinar aliquet consequat. Praesent nec malesuada nibh. 
                                    </Typography>
                                    <Typography variant="body2" className={Style.content}> 
                                        Nullam et metus congue, auctor augue sit amet, consectetur tortor.
                                    </Typography>
                                <div className={Style.Hover}>
                                    <a className={Style.link} style={{margin: "0 11px 0 0"}}>Read the Post </a>
                                    <img src={shape2} alt="logo" height={"9px"} width={"29px"} className={Style.link}/>
                                </div>
                                </CardContent>
                             </Card>
                        </Grid>
                    </Grid>
                </div>
                <h2>GET OUR NEWSLETTER</h2>
                <a href="#" className="scroll-top"><img src={uparrow} alt="up-arrow"/></a>
                <img src={layer598} alt="logo" className="layer598"/>
                <div className="comment">
                    <input type="text" placeholder="YOUR EMAIL" className="textfield"></input>
                    <button>Submit</button>
                </div>
            </div>
            
        </>
    );
}

export default Customer;