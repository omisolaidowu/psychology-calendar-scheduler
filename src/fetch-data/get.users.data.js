const usersdata =(setsuerarray)=>{

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://megapsyche-omisolaidowu.b4a.run/api/all-users", requestOptions)
    .then(response => response.json())
    .then(result => {
        return (
        setsuerarray(result.data)
        )
    })
    .catch(error => console.log('error', error));

}

export default usersdata
