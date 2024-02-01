import React, { useEffect, useState } from 'react';

function Spinner(props)
{
     useEffect( () => {
          if(props.data === true)
          {
               let spinner = document.querySelector('.loading-state')
               spinner.classList.toggle('showLoader')
          }
          // else{
          //      const timeOut = setTimeout(() => {
          //           let spinner = document.querySelector('.loading-state')
          //           spinner.classList.toggle('showLoader')
          //      }, 2000)
          // }
     }, [props.data]);

     return (
          <div className="loading-state"><div className="loading"></div></div>
     );
}

export default Spinner;
