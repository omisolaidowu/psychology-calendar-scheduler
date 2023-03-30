import schedular from "../calendar/staffSchedular";
import {useRef, useState, useEffect } from "react";


function StaffSchedule(){
    const [monthCal, setmonthCal] = useState([])
    const dateRef = useRef()
    const [isavailWeekend, setisavailWeekend] = useState(true)

    useEffect(()=>{

        const abortController = new AbortController()
        setmonthCal(schedular())
        
        return () => {
          abortController.abort()
        }
          
          
      }, [])

      const dateAction=(cellValue)=>{
        //Todo: Post data from table to database
        console.log(cellValue);
      }

      const disableWeekends=(e)=>{

        if(e.target.checked){
            setisavailWeekend(false)
        }else{
            setisavailWeekend(true)
        }

      }

      return(
        <div>
            Available on weekends? <input className="checkAvail" onClick={disableWeekends} type="checkbox" 
            id="weekends-available" name="Something"></input>
            
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
                        {x.times.map(x=> <button className="time-buttons">{x}</button>)}
                    </td>

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td><button disabled onClick={()=>dateAction(x.date)}>Save</button></td>:
                        <td><button onClick={()=>dateAction(x.date)}>Save</button></td>
                        }
                </tr>)}
                )
                }

                </tbody>
            </table>
           

        </div>
      )

}

export default StaffSchedule

