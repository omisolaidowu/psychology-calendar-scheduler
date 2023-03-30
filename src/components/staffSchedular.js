import schedular from "../calendar/staffSchedular";
import {useRef, useState, useEffect } from "react";
import styleOnClick from "../calendar/styleButtonClick";


function StaffSchedule(){
    const [monthCal, setmonthCal] = useState([])
    const dateRef = useRef()
    const timesRef = useRef()
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

        // disable save button once data is entered
      }


      const deleteAction=(cellValue)=>{
        //Todo: Post data from table to database
        console.log(cellValue);

        // disable save button once delete is clicked
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
            Not available on weekends? <input className="checkAvail" onClick={disableWeekends} type="checkbox" 
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
                        {x.times.map((x, index)=> 
                        <button key={index} value={x} ref={timesRef} onClick={()=>styleOnClick(x)}
                         id="time-buttons" className="time-buttons">{x}
                        </button>)}
                    </td>

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td><button className="save-button disabled" disabled onClick={()=>dateAction(x.date)}>Save</button></td>:
                        <td><button className="save-button" onClick={()=>dateAction(x.date)}>Save</button></td>
                    }

                    {!isavailWeekend && (x.DaysName==="Saturday" || x.DaysName==="Sunday")?
                        <td><button className="save-button disabled" disabled onClick={()=>dateAction(x.date)}>Delete</button></td>:
                        <td><button className="save-button" onClick={()=>deleteAction(x.date)}>Delete</button></td>
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

