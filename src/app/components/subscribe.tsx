import {uparrow,layer598} from "../assets/images"

function Subscribe() {
    return (
        <>
            
                <h2 style={{fontSize:" 18px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    color: "#353548",
                    paddingBottom: "16px",
                    textAlign: "center"}}>
                    GET OUR NEWSLETTER
                </h2>
                <a href="#" className="scroll-top"><img src={uparrow} alt="up-arrow"/></a>
                <img src={layer598} alt="logo" className="layer598"/>
                <div className="comment">
                    <input type="text" placeholder="YOUR EMAIL" className="textfield"></input>
                    <button>Submit</button>
                </div>
        </>
    );
}

export default Subscribe;