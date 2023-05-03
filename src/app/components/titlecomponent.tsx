import {star} from '../assets/images';

interface Props{
    heading:string;
}
const Titlecomp = (props:Props) => {
    return (
        <>
            <h1 className="faqs-h1">{props.heading}</h1>
            <div className="startimg">
                <hr style={{width:"62px",border:"0",borderTop:"1px solid #CCCCCC",display:"block",height:"1px",padding:"0",marginRight:"9px"}}></hr>
                <img src={star} alt=""/>
                <hr style={{width:"62px",border:"0",borderTop:"1px solid #CCCCCC",display:"block",height:"1px",padding:"0",marginLeft:"9px"}}></hr>
             </div>
        </>
    )
};

export default Titlecomp;