const filterPassedDays = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date)


    if(currentDate.getMonth()===9){
    
    return currentDate.getDate() > selectedDate.getDate();}
};

export default filterPassedDays