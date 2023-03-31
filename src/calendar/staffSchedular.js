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
                "date": x, 
                "times": [
                    "8:00AM", 
                    "9:00AM", 
                    "10:00AM", 
                    "11:00AM", 
                    "12:00PM", 
                    "1:00PM", 
                    "2:00PM", 
                    "3:00PM", 
                    "4:00PM",
                    "5:00PM",
                    "6:00PM"
                ]
            })
    })

return days
}

export default schedular

