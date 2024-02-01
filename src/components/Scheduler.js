import {useRef, useState, useEffect, useCallback, Suspense  } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import DatePicker from "react-datepicker";
import MyContainer from '../calendar/calendarContainer';
import "react-datepicker/dist/react-datepicker.css";
import highlightmyDate from '../calendar/highlightedDaysLogic';
import handlesubmit from '../handles/submitHandler';
import getData from "../fetch-data/fetch.data";
import user_info from "../fetch-data/user.info";
import zoom_meeting_submit from "../fetch-data/zoom.meeting";
import { getAllTherapists } from "./../fetch-data/my-api";
import avater from './../public/avater.jpg';
import face from './../public/faceshot.jpg';
import rating from './../public/rating.png';
import experience from './../public/experience.png';
import NetworkStatus from "./Network";
import Spinner from './../components/spinner';


function BookMeeting(){

  const history = useHistory();
  const timeRef = useRef()

  const dateRef = useRef()

  const staffRef = useRef()

  const textRef = useRef(null);
  const therapist_card_container = useRef(0);
  const schedule_therapist_container = useRef(0);

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

    const [selectedTherapist, setselectedTherapist] = useState(null)
    const [hasSelectedTherapist, sethasSelectedTherapist] = useState(false)
    const [therapy_type, setTherapy_type] = useState(null)
    const [therapy_type_error, settherapy_type_error] = useState(null)
    const [meetingData, setMeetingData] = useState([])
    const [dateErrorMessage, setDateErrorMessage] = useState(null)
    const [topicSelected, settopicSelected] = useState(false)
    const [hasFilledMeetingForm, setHasFilledMeetingForm] = useState(false)


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
      setisdateChanged(false)
      const storedToken = sessionStorage.getItem('access_token');
      setToken(storedToken);

      return () => {
        abortController.abort()
      }


    }, [isTimePicked, isdateChanged])

    useEffect( () => {
         if(isLoaded !== true)
         {
              let myToken = sessionStorage.getItem('access_token');
              user_info(myToken, (data) => {
                  setuserInfo(JSON.parse(data));
              });
              let allTherapists = getAllTherapists().then(users => {
                   setSchedules(users.data)
                   setisLoaded(true)
                   therapist_card_container.current.classList.remove('close-container-height')
                   let height = therapist_card_container.current.clientHeight
                   therapist_card_container.current.style.height = height + 'px'
              })


         }
    }, [isLoaded])

    useEffect( () => {
         if(hasSelectedTherapist)
         {
             therapist_card_container.current.style = '0px'
             therapist_card_container.current.classList.toggle("close-container-height")
         }
    }, [hasSelectedTherapist])

    useEffect( () => {
         if(hasFilledMeetingForm)
        {
            schedule_therapist_container.current.style.display = 'none'
            setisLoaded(true)
        }
   }, [hasFilledMeetingForm])

      const chooseTherapistFunction = (user_id) => {
             let therapist = schedules.find((user) => user.user_id === user_id )
             setselectedTherapist(therapist)
             setisdateChanged(true)
             setisStaffSelected(true)
             setisStaffChange(true)

             const days = therapist[therapist.first_name]
             settopicSelected(true)

            // Below gets the dates highlighted for chosen staff:
             if (days.length !==undefined){
               setisDay(true)
               setavailableDays(days.map((x, i)=>Object.keys(x)))
             }
             else{
               setisDay(false)
             }
             setisStaff(true)
             sethasSelectedTherapist(true)
      }

      const handlechange = useCallback((date)=>{

        setStartDate(date)

        // console.log(startDate)

        const timeString = startDate.toString().split(' ')

        const scheduledDate = timeString[0]+" "+timeString[1]+" "+timeString[2]+" "+timeString[3]

        settimeString(scheduledDate)

        setisStaffChange(true)

        try{

        let daysList = []

        setisTimeMapped(true)
        daysList.push(availableDays.toString().split(","))

        // use the current staff index to filter the available times for the chosen staff:
        const data = selectedTherapist[selectedTherapist.first_name]

        // filter the available times by their keys at index 0 to get the staff time array:
        const getDays = (data.map(x=>Object.keys(x)[0]))

        // get the index of each time array:
        const currentDateIndex = getDays.indexOf(date.toLocaleString('en-us').split("/")[1])

        if (daysList[0].includes(date.toLocaleString('en-us').split("/")[1])) {

          setisPresent(true)
          const availtimes = Object.values(
            data[currentDateIndex][date.toLocaleString('en-us').split("/")[1]]
            )
            // console.log(availtimes)
            settimeBind(availtimes)
               setisTime(true)
        }else{
          setisPresent(false)
          setDateErrorMessage("Time not available for the selected date")
          // settimeBind("Time not available for the selected date")
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

        if(therapy_type == null)
        {
             settherapy_type_error("KIndly choose the session type that best suits you")
             return false;
        }

        if(timeRef.current.value == 'DEFAULT')
        {
             setnoTimeMessage("You did not pick a time")
             setisTimePicked(false)
             return false
        }
        if(userInfo.length<1){
          setnoTimeMessage("Your session has expired, please login again")
          setSessionExpired(true)
      }else{
        setisTimePicked(true)
        setistimeChanged(false)

        if(status===0){
          setnoTimeMessage("Time has been selected. Please reschedule." +
          "If this persists, please wait until after 12 AM to reschedule." +
          "If you still can't book after 12 AM midnight, please contact customer support.")
        }else{
        let copySelectedTherapist = selectedTherapist
        let selectedDay = dateRef.current.value.split('-')[2]

        // console.log(copySelectedTherapist)
        let days = copySelectedTherapist[copySelectedTherapist.first_name].map((x, i)=>Object.keys(x))
        let dateIndex = null
        days.map( (day, index) => {
             if(day[0] === selectedDay)
             {
                  dateIndex = index
             }
        })
          let indeOfSelectedTime = copySelectedTherapist[copySelectedTherapist.first_name][dateIndex][selectedDay].indexOf(timeRef.current.value)
          copySelectedTherapist[copySelectedTherapist.first_name][dateIndex][selectedDay].splice(indeOfSelectedTime, 1)
          setselectedTherapist(copySelectedTherapist)
          settimeBind(copySelectedTherapist[copySelectedTherapist.first_name][dateIndex][selectedDay])

          let therapistName = selectedTherapist.first_name + " " +selectedTherapist.last_name

          setTimeMeeting(timeRef.current.value)

          if(timeBind.length<1){
          setisDateGone(true)
          }else{
          setisDateGone(false)
          }
          try {
               handlesubmit(
                setnoTimeMessage,
                setStatus,
                timeRef.current.value,
                dateRef.current.value,
                selectedTherapist,
                schedules,
                setisSubmitted
               )
          } catch (e) {
               console.log(e)
               return false
          }
          try {
               zoom_meeting_submit(
                dateRef.current.value,
                timeRef.current.value,
                therapy_type,
                therapistName,
                selectedTherapist.email,
                userInfo.first_name + " "+ userInfo.last_name,
                userInfo.email,
                setisSubmitted,
                setMeetingData,
                setisMeetingSet
               )
          } catch (e) {
               return false
          }
          let height = schedule_therapist_container.current.offsetHeight
          schedule_therapist_container.current.style.height = height + 'px'
          setisLoaded(false)
          setHasFilledMeetingForm(true)
        }
      }
      })

      const handleTopicChange = (therapy_type) =>{
        setTherapy_type(therapy_type)
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

      const concludeBooking = () => {
           alert("The admin will confirm your payment.")
           history.push("/user/dashboard");
      }
      const restartBookingProcess = () => {
           // resize the therapist height
           setisLoaded(false)
           sethasSelectedTherapist(false)
           setselectedTherapist(null)
      }
    return(

         <div className="book-a-meeting-page-wrapper">
               <header>
                    <div className="flex-start">
                         <NavLink to="/user/dashboard" className="anchorTag">&#x2190;</NavLink>
                         <p>Book an appointment</p>
                    </div>
               </header>
               <section>
                    <div className="therapist-card-container" ref={therapist_card_container}>
                         {    isLoaded ? schedules.map( (therapist) => {
                                   return <div className="therapist-card-wrapper" key={therapist.user_id}>
                                        <div className="flex-start">
                                             <img src={face} title="picture for therapist" alt="therapist image" className="profile-pic"/>
                                             <div>
                                                  <h3 className="short-p">{therapist['first_name'] + " " + therapist['last_name']}</h3>
                                                  <p className="short-p">Certification</p>
                                                  <div className="flex-between">
                                                       <p className="flex-start short-p"><img src={experience} title="Years of experience" alt="Experience years" className="scheduler-icon"/> <span className="certification-span">4 years</span></p>
                                                       <p className="flex-start short-p"><img src={rating} title="rating" alt="rating" className="scheduler-icon"/> <span className="certification-span">90%</span></p>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="short-bio-container">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                             <div className="flex-center"><button className="book-meeting-button" onClick={()=> {
                                                  chooseTherapistFunction(therapist.user_id)
                                             }}>Make an appointment</button></div>
                                        </div>
                                   </div>
                              }) :  <Spinner />
                         }
                    </div>

                    {    selectedTherapist != null ?
                         <div className="schedule-therapist-container" ref={schedule_therapist_container}>
                              <div className="cancel-button-container">
                                   <button className="cancel-therapist-icon" onClick={restartBookingProcess}>❌ Restart </button>
                              </div>
                              <div className="appointment-scheduling-css">
                                   <div className="therapist-card-wrapper">
                                        <div className="flex-start">
                                             <img src={face} title="picture for therapist" alt="therapist image" className="profile-pic"/>
                                             <div>
                                                  <h3 className="short-p">{selectedTherapist['first_name'] + " " + selectedTherapist['last_name']}</h3>
                                                  <p className="short-p">Certification</p>
                                                  <div className="flex-between">
                                                       <p className="flex-start short-p"><img src={experience} title="Years of experience" alt="Experience years" className="scheduler-icon"/> <span>4 years</span></p>
                                                       <p className="flex-start short-p"><img src={rating} title="rating" alt="rating" className="scheduler-icon"/> <span>90%</span></p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="therapy-type-container">
                                         <h4>Choose desired therapy type</h4>
                                         <p className="errorMessage">{ therapy_type_error }</p>
                                         <div className="therapy-type-form-wrapper">
                                             <label htmlFor="family">
                                                  <input type="radio" name="therapy_type" id="family" value="family" onClick={() => {
                                                       handleTopicChange("family")
                                                  }}/>
                                                  <span>Family Session #20,000</span>
                                             </label>
                                             <label htmlFor="single">
                                                  <input type="radio" name="therapy_type" id="single" value="single" onClick={() => {
                                                       handleTopicChange("single")
                                                  }}/>
                                                  <span>Single Session #15,000</span>
                                             </label>
                                             <label htmlFor="couple">
                                                  <input type="radio" name="therapy_type" id="couple" value="couple" onClick={() => {
                                                       handleTopicChange("couple")
                                                  }}/>
                                                  <span>Couples Session #30,000</span>
                                             </label>

                                         </div>
                                   </div>
                                   <div className="calender-section-wrapper">
                                        <h4>Choose preferred day from the highlighted days</h4>
                                        <p className="errorMessage">{ dateErrorMessage != null ? dateErrorMessage : ''}</p>
                                        <DatePicker className="calendar"
                                        inline
                                        onChange={handlechange}
                                        selected={startDate}
                                        calendarContainer={MyContainer}
                                        dateFormat="yyyy-MMMM, d h:mm"
                                        minDate={new Date()}
                                        showDisabledMonthNavigation
                                        highlightDates={!isDateGone && highlightmyDate(availableDays)}
                                        />
                                   </div>
                                   <div className="meeting-time-section-wrapper" >
                                        { isPresent && todaysDay.getMonth() === currentDay.getMonth()  ?
                                             <div>
                                                  <h4>Choose meeting time from the available options</h4>
                                                  <p className="errorMessage">{ noTimeMessage }</p>
                                                  <select defaultValue={'DEFAULT'} className="time-seletor-select" ref={timeRef} required>
                                                  <option value="DEFAULT" disabled>--Select a meeting time-- </option>
                                                  {isStaffChange && isTime && istimemapped?
                                                  timeBind.map((x, i)=><option key={i}>{x}</option>):

                                                  isTimePicked && timeBind.length===0? <option value="DEFAULT" disabled>--Select a meeting time-- </option>:
                                                  <option value="DEFAULT" disabled>--Select a meeting time-- </option>}

                                                  </select>
                                             </div>:

                                             isPresent && todaysDay.getMonth() !== currentDay.getMonth()?
                                             <p className="no-time">Slots not yet available for the selected month</p>:
                                             <p className="no-time">{timeBind}</p>
                                        }
                                        <p>
                                             { isPresent && todaysDay.getMonth() !== currentDay.getMonth() ? "" :

                                             isPresent && <input className="display-none" type="text" ref={dateRef} required contentEditable  value={isStaffChange ?                                    startDate.toISOString().split("T")[0].replace("/", "-").replace("/", "-"):""}/>
                                        }</p>
                                        {
                                              isPresent && todaysDay.getMonth() !== currentDay.getMonth()? "":

                                              isSubmitted && isMeetingSet ? <div><button className="schedule-button book-meeting-button" disabled type='submit'>
                                                Continue to make payment</button></div>:

                                              isPresent && <button className="book-meeting-button" onClick={ handlesave }>Continue to make payment</button>

                                        }
                                   </div>
                              </div>
                         </div> : ''
                    }

                    {
                         hasFilledMeetingForm ?
                         <div className="payment-details-section">
                              <p className="successMessage">Session booked successfully!</p>
                              <h2>Almost done !</h2>
                              <div className="upcoming-session-card">
                                   <div className="upcoming-session-card-header">
                                        <h3>{therapy_type}'s Therapy</h3>
                                   </div>
                                   <div className="upcoming-session-card-body">
                                        <p>Time: {timeMeeting + ' on ' + meetingData.meetingTime}</p>
                                        <p>Platform: Zoom</p>
                                        <p>Link: {  !textCopied ?
                                             <button className="zoom-link icon-zoom-in" ref={textRef} onClick={handleCopy}>Copy Zoom Link</button>:
                                             <button className="zoom-link" onClick={handleCopy}>Link copied to clipboard &#x2713;</button>
                                             }
                                        </p>
                                        <p>Attending physician: {selectedTherapist.first_name + ' ' + selectedTherapist.last_name}</p>
                                        <p>Session requirements: Privacy, mike earpiece and camera</p>
                                   </div>
                              </div>
                              <p> Kindly make payment into the account details provided below to validate your therapy appointment</p>
                              <p ><h5>Account name</h5><span>Opeyemi Emmanuel</span></p>
                              <p ><h5>Bank name</h5><span>Opay</span></p>
                              <p><h5>Account number</h5><span>7060681466</span></p>

                              <button className="book-meeting-button" onClick={concludeBooking}>Confirm payment and validate meeting</button>
                         </div>
                         : ''
                    }
               </section>
               <NetworkStatus />
         </div>
    )
}

export default BookMeeting;
