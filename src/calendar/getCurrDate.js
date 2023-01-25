const getter =(b)=>{

    var today = []

    b.forEach((value, index) =>{
        const d = new Date()
        d.setDate(value)

        today.push(d.getDay())


    })

    return today

}

export default getter