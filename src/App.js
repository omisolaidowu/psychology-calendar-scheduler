import Moneyprompt from "./components/AddMoney";
import Home from "./components/Scheduler";
import StaffSchedule from "./components/staffSchedular";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import { Suspense } from 'react';




function App(){
    // const repo = repositoryName

    return(
    <Router>
        <Suspense fallback={<div>Please wait...</div>}>
           <Switch>
            <Route exact strict path="/" component={Moneyprompt}/>
            <Route exact strict path="/book-a-meeting" component={Home}/>
            <Route exact strict path="/admin-console" component={StaffSchedule}/>
            </Switch>
        </Suspense>
    </Router>

        
    )

}



export default App;


