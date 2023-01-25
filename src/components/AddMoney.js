
import Addmoney from "../props/Money.Panel";
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import Calendar from 'react-calendar'




function Moneyprompt(props) {
    const moneybefore = 20;
    const yourmoney = 35;
    const percincrease = Math.round(((yourmoney-moneybefore)/moneybefore)*100, 2)
    const percdecrease = Math.round(((moneybefore-yourmoney)/moneybefore)*100, 2)
    
    return(
        <div>
            <div className = "add-money">
            <div className = "add-money-sub">
                <Addmoney currMoney = {"$"+yourmoney+"."} />
                <sub className="small"> 
                    <Addmoney data = "00" />
                </sub>
            </div>
            
            <div className = "made-today">
            {yourmoney>moneybefore?
                <span className="up">
                    <BsFillArrowUpCircleFill />
                </span>:
                moneybefore>yourmoney?
                <span className="down">
                    
                    <BsFillArrowDownCircleFill />
                    
                </span>:""}
                    {moneybefore>yourmoney?
                    <Addmoney 
                    computedMoney = {"-$"+(moneybefore-yourmoney)+" "+"("+percdecrease+"%"+")"+" "+"Today"} 
                    />:yourmoney>moneybefore?
                    <Addmoney 
                    computedMoney = {"$"+(yourmoney-moneybefore)+" "+"("+percincrease+"%"+")"+" "+"Today"} 
                />:""}
            </div>
            
            <Addmoney portPower = "PORTFOLIO POWER"/><hr />
            <Addmoney percPower = "$0.00 BUYING POWER"/>
            <button>
            <Addmoney Moneydepo = "Deposit Money"/>
            </button>
            </div>
            
        </div>
        
        
    );
}

export default Moneyprompt

