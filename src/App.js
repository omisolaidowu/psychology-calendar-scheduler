import Moneyprompt from "./components/AddMoney";
import Home from "./components/Scheduler";
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
            </Switch>
        </Suspense>
    </Router>

        
    )

}



export default App;


