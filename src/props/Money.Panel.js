import React from 'react'


function Addmoney(props) {
    
    
        return(
            
            <div className="myHead">
                
                
                {props.data}
                {props.currMoney}
                {props.text}
                {props.computedMoney}
                {props.portPower}
                {props.percPower}
                {props.Moneydepo}
              
                
                

            </div>

        );
    }


export default Addmoney
/*TODO: GET POST PUT DELETE Store amount deposited in database. Store amount traded in the database. 
SUbstract amount traded from total amount deposited. If there is gain, add gain back to 
total amount deposited. Display real-time gain, substract from that of yesterday and calculate percentage
Gains depend on the total stock and type of stock. Users should be able to view stocks giving them money*/

