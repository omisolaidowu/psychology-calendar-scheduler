const user_info=(token, setInfo)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "token": token
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/api/user-info", requestOptions)
    .then(response => response.text())
    .then(result => {
        
        setInfo(result)
        return result
    })
    .catch(error => console.log('error', error));

    }
export default user_info