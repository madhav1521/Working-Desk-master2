import React from "react";
import Mnavbar from "../components/management-navbar";
import Dropdown from "../components/dropdown";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Srequesttable from "../components/Service-request";
import Umanagement1 from "../components/user-management";



function ServiceRequest() {
    const history=useHistory();
    const [Umanagement,setUmanagement]=React.useState(false);
    const [Servicereq,setServicereq]=React.useState(true);

    return (
        <div>
            {
                JSON.parse(localStorage.getItem('user')|| '{}') && JSON.parse(localStorage.getItem('user')|| '{}').userTypeId==2?
                <>
                <Helmet>
                    <title>Service Request</title>
                </Helmet>
                <Mnavbar></Mnavbar>
                <div className="row1">
                    <div className="col-1">
                        <ul>
                            <li><a href="#">Service Management</a></li>
                            <li><a href="#">Role Management</a></li>
                            <li>
                            <Link to="#"><Dropdown title="Coupon Code Management" name1="Coupon Codes" name2="Usage History"/></Link>
                            </li>
                            <li><a href="#">Escalation Management </a></li>
                            {
                                Servicereq?
                                <li onClick={()=>{
                                    setServicereq(true);
                                    setUmanagement(false);
                                     }}><a href="#"><strong>Service Requests</strong></a></li>
                                :
                                <li onClick={()=>{
                                    setServicereq(true);
                                    setUmanagement(false);
                                     }}><a href="#">Service Requests</a></li>
                            }
                            <li><a href="#">Service Providers</a></li>
                            {
                                Umanagement?
                                <li onClick={()=>{
                                    setServicereq(false);
                                    setUmanagement(true);
                                     }}><a href="#"><strong>User Management</strong></a>
                                </li>
                                :
                                <li onClick={()=>{
                                    setServicereq(false);
                                    setUmanagement(true);
                                     }}><a href="#">User Management</a>
                                </li>

                            }
                            
                            <li>
                            <Link to="#"><Dropdown title="Finance Module" name1="All Transactions" name2="Generate Payment" name3="Customer Invoices"/></Link>
                            </li>
                            <li><a href="#">Zip Code Management  </a></li>
                            <li><a href="#">Rating Management</a></li>
                            <li><a href="#">Inquiry Management</a></li>
                            <li><a href="#">Newsletter Management </a></li>
                            <li> 
                            <Link to="#"><Dropdown title="Content Management" name1="Blog" name2="FAQs"/></Link>
                            </li>
                        </ul>
                    </div>
                    {
                        Servicereq?<Srequesttable/>:Umanagement?<Umanagement1/>:null
                    }
                    
                </div>
                </>
                :
                <>
                {history.push("/")}
                {toast.warn("Unauthorized access",{position: "top-center"})}
                </>
            }
           <ToastContainer/>
        </div>
    );
}

export default ServiceRequest;