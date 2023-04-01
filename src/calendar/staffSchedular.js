const getDaysInMonth = (year, month) =>{
    
    let currMonth = new Date(year, month + 1, 0).getDate()

    let Ranges = [...Array(currMonth+1).keys()]

    Ranges.splice(0, 1)
  return Ranges
}

const getDayName = (year, month, day)=> {
    let date = new Date(year, month, day);
    let dayName = date.toLocaleString('en-US', {weekday: 'long'});
    return dayName;
  }


const schedular=()=>{
const date = new Date()
let monthNow = date.getMonth()
let yearNow = date.getFullYear()



let daysofMonth = getDaysInMonth(yearNow, monthNow)

let days = daysofMonth.map(x=>
    {
        return (
            {
                "DaysName": getDayName(yearNow, monthNow, x),
                "date": x.toString(), 
                "times": [
                    "8:00 AM", 
                    "9:00 AM", 
                    "10:00 AM", 
                    "11:00 AM", 
                    "12:00 PM", 
                    "1:00 PM", 
                    "2:00 PM", 
                    "3:00 PM", 
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM"
                ]
            })
    })

return days
}

export default schedular

