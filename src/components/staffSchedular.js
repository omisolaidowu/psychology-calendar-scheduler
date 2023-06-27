import schedular from "../calendar/staffSchedular";
import {useRef, useState, useEffect, useCallback} from "react";
import getData from "../fetch-data/fetch.data";

import {NavLink} from 'react-router-dom'

import postSchedule from "../fetch-data/post.schedule";
import updateSchedule from "../fetch-data/update.schedule";
import user_info from "../fetch-data/user.info";

function StaffSchedule(){
    const [monthCal, setmonthCal] = useState([])
    const dateRef = useRef()
    const timesRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const [isavailWeekend, setisavailWeekend] = useState(true)
    const [isdeleted, setisdeleted] = useState(false)
    const [timeHandle, setTimeHandle] = useState([])
    const [existsMessage, setexistsMessage] = useState("")
    const [isTimeInArray, setisTimeInArray] = useState(false)
    const [schedules, setSchedules] = useState([])
    const [fetchError, setfetchError] = useState("")
    const [isFetched, setisFetched] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)

    const [isPosted, setisPosted] = useState(false)
    const [Response, setResponse] = useState([])
    const [isEmpty, setisEmpty] = useState(false)
    const [timeMessage, settimeMessage] = useState("")
    const [isTime, setisTime] = useState(false)
    const [isSaved, setisSaved] = useState(true)

    const [userInfo, setuserInfo] = useState([])
    const [token, setToken] = useState('');
    
    useEffect(()=>{

        const abortController = new AbortController()
        
        setmonthCal(schedular())
        getData(
            setSchedules, 
            setfetchError, 
            setisFetched, 
            setisLoaded
            )

            setisSaved(false)

        const access_token = sessionStorage.getItem("access_token")
        setToken(access_token)

        user_info(access_token, (data) => {
            setuserInfo(JSON.parse(data));
          });

        

        // userInfo.map
        
        // console.log("Times:", timeData)
        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
          }
          
      }, [isSaved])
      

      const saveAction=useCallback((cellValue)=>{
        //Todo: Post data from table to database


        if(userInfo.length<1){
            settimeMessage("Your session has expired, please login again")
        }else{

        // const userarray = JSON.parse(userInfo)

        setisSaved(true)


        const getNames = (schedules.map(x=>Object.keys(x)[4]))

        const currentNameIndex = getNames.indexOf(userInfo.first_name)

        const staffSchedule = schedules.map(x=> {
            return x[userInfo.first_name]
        })

        console.log(timeHandle.length)


        if(timeHandle.length >=1){

            setisTime(true)


            const daysArray = staffSchedule[currentNameIndex]

            


            if (daysArray===undefined){
                
                setisEmpty(true)
                postSchedule(
                    userInfo.first_name,
                    userInfo.last_name,
                    userInfo.email,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                
                console.log("Go", daysArray===undefined)
            }else if(daysArray.length<1){

                updateSchedule(
                    userInfo.first_name,
                    userInfo.last_name,
                    userInfo.email,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                
                console.log("Elseif",daysArray.length)
            }else{
                
                updateSchedule(
                    userInfo.first_name,
                    userInfo.last_name,
                    userInfo.email,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                
                console.log("Else",daysArray.length)
            }
        }else{
            setisTime(false)
            settimeMessage("You cannot submit blank times")
        }

        setisTimeInArray(false)



        // disable save button once data is entered
}}, [timeHandle, schedules])

      const deleteAction=(cellValue)=>{

        //Todo: Post data from table to database
        console.log(cellValue);
        setisdeleted(true)
        setisTimeInArray(false)

        setTimeHandle([])

        // enable save button once delete is clicked
      }

      const disableWeekends=(e)=>{
        

        if(e.target.checked){
            setisavailWeekend(false)
        }else{
            setisavailWeekend(true)
        }

      }

      const styleOnClick=(cellValue)=>{


        if (timeHandle.includes(cellValue)){
            setisTimeInArray(true)
            setexistsMessage("You've already picked that time")

            setTimeHandle(timeHandle)

        }else{
            setisTimeInArray(false)
            setTimeHandle([...timeHandle, cellValue])
    }
       
    }
    
      
      return(
        <div>
            <NavLink to="/" className="home-nav"><h1>Psyche Mega Therapy</h1></NavLink>

            <div>{!token? 
          <div className="landing-container">
            <div className="buttons-container">
              <NavLink to="/login-page" className="button login-button">
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
                    <NavLink to="/logout">Service Quotes</NavLink>
                    <NavLink to="/logout" className="button login-button">Logout</NavLink>
                </div>
                
        </div>
        }
        </div>
           
           <p> 
            Not available on weekends? <input className="checkAvail" onClick={disableWeekends} type="checkbox" 
            id="weekends-available" name="Something"></input>
           </p>
           <p className="inArray-message">{isTimeInArray? existsMessage:""}</p>
            <div className="time-button-container" id="time-button-container">
                {timeHandle.map((x, index)=>
                <button className="time-buttons fa fa-close" key={index}>{x}</button>)}
                
            </div>

            
            <div className="message-container">

                
            
                {
                !isTime? <div className="error-message">{timeMessage}</div>:
                
                isPosted ? <div className="spin error-message success-message"></div>:
                Response.status===0? 
                <div className="error-message">
                    <strong>{Response.message}</strong>
                </div>:
                Response.status===1? 
                <div className="success-message">
                   <strong>Saved {Response.message}fully</strong>
                </div>: ""}
                
            </div>

                <table id="cal-table" className="cal-table" key={"table"}>
                <tbody className="t-body" key={"body"}>
            
                <tr key={0}>
                    <th key={1}>Days</th>
                    <th key={2}>Date</th>
                    <th key={3}>Times</th>
                    <th key={4}>Action</th>
                </tr>

                {/* Individual: 1hr,  Couple: 1.30hr, Family: 2hrs*/}

                {monthCal.map((x, index)=> {return(
                <tr key={index+1}>
                    <td id="names" className="day-name" key={"days"}>{x.DaysName}</td>
                    <td key={"dates"} className="dates" ref={dateRef}>{x.date}</td>
                    <td key={"times"} className="time-buts">
                        {x.times.map((x, index)=> 
                        <button key={index} data-target={x} ref={timesRef} onClick={()=>styleOnClick(x)}
                         id="time-buttons" className="time-buttons">{x}
                        </button>
                        )}
                    </td>

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td className="save-tab"><button className="save-button disabled" disabled onClick={()=>saveAction(x.date)}>Save</button></td>:
                        isPosted && x.DaysName? 
                        <td className="save-tab"><button className="save-button disabled" disabled onClick={()=>saveAction(x.date)}>Save</button></td>:
                        <td className="save-tab"><button className="save-button" onClick={()=>saveAction(x.date)}>Save</button></td>
                    }

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td className="save-tab"><button className="save-button disabled" disabled onClick={()=>deleteAction(x.date)}>Delete</button></td>:
                        <td className="save-tab"><button className="save-button" id="save-button delete" onClick={()=>deleteAction(x.date)}>Delete</button></td>
                    }

                    

                </tr>

                    
                    )}
                )
                }

                </tbody>
            </table>
           

        </div>
      )

}

export default StaffSchedule

