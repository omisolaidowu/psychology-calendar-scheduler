import removeTimeDate from "../fetch-data/remove.fetch"

const handlesubmit = (
    setremovedMessage,
    setStatus,
    time, 
    date, 
    staff,
    schedules,
    setisSubmitted
    ) =>{
        let dateSelected = date.toLocaleString('en-us').split("-")
          
        let firstName = schedules.map((x)=> {return x.first_name})

        let last_namedata = schedules.map((x)=> {return x.last_name})

        let email_data = schedules.map((x)=> {return x.email})

        const currFirstNameIndex = firstName.indexOf(staff)

        let last_name = last_namedata[currFirstNameIndex]

        let selectedEmail = email_data[currFirstNameIndex]
    

        let removeData = removeTimeDate(
          setremovedMessage,
          setStatus,
          staff,
          last_name,
          selectedEmail,
          dateSelected[2],
          time,
          setisSubmitted
      )

    
}


export default handlesubmit
