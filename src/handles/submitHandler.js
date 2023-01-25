const handlesubmit = (time, date, staff)=>{
    console.log(time.current.value)
    console.log(date.current.value)
    console.log(staff.current.value)
    
    time.current.value = "Select a meeting time"
    date.current.value = ""
    staff.current.value = "Select a staff"

    //Task: Remove selected time from the database on submit
    

}


export default handlesubmit
