import { Button, Card, CardActions, CardContent, CardMedia,Grid,Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import {bgimg2,shape2,bgimg1,group36,group30,group29,group28} from "../assets/images"

const useStyles = makeStyles({
    heading: {
      fontSize:"20px",
      fontWeight:600,
      color:"#3D4046",
      marginBottom:"0"
    },
    date:{
        fontSize:"13px",
      color:"#A3A3A3",
      marginBottom:"12px",
      lineHeight:"16px"
    },
    content: {
        fontSize:"16px",
        color:"#565656"
    },
    link:{
        maxWidth:"165px",
        fontSize:"18px",
        '&:hover': {
            cursor:"pointer",
         },
        
    },
    space:{
        paddingBottom:"26px",
        margin:"0 auto 42px"
    }
    
  });

const Blog=() => {
    const Style = useStyles();
    return (
        <>
        <div className="blogsection">
        
        <img src={bgimg1} className= "bgimg" alt="logo" />
        
                <div className="flex-comp1"> 
                <Grid container>
                    <Grid item lg={6} md={12} sm={12} xs={12} order={{lg:1,md:2 ,xs: 2, sm: 2 }}>
                        <div className="content1">
                            <h1>We do not know what makes you happy,but ...
                            </h1>
                            <p>
                            If it's not dusting off, our friendly helpers will free you from this burden - 
                            do not worry anymore about spending valuable time doing housework,but savour life. 
                            </p>
                            <p>
                            you're well worth your time with beautiful experiences.Free yourself and enjoy the gained time:relax,
                            play with your children, meet friend or dare to jump on the bungee 
                            </p>
                            <p>
                            Other leisure ideas and exclusive events can be found in our blog - guaranteed free from dust and cleaning tips!
                            </p>
                        </div>
                        </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12} order={{lg:1 ,md:1,xs: 1, sm: 1 }}>
                        <div className="group36">
                    <img src={group36} alt="logo" />

                        </div>
                    </Grid>
                    </Grid>
                </div>
            
            
            
            <h1 className="blog-heading">Our Blog</h1>
            <div className="blog">
            <Grid container>
            <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                <Card sx={{ maxWidth: 345 }} className={Style.space}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={group28}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={Style.heading}>
                        Lorem ipsum dolor sit amet
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" className={Style.date}>
                        January 28,2019
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className={Style.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus pulvinar aliquet.
                        </Typography>
                    </CardContent>
                    <CardActions className={Style.link}>
                        <a style={{margin: "0 11px 0 10px",color:"#565656"}}>Read the Post</a>
                        <img src={shape2} alt="logo" height={"9px"} width={"29px"}/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                <Card sx={{ maxWidth: 345 }} className={Style.space}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={group29}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={Style.heading}>
                        Lorem ipsum dolor sit amet
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" className={Style.date}>
                        January 28,2019
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className={Style.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus pulvinar aliquet.
                        </Typography>
                    </CardContent>
                    <CardActions className={Style.link}>
                        <a style={{margin: "0 11px 0 10px",color:"#565656"}}>Read the Post</a>
                        <img src={shape2} alt="logo" height={"9px"} width={"29px"}/>
                    </CardActions>
                </Card>
                </Grid>
                <Grid item lg={4} md={12} sm={12} style={{margin:"0 auto"}}>
                <Card sx={{ maxWidth: 345 }} className={Style.space}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={group30}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className={Style.heading}>
                        Lorem ipsum dolor sit amet
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" className={Style.date}>
                        January 28,2019
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className={Style.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus pulvinar aliquet.
                        </Typography>
                    </CardContent>
                    <CardActions className={Style.link}>
                        <a style={{margin: "0 11px 0 10px",color:"#565656"}} >Read the Post </a>
                        <img src={shape2} alt="logo" height={"9px"} width={"29px"}/>
                    </CardActions>
                </Card>  
                </Grid>
                </Grid>  
            </div>
            <img src={bgimg2} className= "bgimg2" alt="logo" />
        </div>
        </>
    );
}

export default Blog;