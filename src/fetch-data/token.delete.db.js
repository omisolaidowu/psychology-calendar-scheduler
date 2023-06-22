

const detele_token_db =(token)=>{

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "token": token
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/api/delete-token", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    return result.message
})
  .catch(error => console.log('error', error));


}

export default detele_token_db