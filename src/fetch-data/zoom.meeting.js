const zoom_meeting_submit = (
    start_date,
    start_time,
    topic,
    therapist_name,
    therapist_email,
    client_name,
    client_email,
    setisSubmitted,
    setmeetingData,
    setisMeeting
) =>{


    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "start_date": start_date,
  "start_time": start_time,
  "topic": topic,
  "duration": "120",
  "therapist_name": therapist_name,
  "therapist_email": therapist_email,
  "client_name": client_name,
  "client_email": client_email
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

setisSubmitted(true)
setisMeeting(true)

fetch("https://megapsyche-omisolaidowu.b4a.run/api/create-zoomlink", requestOptions)
  .then(response => response.json())
  .then(result => {return (
    setisSubmitted(false),
    setmeetingData(result.data),
    setisMeeting(false),
    console.log(result.data)
    )})
  .catch(error => console.log('error', error));

}


export default zoom_meeting_submit
