import {CalendarContainer} from "react-datepicker";


const MyContainer = ({ className, children }) => {
    return (
      <div className="Calendar-orig" id="Calendar-orig">
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