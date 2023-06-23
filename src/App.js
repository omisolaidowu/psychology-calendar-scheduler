import Home from "./components/Scheduler";
import StaffSchedule from "./components/staffSchedular";
import LoginPage from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import { Suspense } from 'react';
import RoleBasedRoute from "./HOCs/allowedroutes";
import GuestRoute from "./HOCs/guest";
import LandingPage from "./components/Landingpage";
import Logout from "./components/Logout";
import Parse from "parse/dist/parse.min.js";

const app_id = process.env.APPLICATION_ID
const js_id = process.env.JAVASCRIPT_KEY

Parse.initialize(app_id, js_id);
Parse.serverURL = "https://parseapi.back4app.com/";


function App(){

    const userRole =
    sessionStorage.getItem('role') === 'super_admin'
    ? 'super-admin'
    : sessionStorage.getItem('role') === 'admin'
    ? 'admin'
    : sessionStorage.getItem('role') === 'user'
    ? 'user'
    :'';

    const token = sessionStorage.getItem('access_token')


    return(
    <Router>
        <Suspense fallback={<div>Please wait...</div>}>
           <Switch>
            <Route exact strict path="/" component={LandingPage}/>
            
            <Route exact strict path="/login-page"
             component={LoginPage}
            //  isAuthenticated = {token!==null}
             />
            <Route exact strict 
            path="/book-a-meeting" 
            component={Home}
            // allowedRoles={['super-admin', 'admin', 'user']}
            // userRole={userRole}
            />
            <RoleBasedRoute exact strict 
            path="/admin-console" 
            component={StaffSchedule}
            allowedRoles={['super-admin', 'admin']}
            userRole={userRole}
            />
            <Route exact strict path="/logout" component={Logout}/>
            </Switch>
        </Suspense>
    </Router>

    )

}



export default App;


