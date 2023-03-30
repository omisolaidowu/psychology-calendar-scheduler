
const styleOnClick=(cellValue)=>{

    var targetElement = document.querySelector("[value='" + cellValue + "']");
        
            
    targetElement.style.backgroundColor = "green";
   

    console.log(targetElement)
}

export default styleOnClick
