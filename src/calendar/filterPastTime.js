const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time)
   
    return currentDate.getTime() < selectedDate.getTime();
};

export default filterPassedTime



