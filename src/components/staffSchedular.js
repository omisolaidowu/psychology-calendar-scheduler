import schedular from "../calendar/staffSchedular";
import {useRef, useState, useEffect } from "react";
import getUniqueArry from "../calendar/removeDoubeTimes";



function StaffSchedule(){
    const [monthCal, setmonthCal] = useState([])
    const dateRef = useRef()
    const timesRef = useRef()
    const [isavailWeekend, setisavailWeekend] = useState(true)
    const [isdeleted, setisdeleted] = useState(false)
    const [timeHandle, setTimeHandle] = useState([])
    const [existsMessage, setexistsMessage] = useState("")
    const [isTimeInArray, setisTimeInArray] = useState(false)

    useEffect(()=>{

        const abortController = new AbortController()
        setmonthCal(schedular())
        
        return () => {
          abortController.abort()
        }
          
          
      }, [isdeleted])

      const saveAction=(cellValue)=>{
        //Todo: Post data from table to database
        console.log(cellValue);

        console.log(timeHandle)

        setTimeHandle([])
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
           
           <p> 
            Not available on weekends? <input className="checkAvail" onClick={disableWeekends} type="checkbox" 
            id="weekends-available" name="Something"></input>
           </p>
           <p className="inArray-message">{isTimeInArray? existsMessage:""}</p>
            <div id="time-button-container">
                {timeHandle.map((x, index)=>
                <button className="time-buttons fa fa-close" key={index}>{x}</button>)}
                
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

