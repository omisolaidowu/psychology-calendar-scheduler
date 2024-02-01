const base_url = 'https://megapsyche-omisolaidowu.b4a.run/'

async function apiRequestWithParameter(url, parameter = {})
{
     let request = await fetch(base_url+url, parameter)
       .then(response => {
         return response.json();
       })
       .then(data => {
         return data
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
       return request;
}

export async function getAllTherapists()
{
     let users = await fetch(base_url+'api/get-data')
       .then(response => {
         return response.json();
       })
       .then(data => {
         return data
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
       return users;
}

export async function loadUserTherapySessionInformation(email)
{
     let userInfo = apiRequestWithParameter('api/user/all-appointment', {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({"email": email}),
     })
     return userInfo;
}
