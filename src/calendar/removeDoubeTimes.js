const getUniqueArry =(arr)=>{
    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];
        const firstIndex = arr.indexOf(currentItem);
        const lastIndex = arr.lastIndexOf(currentItem);
        if (firstIndex !== lastIndex) {
          arr.splice(lastIndex, 1);
        }
      }

      return arr
}

export default getUniqueArry