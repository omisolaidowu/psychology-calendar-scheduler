



const getData = async (setData, setfetchError)=>{



  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

 
  
  let data = await fetch("http://localhost:5000/api/get-data", requestOptions)

    .then((response) => response.json())
    .then(result => {return (setData(result["data"]))})
    .catch(error => {return (setfetchError('error loading resources'))});
    

    return data
  }





export default getData




