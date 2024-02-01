import BookMeeting from "./components/Scheduler";
import StaffSchedule from "./components/staffSchedular";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/register";
import HomePage from "./components/HomePage";
import HeaderPage from "./components/header";
import Spinner from "./components/spinner";
import ContactPage from "./pages/contact";
import FaqPage from "./pages/faq";
import AppointmentHistoryPage from './pages/appointmentHistory';
import AboutPage from "./pages/about";
import ProfilePage from "./pages/profile"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import { Suspense } from 'react';
import RoleBasedRoute from "./HOCs/allowedroutes";
import GuestRoute from "./HOCs/guest";
import LandingPage from "./pages/Landingpage";
import Logout from "./components/Logout";
import Parse from "parse/dist/parse.min.js";
import SuperAdminComponent from "./components/SuperAdmin";
import Navigation from "./components/Notfound";
import NetworkStatus from "./components/Network";
import Layout from "./HOCs/UserDashboardLayout";


const FaqComponent = Layout(FaqPage)
const HomeDashboardComponent = Layout(HomePage)
const ProfileComponent = Layout(ProfilePage)
const BookMeetingComponent = Layout(BookMeeting)
const AppointmentHistoryCompomemt = Layout(AppointmentHistoryPage)


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

    const isAuthenticated = sessionStorage.getItem('access_token')


    return(
    <Router>
        <Suspense fallback={<div>Please wait...</div>}>
           <Switch>
            <Route exact strict path="/contact"
            component={ContactPage}
            />

            <Route exact strict path="/about"
            component={AboutPage}
            />

            <Route exact strict path="/"
             component={LandingPage}
             />

             <Route exact strict path="/login"
              component={LoginPage}
              />

             <Route exact strict path="/register"
              component={RegisterPage}
              />

            <Route exact strict
            path="/user/book-appointment"
            component={BookMeetingComponent}
            />

            <Route exact strict
            path="/user/dashboard"
            component={HomeDashboardComponent}

            />

            <Route exact strict
               path="/user/profile"
               component={ProfileComponent}
            />

            <Route exact strict
               path="/user/faq"
               component={FaqComponent}
            />

            <Route exact strict
               path="/user/my-appointments"
               component={AppointmentHistoryCompomemt}
            />

            <RoleBasedRoute exact strict
            path="/admin-console"
            component={StaffSchedule}
            allowedRoles={['super-admin', 'admin']}
            userRole={userRole}
            />

            <RoleBasedRoute exact strict
            path="/superadmin-console"
            component={SuperAdminComponent}
            allowedRoles={['super-admin']}
            userRole={userRole}
            />
            <Route exact strict path="/logout" component={Logout}/>

            <Route exact strict path="*"
            component={Navigation}
            />
            </Switch>
        </Suspense>
    </Router>

    )

}



export default App;
