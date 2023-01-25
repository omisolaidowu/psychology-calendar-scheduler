const isWeekday = (date) => {

    const d = new Date(date);
    const day = d.getDay();
    return day !== 0 && day !== 6;
  };

export default isWeekday