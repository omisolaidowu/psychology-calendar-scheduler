import { addDays } from 'date-fns';
 
const myDate = (dated) =>{
   const picked = new Date().getDate()
   
   return (dated-picked)
   }

const highlightmyDate = (highs)=>{
   let tryArray = [];

   const currentdate = new Date().getDate()


    highs.forEach( (value) => {
       tryArray.push(currentdate <= value &&  addDays(new Date(), myDate(value)))
    })

    return tryArray

   }

export default highlightmyDate