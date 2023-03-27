



const getData = async (setData, setfetchError, setisFetched, setisLoaded)=>{



  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  setisLoaded(false)
  
  let data = await fetch("http://localhost:5000/api/get-data", requestOptions)

    .then((response) => response.json())
    .then(result => {return (setData(result["data"]), setisFetched(true), setisLoaded(true))})
    .catch(error => {return (setfetchError('error loading resources'), setisFetched(false))});

    return data
  }





export default getData




