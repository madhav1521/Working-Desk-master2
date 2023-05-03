import React from "react";
function Subscribe1() {
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
                <div className="comment comment1">
                    <input type="text" placeholder="YOUR EMAIL" className="textfield"></input>
                    <button>Submit</button>
                </div>
        </>
    );
}
export default Subscribe1;