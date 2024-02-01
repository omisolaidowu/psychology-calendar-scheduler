
const removeTimeDate = async (
    setMessage,
    setStatus,
    firstName,
    lastName,
    emailAddress,
    selectedDay,
    selectedTime,
    setisSubmitted
    )=>{

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
  "first_name": firstName,
  "last_name": lastName,
  "email": emailAddress,
  "days": selectedDay,
  "bio": '',
  "certification": '',
  "image_path": '',
  "experience": '',
  "scheduleTimes": [
  ],
  "time": selectedTime
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};




  setisSubmitted(true)
  let data = await fetch("https://megapsyche-omisolaidowu.b4a.run/api/remove-selected-time", requestOptions)
  .then(response =>
    {
    if (response.ok) {
      return response.json()
    }else{
      setMessage("Someone else might've picked your time. Please book another time or select another therapist")
      return response.json()
    }
 } )
  .then(result => {
    return (
      setisSubmitted(false),
      setMessage(result["message"]),
      setStatus(result["status"],

    ))
  })
  .catch(error => {
    return (
    setMessage("Unable to schedule meeting, please try again later or contact admin")
    )});



  return data
}

export default removeTimeDate
