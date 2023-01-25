import {useRef, useState, useEffect } from "react";

import DatePicker from "react-datepicker";

import MyContainer from '../calendar/calendarContainer';

import "react-datepicker/dist/react-datepicker.css";
import highlightmyDate from '../calendar/highlightedDaysLogic';

import { useCallback } from 'react';

import handlesubmit from '../handles/submitHandler';

import image from "../public/Art_of_a_boy_standing_on_a_platform.jpg"



function Home(){

  const timeRef = useRef()

  const dateRef = useRef()

  const staffRef = useRef()
    

    const [startDate, setStartDate] = useState(new Date());
    
    const [availableDays, setavailableDays] = useState([]);

    const [timeBind, settimeBind] = useState([]);

    const [availableTimes, setavailableTimes] = useState([]);

    const [isPresent, setisPresent] = useState(false)

    const [noTimeMessage, setnoTimeMessage] = useState("")

    const [availableStaff, setAvailableStaff] = useState([])

    const [isStaffChange, setisStaffChange] = useState(false);

    const [isStaff, setisStaff] = useState(false)

    const [istimeChanged, setistimeChanged] = useState(false)

    const [timeString, settimeString] = useState("")



    const [isForm, setisForm] = useState(false)



    let currentDay = new Date()
    let todaysDay = new Date(startDate)

    
    let times = [{
      "Omisola":
    {
      1:["3:00 PM", "8:00 AM", "7:00 AM"], 
      10:["6:00 PM", "12:00 PM"],
      12:["12:00 PM", "3:00 PM"],
      13:["1:00 PM", "4:00 PM"],
      30:["5:00 PM", "7:00 PM"],

    },
    "Idowu":
    {
      30:["1:30 PM", "4:00 PM"],
      29:["3:00 PM", "8:00 AM", "7:00 AM"], 
      18:["6:00 PM", "12:00 PM"],
      19:["1:00 PM", "3:00 PM"],
      27:["1:00 PM", "4:00 PM"],
      31:["5:00 PM", "7:00 PM", "9:00 PM"],
    },
  }]
    
    useEffect(()=>{

      setavailableTimes(times)

        const staff = times.map(x=>Object.keys(x))

        setAvailableStaff(staff[0])

        
    }, [])

    console.log(todaysDay.getMonth())


    const handlestaffchange = useCallback(() =>{

      setisStaffChange(false)

      const therapistName = times.map((x)=> Object.keys(x[staffRef.current.value]))

      setavailableDays(therapistName[0])


    
      if(staffRef.current.value==="true"){
        setisStaff(false)
      }else{
        
        setisStaff(true)
      }
    

    })
    
    
      const handlechange = useCallback((date)=>{
        setStartDate(date)


        

        // console.log(startDate.toString().split(' '))

        const timeString = startDate.toString().split(' ')

  

        const scheduledTime = timeString[0]+" "+timeString[1]+" "+timeString[2]+" "+timeString[3]

        settimeString(scheduledTime)

        console.log(scheduledTime)
        setisStaffChange(true)

        console.log(staffRef.current.value)
     
        const timed = availableTimes.map((x, i)=>
        x[staffRef.current.value][date.toLocaleString('en-us').split("/")[1]]
        
        )


        const staffDays = availableTimes.map((x)=>
        Object.keys(x[staffRef.current.value])
        
        )


        if (staffDays[0].includes(date.toLocaleString('en-us').split("/")[1])) {

          setisPresent(true)
          settimeBind(timed[0])

          // console.log(startDate.toLocaleString('en-us'))

          // console.log(currentDay.getMonth())
                
        }else{

          setisPresent(false)
          settimeBind("Time not available for the selected date")
          
        }

        if(dateRef){

          setisForm(true)
        }else if(timeRef){
          setisForm(true)
        }

      })


      const handlesave =async(e)=>{ 
        e.preventDefault()

        // console.log(timeRef.current.value)
        
        if(timeRef.current.value==="true"){
          setistimeChanged(false)

          setnoTimeMessage("Please select a meeting time")


        }else if(timeRef.current.value===""){
          setistimeChanged(false)
          setnoTimeMessage("Please select a meeting time")
        }else if(timeRef.current.value==="undefined"){
          setistimeChanged(false)
          setnoTimeMessage("You cannot submit")
        }
        
        
        else{
          setistimeChanged(true)
          handlesubmit(timeRef, dateRef, staffRef)
          setnoTimeMessage("Meeting scheduled successfully! You'll hear from us soon")
        }

        
        
        
      
      }
    
    return(
        
        <div>

          <h2>Schedule a meeting with us today!</h2>



<select className="staff-selector" ref={staffRef} onChange={handlestaffchange}>
      <option disabled selected value hidden>--Select a Therapist-- </option>
        {availableStaff.map((x, i)=><option key={i}>{x}</option>)}
</select>
<div className="image-container"><img alt="idowu" className="background" src={image} /></div>

     {isStaff &&
     
     <DatePicker className="calendar"
     inline
     onChange={handlechange}

     selected={startDate}
     
     calendarContainer={MyContainer}
     
     
     dateFormat="MMMM d, yyyy h:mm"

     minDate={new Date()}

    //  maxDate = {addDays(new Date(), 20)}

    //  filterDate = {handlePastDays}

     showDisabledMonthNavigation

     highlightDates={highlightmyDate(availableDays)}
     />}
        
        {isStaff && <div className='time-selector'>

      {/* <p className="option-time">{isPresent&& "Select a time"}</p> */}

     <form onSubmit={handlesave}>

        {
        isPresent && todaysDay.getMonth() === currentDay.getMonth()? 
        <select className="time-seletor-select" ref={timeRef} required>
        <option disabled selected value>--Select a meeting time-- </option>
        {isStaffChange ? timeBind.map((x, i)=><option key={i}>{x}</option>): 
        <option disabled selected value>--Select a meeting time-- </option>}
        </select>:
        isPresent && todaysDay.getMonth() !== currentDay.getMonth()?
        <p className="no-time">Slots not yet available for the selected month</p>:
        <p className="no-time">{timeBind}</p>
        }
      <p>{

      isPresent && todaysDay.getMonth() !== currentDay.getMonth()?"":

      isPresent && <input type="text" ref={dateRef} required contentEditable
       value={isStaffChange ? startDate.toLocaleString('en-us').split(",")[0]:""}/>
      }</p>


      <div className="time-message">
        <strong>
          {!istimeChanged && noTimeMessage}
        </strong>
      </div>

      <div className="time-message-success">
        <strong>
          {istimeChanged && noTimeMessage}
        </strong>
      </div>

      {
      isPresent && todaysDay.getMonth() !== currentDay.getMonth()? "":
      isPresent && <button type='submit'>Save</button>
      
      }
      
      </form>
      
    </div>}

    
  </div>
    )

}

export default Home;