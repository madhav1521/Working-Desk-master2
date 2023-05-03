import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import Newslatter from "../components/getnewslatter";
import SecondFooter from "../components/secondfooter";
import Subscribe1 from "../components/sunscribe1";
import TabComponent from "../components/tabcomponent";
import Titlecomp from "../components/titlecomponent";
function Faqpage() {
    return (
        <>
            <Helmet>
                <title>Faq</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="faq-banner">
            {/* banner-image */}
            </div>
            <div className="faqs-detail">
                <Titlecomp heading="FAQs"></Titlecomp>
                <div className="service-title">
                    <p>Whether you are Customer or Service provider,</p>
                    <p>We have tried our best to solve all your queries and questions.</p>
                </div>
                <TabComponent></TabComponent>
                {/* <div style={{margin:"30px 0 54px"}}>
                    <Newslatter></Newslatter>
                </div> */}
                <div style={{marginTop:"30px"}}>
                <Subscribe1></Subscribe1>
                </div>
                <SecondFooter></SecondFooter>
            </div>
        </>
    );
}

export default Faqpage;