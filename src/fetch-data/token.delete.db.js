

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

fetch("https://megapsyche-omisolaidowu.b4a.run/api/delete-token", requestOptions)
  .then(response => response.text())
  .then(result => {
    return result.message
})
  .catch(error => console.log('error', error));


}

export default detele_token_db
