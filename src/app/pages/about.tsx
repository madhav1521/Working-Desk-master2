import React from "react";
import Navbar from "../components/navbar";
import Titlecomp from "../components/titlecomponent";
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import { Helmet } from "react-helmet";


// const CustomButton = styled(Button)({
   
//     width: "163px",
//     height: "46px",
//     background: "#1D7A8C 0% 0% no-repeat padding-box",
//     borderRadius: "23px",
//     color:"#FFFFFF",
// });
// const CustomTextField1 = styled(TextField)({
//      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
//          height: "146px",
//          padding:"0"
//     },
//     '@media(max-width:627.98px)':{
//         '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
//           width:"300px" 
//         }
//     }
// });


function Aboutpage() {
    return (
        <>
            <Helmet>
                <title>About us</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="about-banner">
            {/* banner-image */}
            </div>
            <Titlecomp heading="A Few words about us"></Titlecomp>
            <div className="about-info">
                <p>We are providers of professional home cleaning services, 
                 offering hourly based house cleaning options,
                 which mean that you don't have to fret about getting your house clean anymore.
                we will handle everything for you, so that you can focus on spending your precious time with your family members. 
                </p>
                <p>
                we have a number of experienced cleaners to help you make cleaning out or shifting your home an easy affair.
                </p>
            </div>
            <Titlecomp heading="Our Story"></Titlecomp>
            <div className="story-info">
                <p>
                    A cleaner is a type of industrial for domestic worker who cleans home or commercial premises for 
                    payment. Cleaners may specialise in cleaning particular thing or places, such as window cleaners.
                    cleaners often work when the people who otherwise occupy the space are not around. 
                    They may clean offices at night or houses during the workday 
                </p>
            </div>
            <Subscribe1></Subscribe1>
            <SecondFooter></SecondFooter>
        </>
    );
}

export default Aboutpage;