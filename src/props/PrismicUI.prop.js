import React from 'react'


function HomeUI(props) {
    
    
        return(
            
            <div className="m">
                
                {props.title}
                {props.texts}
                {props.image1}
                {props.map}
                {props.calendar}
                
                

            </div>

        );
    }


export default HomeUI