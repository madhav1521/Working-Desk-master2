import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
const CustomTextField= styled(TextField)({
    '& .MuiOutlinedInput-root':{
        borderRadius: "20px",
        height:"40px",
        background: "#F4F5F8 0% 0% no-repeat padding-box",
        border: "1px solid #565656",
        width:"233px"
    },
    '& .MuiInputBase-input':{
        color:"#565656",
        fontSize:"14px",
        lineHeight:"32px",
        fontWeight:"600"

    }
  
  });
  const CustomButton = styled(Button)({
    minWidth: "88px",
    padding: "12px 20px",
    letterSpacing: "2px",
    color:"white",
    height: "40px",
    textTransform: "capitalize",
    backgroundColor: "#FF7B6D",
    borderRadius: "20px",
    marginLeft:"11px",

    '&:hover': {
        backgroundColor: "#646464"
    }
});
function Newslatter() {
    return (
        <>
        <div className="newsdiv">
            <h2>GET OUR NEWSLETTER</h2>
            <CustomTextField className="texfield" id="outlined-basic" placeholder="YOUR EMAIL" variant="outlined" />
            <CustomButton>Submit</CustomButton>
        </div>

        </>
    );
}
{/* <div className="comment">
<input type="text" placeholder="YOUR EMAIL" className="textfield"></input>
<button>Submit</button>
</div> */}
export default Newslatter;