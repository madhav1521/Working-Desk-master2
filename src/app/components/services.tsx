import {nurse3,nurse1,nurse2} from "../assets/images"
import { Grid } from "@mui/material";

function Services() {
    return (
        <>
            <h1 className="whycen">Why Working Desk</h1>
            <div className="service">
                <div className="flex-comp">
                <Grid container>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                    <div className="circleimg">
                        <img src={nurse1} alt="logo" />
                        <h1>Experience & Vetted Professionals</h1>
                        <p>dominate the industry in scale and scope with an adaptable,
                                extensive network that consistently delivers exceptional results.
                        </p>
                    </div>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                    <div className="circleimg">
                        <img src={nurse2} alt="logo" />
                        <h1>Secure Online Payment</h1>
                        <p>
                            Payment is processed securely online. Customers pay safely online and manage the booking.
                        </p>
                    </div>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                    <div className="circleimg">
                        <img src={nurse3} alt="logo" />
                        <h1>Dedicated Customer Service</h1>
                        <p>to our customers and are guided in all we do by their needs. 
                            The team is always happy to support you and offer all the information.
                        </p>
                    </div>
                    </Grid>
                </Grid>
                </div>

                {/* ================================================================== */}
            </div>
        </>
    );
}

export default Services;