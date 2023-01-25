// // import { addDays } from 'date-fns';


// const picked = new Date().getDate()

// const highlights = [20, 24, 27]

// var k = []
// const myDateHighlight = (dated) =>{
//     for(var i = 0; i < dated.length; i++){
//         k.push([(dated[i]-picked)])
       
//     }
//     return k
//    }
//    const myDate = (dated) =>{
//     return (dated-picked)
//     }


// //    let tryArray = [];
// // //    [addDays(new Date(), myDate(20)), addDays(new Date(), myDate(25))]
// //     highlights.forEach( (value, index) => {
// //         tryArray.push(addDays(new Date(), myDate(value)))
// //     })

// //     console.log(tryArray)


// const getter =(b)=>{

//     var t = []

//     b.forEach((value, index) =>{
//         const d = new Date()
//         d.setDate(value)

//         t.push(d.getDay())


//     })

//     return t

// }

// console.log(getter(highlights))

// // getter(highlights).forEach(x=>console.log(x))



// // console.log(getter(highlights))


// // const times = {
// //     "3":["3:00", "8:00"], "7":["6:00", "12:00"]
// //   }

// //   console.log(times["3"])



//     // const d = new Date()

//     // console.log(d.setDate(30))




//     // console.log(d.getDate())

// // const myDat = (dated) =>{
// //     var hello
// // dated.forEach(element => {
// //     hello = element-picked

// // });
// // return hello
// // }
// //    }


// // const myDate = (dated) =>{
// //     var res = dated.map(x=> x-picked)
// //     return res
    

// // }



    



// //     for(var i = 0; i < res.length; i++){
// //                 res = res[i]
// //             }

// //             return res

    
    
// //    }

// // const d =() =>{ for(var i = 0; i < myDate(highlights).length; i++){
//             //         return myDate(highlights)[i]
//             //     }
//             // }
// // const myDate = (dated) =>{
// //     return (dated-picked)
// //     }





// // for(var i = 0; i < highlights.length; i++){
// //                         console.log(myDate(highlights))
// //                     }



// // const mappedTime = highlights.map(x=> x)

// // console.log(()=>{for(var i=0; i<highlights.length; i++){return myDate(highlights[i])}})




// const a =()=> highlights.forEach(element => {myDate(element)});

// // console.log(a())

// // console.log(myDateHighlight(highlights))

// // var a = myDate(highlights).forEach(elements => elements)

// //    console.log(d())

// //    console.log(myDat(highlights))



// {/* <HomeUI title = {page && (
//         <PrismicRichText field={page.data.page_title} />
//       )}/>

//         <HomeUI texts = {page && (
//         <PrismicRichText field={page.data.insert_image} />
//       )}/>

//         <HomeUI image1 = {page && (
//         <img src={prismicH.asImageSrc(page.data.upload_an_image, { sat: -50 })}
//          alt={page.data.upload_an_image.alt} />
//       )}/>

//         <HomeUI map = {page && (
//         <map> {prismicH.asImagePixelDensitySrcSet(page.data.map)}</map>
    
//       )}/>


      
//       <HomeUI calendar = {page && (
//          <time 
//          datetime={prismicH.asDate(page.data.date_picker).toISOString()}
//          >
//           {prismicH.asDate(page.data.date_picker).toLocaleString()}
//         </time>
        
         
//       )}/> */}


// const times = [{
//   28:["3:00", "8:00"], 
//   30:["6:00", "12:00"],
//   31:["12:00", "3:00"]

// }]


let times = [{
  "Omisola":
{
  29:["3:00 PM", "8:00 AM", "7:00 AM"], 
  30:["6:00 PM", "12:00 PM"],
  31:["12:00 PM", "3:00 PM"],
  1:["1:00 PM", "4:00 PM"],
  2:["5:00 PM", "7:00 PM"]

},
"Idowu":
{
  29:["3:00 PM", "8:00 AM", "7:00 AM"], 
  30:["6:00 PM", "12:00 PM"],
  31:["12:00 PM", "3:00 PM"],
  1:["1:00 PM", "4:00 PM"],
  2:["5:00 PM", "7:00 PM"]

}
}]



const g = times.map((x)=> Object.keys(x.Omisola))


// const d = times.map(x=>x.Idowu[29])


// const redo = g.map(x => x)


// console.log(g[0])


const day = new Date()

const currentDay = new Date()




day.setDate(1)
// day.setMonth(0)

console.log(day.getMonth())
console.log(day.getMonth() < currentDay.getMonth())


// console.log((day.getDate() > currentDay.getDate()).toString())

// console.log((currentDay.getDate()).toString())


// const l = [1, 2, 5]


// console.log(l.splice(3))




// for (let index = 0; index < times.length; index++) {
//   const element = times;


//   console.log(element)
  
// }


// const y = g.values




// const select =()=>{

//   return times.map((x)=> x[31])

// }



// const bring =()=>{
//   return select(times, 30)[0]
// }

// console.log(select()[0])


// console.log(y)