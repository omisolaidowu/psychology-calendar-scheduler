

const update_admin = (admin_status, email, setisupdated, setResponse)=>{

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "is_admin": admin_status,
  "email": email
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

setisupdated(false)

fetch("https://megapsyche-omisolaidowu.b4a.run/api/update-to-admin", requestOptions)
  .then(response => response.text())
  .then(result => {
    return(
        setisupdated(true),
        console.log(JSON.parse(result).data),
        setResponse(JSON.parse(result).data)
    )
})
  .catch(error => console.log('error', error));

}

export default update_admin