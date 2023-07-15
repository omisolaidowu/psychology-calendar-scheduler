import {CalendarContainer} from "react-datepicker";


const MyContainer = ({ className, children }) => {
    return (
      <div className="Calendar-orig" id="Calendar-orig">
        <CalendarContainer className={className}>
          <div className="cal-div-first">
          </div>
          <div className="picker">{children}</div>
        </CalendarContainer>
      </div>
    );
  };


  export default MyContainer