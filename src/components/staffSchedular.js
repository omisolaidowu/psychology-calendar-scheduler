import schedular from "../calendar/staffSchedular";
import {useRef, useState, useEffect } from "react";
import getData from "../fetch-data/fetch.data";

import postSchedule from "../fetch-data/post.schedule";
import updateSchedule from "../fetch-data/update.schedule";

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
    const [arrEmpty, setarrEmpty] = useState(false)
    const [arrDate, setarrDate] = useState([])

    

    useEffect(()=>{

        const abortController = new AbortController()
        setmonthCal(schedular())
        getData(
            setSchedules, 
            setfetchError, 
            setisFetched, 
            setisLoaded
            )
        
        return () => {
            
          abortController.abort()
        }
          
          
      }, [isdeleted])

      const saveAction=(cellValue)=>{
        //Todo: Post data from table to database

        const getNames = (schedules.map(x=>Object.keys(x)[4]))

        const currentNameIndex = getNames.indexOf(firstNameRef.current.value)

        const staffSchedule = schedules.map(x=> {
            return x[firstNameRef.current.value]
        })

            // console.log(staffSchedule[currentNameIndex])

            const daysArray = staffSchedule[currentNameIndex]

       
            
            if (daysArray===undefined){
                // setarrEmpty(true)
                
                setisEmpty(true)
                postSchedule(
                    firstNameRef.current.value,
                    lastNameRef.current.value,
                    emailRef.current.value,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                
                console.log("Go", daysArray===undefined)
            }
            else if(daysArray.length<1){
                // setarrEmpty(false)

                updateSchedule(
                    firstNameRef.current.value,
                    lastNameRef.current.value,
                    emailRef.current.value,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                console.log("Elseif",daysArray.length)
            }else{
                updateSchedule(
                    firstNameRef.current.value,
                    lastNameRef.current.value,
                    emailRef.current.value,
                    cellValue,
                    timeHandle,
                    setisPosted,
                    setResponse
                )

                setTimeHandle([])
                console.log("Else",daysArray.length)
            }


        
        setisTimeInArray(false)



        // disable save button once data is entered
      }


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
            <div className="staff-input-container">

                <p><input ref={firstNameRef} placeholder="First Name" className="" id=""></input></p>
                <p><input ref={lastNameRef} placeholder="Last Name" className="" id=""></input></p>
                <input ref={emailRef} placeholder="Email Address" className="" id=""></input>
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
            
                {isPosted ? <div className="spin error-message success-message"></div>:
                Response.status===0? 
                <div className="error-message">
                    <strong>{Response.message}</strong>
                </div>:
                Response.status===1? 
                <div className="success-message">
                   <strong>Saved {Response.message}fully</strong>
                </div>: ""}
                
            </div>

                <table id="cal-table" key={"table"}>
                <tbody key={"body"}>
            
            
            
                <tr key={0}>
                    <th key={1}>Days</th>
                    <th key={2}>Date</th>
                    <th key={3}>Times</th>
                    <th key={4}>Action</th>
                </tr>

                {monthCal.map((x, index)=> {return(
                <tr key={index+1}>
                    <td id="names" key={"days"}>{x.DaysName}</td>
                    <td key={"dates"} ref={dateRef}>{x.date}</td>
                    <td key={"times"}>
                        {x.times.map((x, index)=> 
                        <button key={index} data-target={x} ref={timesRef} onClick={()=>styleOnClick(x)}
                         id="time-buttons" className="time-buttons">{x}
                        </button>
                        )}
                    </td>

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td><button className="save-button disabled" disabled onClick={()=>saveAction(x.date)}>Save</button></td>:
                        <td><button className="save-button" onClick={()=>saveAction(x.date)}>Save</button></td>
                    }

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td><button className="save-button disabled" disabled onClick={()=>deleteAction(x.date)}>Delete</button></td>:
                        <td><button className="save-button" id="save-button delete" onClick={()=>deleteAction(x.date)}>Delete</button></td>
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

