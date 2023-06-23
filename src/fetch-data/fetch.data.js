



const getData = async (setData, setfetchError, setisLoaded)=>{



  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  setisLoaded(false)
  
  let data = await fetch("https://megapsyche-omisolaidowu.b4a.run/api/get-data", requestOptions)

    .then((response) => response.json())
    .then(result => {return (setData(result["data"]), setisLoaded(true))})
    .catch(error => {return (setfetchError('error loading resources'), setisLoaded(false))});

    return data
  }





export default getData




