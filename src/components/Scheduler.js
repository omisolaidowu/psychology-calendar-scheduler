import {useRef, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import DatePicker from "react-datepicker";
import MyContainer from '../calendar/calendarContainer';
import "react-datepicker/dist/react-datepicker.css";
import highlightmyDate from '../calendar/highlightedDaysLogic';
import { useCallback } from 'react';
import handlesubmit from '../handles/submitHandler';
// import image from "../public/Art_of_a_boy_standing_on_a_platform.jpg"
import getData from "../fetch-data/fetch.data";
import user_info from "../fetch-data/user.info";
import zoom_meeting_submit from "../fetch-data/zoom.meeting";

import NetworkStatus from "./Network";


function BookMeeting(){

  const timeRef = useRef()

  const dateRef = useRef()

  const staffRef = useRef()

  const topicRef = useRef()

  const textRef = useRef(null);
    

    const [startDate, setStartDate] = useState(new Date());
    
    const [availableDays, setavailableDays] = useState([]);

    let [timeBind, settimeBind] = useState([]);

    const [isPresent, setisPresent] = useState(false)

    const [noTimeMessage, setnoTimeMessage] = useState("")

    const [isStaffChange, setisStaffChange] = useState(false);

    const [isStaff, setisStaff] = useState(false)

    const [istimeChanged, setistimeChanged] = useState(false)

    const [isTime, setisTime] = useState(false)

    const [isDay, setisDay] = useState(false)


    const [timeString, settimeString] = useState("")

    const [status, setStatus] = useState("")

    const [isDateGone, setisDateGone] = useState(false)

    // const [timeSelected, setSelectedTimes] = useState(false)

    const [isdateChanged, setisdateChanged] = useState(true)
    const [isTimePicked, setisTimePicked] = useState(false)
    const [isForm, setisForm] = useState(false)

    const [schedules, setSchedules] = useState([])

    const [isLoaded, setisLoaded] = useState(false)

    const [isSubmitted, setisSubmitted] = useState(false)

    const [isStaffSelected, setisStaffSelected] = useState(false)

    const [fetchError, setfetchError] = useState("")

    const [token, setToken] = useState('');

    const [isToken, setisToken] = useState(true)
  
    const [isSelectClicked, setIsSelectClicked] = useState(false);

    const [userInfo, setuserInfo] = useState([])

    const [selectedTherapist, setselectedTherapist] = useState([])

    const [meetingData, setMeetingData] = useState([])

    const [topicSelected, settopicSelected] = useState(false)

    const [timeMeeting, setTimeMeeting] = useState('')

    const [isMeetingSet, setisMeetingSet] = useState(false)

    const [istimemapped, setisTimeMapped] = useState(true)

    const [textCopied, setTextCopied] = useState(false)

    const [sessionExpired, setSessionExpired] = useState(false)


    const [timeValue, setTimeValue] = useState("")
    

    let currentDay = new Date()
    let todaysDay = new Date(startDate)

    
    useEffect(()=>{

      const abortController = new AbortController()

      setTextCopied(false)
      
      getData(setSchedules, setfetchError, setisLoaded)
      setisLoaded(true)
    
        setisdateChanged(false)
        const storedToken = sessionStorage.getItem('access_token');
        
        setToken(storedToken);

        user_info(storedToken, (data) => {
          setuserInfo(JSON.parse(data));
        });
      
      return () => {
        abortController.abort()
      }
        
        
    }, [isTimePicked, isdateChanged])

    

    const handlestaffchange = useCallback(() =>{
      
      setIsSelectClicked(true)
      setisLoaded(true)

      if(!token){
        setisToken(false)
      }

      setisdateChanged(true)

      setisStaffSelected(true)

      setisStaffChange(false)

      const getNames = (schedules.map(x=>Object.keys(x)[4]))

      const staffFirst = staffRef.current.value.split(" ")

      const currentNameIndex = getNames.indexOf(staffFirst[0])

      const staff_data = schedules.map((x)=>{return (x)})

      setselectedTherapist(staff_data[currentNameIndex])

      if (timeBind.length <1){
        setisTimePicked(true)
      }
      else if(typeof(timeBind)==="string"){
        setisTimePicked(true)
      }
      else{
        setisTimePicked(false)
      }

      console.log(timeBind)

      const days = schedules.map((x)=>  
      x[staffFirst[0]])[currentNameIndex]

      days.forEach((element, index) => {
         if (Object.values(element)[0].length>=1){

          setisTime(true)

         }
         else if(Object.values(element)[0].length<1){
          setisTime(false)
         }else{
          setisTime(false)
         }
        
      });

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

        console.log(startDate)

        const timeString = startDate.toString().split(' ')

        const scheduledDate = timeString[0]+" "+timeString[1]+" "+timeString[2]+" "+timeString[3]

        settimeString(scheduledDate)

        setisStaffChange(true)

        try{

        let daysList = []

        setisTimeMapped(true)

        daysList.push(availableDays.toString().split(","))

        // get the index of the chosen staff as per the name key:

        const staffFirst = staffRef.current.value.split(" ")

        const getNames = (schedules.map(x=>Object.keys(x)[4]))

        const currentNameIndex = getNames.indexOf(staffFirst[0])
        
        // use the current staff index to filter the available times for the chosen staff:
        const data = schedules.map((x, i)=> x[staffFirst[0]])[currentNameIndex]

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

      }catch(err){

        setisTimeMapped(false)
        settimeBind("Time not available or you didn't select a therapist")
        console.log(err)
      }; 

      })




      const handlesave = useCallback (async(e)=>{ 
        e.preventDefault()
        if(userInfo.length<1){
          setnoTimeMessage("Your session has expired, please login again")
          setSessionExpired(true)

      }else{
        setisTimePicked(true)

        
        
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

        else if(status===0){
          setnoTimeMessage("Time has been selected. Please reschedule." +
          "If this persists, please wait until after 12 AM to reschedule." +
          "If you still can't book after 12 AM midnight, please contact customer support.")
        }

        else{
          const staffFirst = staffRef.current.value.split(" ")
          handlesubmit(
            setnoTimeMessage,
            setStatus,
            timeRef.current.value,
            dateRef.current.value,
            staffFirst[0],
            schedules,
            setisSubmitted
          )
          
          zoom_meeting_submit(
            dateRef.current.value,
            timeRef.current.value,
            topicRef.current.value,
            staffRef.current.value,
            selectedTherapist.email,
            userInfo.first_name + " "+ userInfo.last_name,
            userInfo.email,
            setisSubmitted,
            setMeetingData,
            setisMeetingSet
          )

          setTimeMeeting(timeRef.current.value)

        if(timeBind.length<1){
          setisDateGone(true)
        }else{
          setisDateGone(false)
        }

        timeRef.current.value = "Select a meeting time"
       
        staffRef.current.value = "Select a staff"
      

        }
      }
      
      
      })

      const handleTopicChange = () =>{
        settopicSelected(true)
      }


      const handleCopy = () => {
        setTextCopied(true)
        if (textRef.current) {
          navigator.clipboard.writeText(textRef.current.value)
            .then(() => {
              console.log('Text copied to clipboard');
              
            })
            .catch((error) => {
              console.error('Failed to copy text: ', error);
              setTextCopied(false)
            });
        }
      };

      

  
    
    return(

        
  <div className="body-container">
      <a href="http://127.0.0.1:5500/index.html" className="home-nav"><h1>MegaPsycheTherapy</h1></a>

    <div>{!token? 
          <div className="landing-container">
            <div className="buttons-container">
              <NavLink to="/" className="button login-button">
                Login
              </NavLink>
              <NavLink to="/#" className="button register-button">
                Register
              </NavLink>
            </div>
          </div>:
      
        <div className="dropdown">
            <button className="dropbtn fa fa-caret-down">{userInfo.first_name}</button>
                <div className="dropdown-content">
                    <NavLink to="/book-a-meeting">Book a Meeting</NavLink>
                    <NavLink to="/">Service Quotes</NavLink>
                    <NavLink to="/logout" className="button login-button">Logout</NavLink>
                </div>
                
        </div>
        }
        </div>

        <NetworkStatus />

          <h2 className="CTA-first">Schedule a meeting with us today!</h2>
          <select defaultValue={'DEFAULT'} className="topic-selector" ref={topicRef} onChange={handleTopicChange}>
              <option value="DEFAULT" disabled hidden>--Select Session Type--</option>
              <option key={"family"}>Family Session</option>
              <option key={"single"}>Single Session</option>
              <option key={"couple"}>Couples Session</option>
          </select>

  {!isLoaded ? <div className="schedule-spin"></div>:

  topicSelected &&
        <select defaultValue={'DEFAULT'} className="staff-selector" ref={staffRef} onChange={handlestaffchange}>
              <option value="DEFAULT" disabled hidden>--Select a Therapist-- </option>
                {
                !isLoaded ? <div className="spin"></div>
                : 
                schedules.map((x, i)=>
                <option key={i}>{Object.keys(x)[4]} {x.last_name}</option>)
                }
        </select>
    }
    {!isToken && <>Please <NavLink to="/login-page"><strong>Login</strong></NavLink> to book a meeting...</>}

{/* <div className="image-container"><img alt="idowu" className="background" src={image} /></div> */}

     {isStaff && isDay && isToken && topicSelected?
     
     <DatePicker className="calendar"
     inline
     onChange={handlechange}

     selected={startDate}
     
     calendarContainer={MyContainer}
     
     
     dateFormat="yyyy-MMMM, d h:mm"

     minDate={new Date()}

     showDisabledMonthNavigation

     highlightDates={!isDateGone && highlightmyDate(availableDays)}
     />:""
     }
        
        {isStaff && <div className='time-selector'>


     <form onSubmit={ handlesave } defaultValue="Initial value">

        {
        isPresent && todaysDay.getMonth() === currentDay.getMonth()? 
        <select defaultValue={'DEFAULT'} className="time-seletor-select" ref={timeRef} required>
        <option value="DEFAULT" disabled>--Select a meeting time-- </option>
        {isStaffChange && isTime && istimemapped? 
        timeBind.map((x, i)=><option key={i}>{x}</option>):
         
        isTimePicked && timeBind.length===0? <option value="DEFAULT" disabled>--Select a meeting time-- </option>:
        <option value="DEFAULT" disabled>--Select a meeting time-- </option>}

        </select>:
       
        isPresent && todaysDay.getMonth() !== currentDay.getMonth()?
        <p className="no-time">Slots not yet available for the selected month</p>:
        <p className="no-time">{timeBind}</p>
        }
      <p>{

      isPresent && todaysDay.getMonth() !== currentDay.getMonth()?"":

      isPresent && <input className="date-writer" type="text" ref={dateRef} required contentEditable
       value={isStaffChange ? 
       startDate.toISOString().split("T")[0].replace("/", "-").replace("/", "-"):""}/>
      }</p>

{
      isPresent && todaysDay.getMonth() !== currentDay.getMonth()? "":

      isSubmitted && isMeetingSet ? <div><button className="schedule-button disabled" disabled type='submit'>
        Schedule</button></div>:
      
      isPresent && <button className="schedule-button" type='submit'>Schedule</button>
      
      }
      
      </form>
      <div>
        <strong> 
        {isSelectClicked && status === 1 && istimeChanged ? (
            <div className="time-message-success">
              <li className="fa fa-thumbs-up"></li>
              
            </div>
          ) : 
          (
            
              <div className="time-message"></div>
            
      )}
        </strong>
      </div>

      <div className="expired-message">
        {sessionExpired && 
        <p>
          <strong>Session expired or you've logged in somewhere else</strong>
        </p>
        }
      </div>

      <div className="time-message-success">
        
      </div>

      <div className="time-message">{!topicSelected &&
      <>Please select the type of session you want book</>}
      </div>
      
    </div>}

    {
    isMeetingSet?
    <div className="schedule-spin"></div>:
    meetingData.status !==1 ? "":

    
    <div>
      {isPresent && !todaysDay.getMonth() !== currentDay.getMonth() ? 
      <p className="time-message-success">
      Session booked successfully! Please find the detail below.
      <br></br>
      <br></br>
      A copy has also been sent to your email address
      </p>: ""}
    <table className="schedule-table">
    <thead>
      <tr>
        <th>Params</th>
        <th>Meeting Details</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>Therapist to meet</td>
        <td>{meetingData.therapist_name}</td>
      </tr>
      <tr>
        <td>Session Platform</td>
        <td>{meetingData.platform}</td>
      </tr>
      <tr>
        <td>Scheduled date</td>
        <td>{meetingData.meetingTime}</td>
      </tr>
      <tr>
        <td>Start time</td>
        <td>{timeMeeting}</td>
      </tr>
      <tr>
        <td>Session type</td>
        <td>{meetingData.purpose}</td>
      </tr>
    </tbody>
  </table>

  <input
        type="text"
        readOnly
        value={meetingData.meeting_url}
        ref={textRef}
        style={{ position: 'absolute', left: '-9999px' }}
      />
      {
      
      !textCopied ?
      <button className="zoom-link icon-zoom-in" onClick={handleCopy}>Copy Zoom Link</button>:
      <button className="zoom-link" onClick={handleCopy}>Link copied to clipboard &#x2713;</button>

    }

    </div>
    }
    
  </div>
    )

}

export default BookMeeting;