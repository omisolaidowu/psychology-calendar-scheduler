
const postSchedule=(
    first_name, 
    last_name, 
    email, 
    days, 
    schedules, 
    setisPosted, 
    setResponse
    )=>{


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "first_name": first_name,
  "last_name": last_name,
  "email": email,
  "days": days,
  "scheduleTimes": schedules
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

setisPosted(true)

fetch("https://megapsyche-omisolaidowu.b4a.run/api/create-schedule", requestOptions)
  .then(response => response.json())
  .then(result => { 
    return (
        setResponse(result), 
        setisPosted(false)
        )
    })
  .catch(error => setResponse("An error has occured"))
}

export default postSchedule