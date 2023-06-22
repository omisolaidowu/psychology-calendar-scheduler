import {CalendarContainer} from "react-datepicker";


const MyContainer = ({ className, children }) => {
    return (
      <div style={{ 
        padding: "0px", background: "#161717", 
        color: "#fff" , marginLeft: "400px",
        width:"fit-content", marginTop: "5%",
        fontFamily: "Lucida Console",

      }}>
        <CalendarContainer className={className}>
          <div style={{ background: "black", color:"black", 
          fontFamily: "Lucida Console" }}>
          </div>
          <div className="picker" style={{ position: "relative", background:"black", 
          fontFamily: "Lucida Console" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };


  export default MyContainer