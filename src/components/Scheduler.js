import {useRef, useState, useEffect } from "react";

import DatePicker from "react-datepicker";

import MyContainer from '../calendar/calendarContainer';

import "react-datepicker/dist/react-datepicker.css";
import highlightmyDate from '../calendar/highlightedDaysLogic';

import { useCallback } from 'react';

import handlesubmit from '../handles/submitHandler';

import image from "../public/Art_of_a_boy_standing_on_a_platform.jpg"

import getData from "../fetch-data/fetch.data";
import  removeTimeDate from "../fetch-data/remove.fetch";



function Home(){

  const timeRef = useRef()

  const dateRef = useRef()

  const staffRef = useRef()
    

    const [startDate, setStartDate] = useState(new Date());
    
    const [availableDays, setavailableDays] = useState([]);

    const [timeBind, settimeBind] = useState([]);

    const [isPresent, setisPresent] = useState(false)

    const [noTimeMessage, setnoTimeMessage] = useState("")

    const [isStaffChange, setisStaffChange] = useState(false);

    const [isStaff, setisStaff] = useState(false)

    const [istimeChanged, setistimeChanged] = useState(false)

    const [isTime, setisTime] = useState(false)

    const [isDay, setisDay] = useState(false)


    const [timeString, settimeString] = useState("")

    const [status, setStatus] = useState("")

    // const [timeSelected, setSelectedTimes] = useState(false)

    const [removedMessage, setremovedMessage] = useState([])
    const [timeSelected, settimeSelected] = useState(false)



    const [isForm, setisForm] = useState(false)

    const [schedules, setSchedules] = useState([])

    const [isLoading, setIsLoading] = useState(false)


    let currentDay = new Date()
    let todaysDay = new Date(startDate)

    
    useEffect(()=>{

      const abortController = new AbortController()

      setIsLoading(true)
        getData(setSchedules)
      setIsLoading(false)
      
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
        
        
    }, [])


    const handlestaffchange = useCallback(() =>{

      setisStaffChange(false)
      

      const getNames = (schedules.map(x=>Object.keys(x)[4]))

      const currentNameIndex = getNames.indexOf(staffRef.current.value)


      // console.log(currentNameIndex)

      const days = schedules.map((x)=>  
      x[staffRef.current.value])[currentNameIndex]



      // const x = 
      // days.map((i, x)=> console.log(i))
      days.forEach((element, index) => {
         if (Object.values(element)[0].length>=1){

          setisTime(true)

         }
         else{
          setisTime(false)
         }
        
      });

      // console.log(x)


     // Below gets the dates highlighted for chosen staff:
      if (days.length !==undefined){
        setisDay(true)
      setavailableDays(days.map((x, i)=>Object.keys(x)))
      }
      else{
        setisDay(false)
        
      }
      
        
      if(staffRef.current.value==="true"){
        setisStaff(false)
    
      }else if(staffRef.current.value!==""){
        setisStaff(true)
        setnoTimeMessage("")
    
      }else{
        
        setisStaff(true)
      }
    })
    
    
      const handlechange = useCallback((date)=>{        

        setStartDate(date)

        const timeString = startDate.toString().split(' ')

        const scheduledTime = timeString[0]+" "+timeString[1]+" "+timeString[2]+" "+timeString[3]

        settimeString(scheduledTime)

        setisStaffChange(true)


        let daysList = []

        daysList.push(availableDays.toString().split(","))

        console.log("days:", daysList[0])


        // get the index of the chosen staff as per the name key:

        const getNames = (schedules.map(x=>Object.keys(x)[4]))

        const currentNameIndex = getNames.indexOf(staffRef.current.value)
        

        // use the current staff index to filter the available times for the chosen staff:
        const data = schedules.map((x, i)=> x[staffRef.current.value])[currentNameIndex]

        // filter the available times by their keys at index 0 to get the staff time array:
        const getDays = (data.map(x=>Object.keys(x)[0]))
        
        // get the index of each time array:
        const currentDateIndex = getDays.indexOf(date.toLocaleString('en-us').split("/")[1])



        if (daysList[0].includes(date.toLocaleString('en-us').split("/")[1])) {

          setisPresent(true)
          

          const availtimes = Object.values(
            data[currentDateIndex][date.toLocaleString('en-us').split("/")[1]]
            )

            

            settimeBind(availtimes)

          // bind the time to a state: this takes thethe form ==> e.g data[0]["15"]:

        
              console.log(timeBind.length !==0)
                
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

      const handlesave = useCallback (async(e)=>{ 
        e.preventDefault()
        
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

        else if( timeRef.current.value==="DEFAULT"){
          setnoTimeMessage("No meeting time selected. Please pick a time or check other therapists")
        }


        else if (staffRef.current.value===""){
          setnoTimeMessage("Please select a therapist")
        }
        
        
        else{

          let dateSelected = dateRef.current.value.toLocaleString('en-us').split("-")
          
          let firstName = schedules.map((x)=> {return x.first_name})

          let last_namedata = schedules.map((x)=> {return x.last_name})

          let email_data = schedules.map((x)=> {return x.email})

          const currFirstNameIndex = firstName.indexOf(staffRef.current.value)

          let last_name = last_namedata[currFirstNameIndex]

          let selectedEmail = email_data[currFirstNameIndex]
          setistimeChanged(true)

          let removeData = removeTimeDate(
            setremovedMessage,
            setStatus,
            staffRef.current.value,
            last_name,
            selectedEmail,
            dateSelected[2],
            timeRef.current.value,
        )


        settimeSelected(true)

        timeRef.current.value = "Select a meeting time"
        dateRef.current.value = ""
        staffRef.current.value = "Select a staff"

    
        console.log("remMessage:", removedMessage)
        console.log("first_name:", staffRef.current.value)
        console.log("last_name:", last_name)
        console.log("email:", selectedEmail)
        console.log("datetoRem:", dateSelected[2])
        console.log("timeTorem:", timeRef.current.value)

       
        setnoTimeMessage("Meeting scheduled successfully! You'll hear from us soon")
      

        }
  
      
      })
      
    
    return(
        
        <div>

          <h2>Schedule a meeting with us today!</h2>

          {isLoading?<div class="spin"></div>:



<select defaultValue={'DEFAULT'} className="staff-selector" ref={staffRef} onChange={handlestaffchange}>
      <option value="DEFAULT" disabled hidden>--Select a Therapist-- </option>
        {schedules.map((x, i)=><option key={i}>{Object.keys(x)[4]}</option>)}
</select>}

<div className="image-container"><img alt="idowu" className="background" src={image} /></div>

     {isStaff && isDay ?
     
     <DatePicker className="calendar"
     inline
     onChange={handlechange}

     selected={startDate}
     
     calendarContainer={MyContainer}
     
     
     dateFormat="yyyy-MMMM, d h:mm"

     minDate={new Date()}

     showDisabledMonthNavigation

     highlightDates={isTime && highlightmyDate(availableDays)}
     />:!isStaff? "": "Staff unavailable for the day"
     }
        
        {isStaff && <div className='time-selector'>


     <form onSubmit={ handlesave } defaultValue="Initial value">

        {
        isPresent && todaysDay.getMonth() === currentDay.getMonth()? 
        <select defaultValue={'DEFAULT'} className="time-seletor-select" ref={timeRef} required>
        <option value="DEFAULT" disabled>--Select a meeting time-- </option>
        {isStaffChange? 
        timeBind.map((x, i)=><option key={i}>{x}</option>):
         
        <option value="DEFAULT" disabled>--Select a meeting time-- </option>}

        </select>:
       
        isPresent && todaysDay.getMonth() !== currentDay.getMonth()?
        <p className="no-time">Slots not yet available for the selected month</p>:
        <p className="no-time">{timeBind}</p>
        }
      <p>{

      isPresent && todaysDay.getMonth() !== currentDay.getMonth()?"":

      isPresent && <input type="text" ref={dateRef} required contentEditable
       value={isStaffChange ? 
        startDate.toISOString().split("T")[0].replace("/", "-").replace("/", "-"):""}/>
      }</p>


      <div className="time-message">
        <strong> 
          {status===0? removedMessage:
          !istimeChanged && noTimeMessage}
        </strong>
      </div>

      <div className="time-message-success">
        <strong>
          {
          status===1 && istimeChanged && noTimeMessage}
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