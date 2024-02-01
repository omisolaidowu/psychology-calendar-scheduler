import React, {useCallback, useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import summary from './../public/notepad-optimized.jpg';
import avater from './../public/avater.jpg';

import user_info from "../fetch-data/user.info";

function HomePage(){
     const history = useHistory();

    const [userInfo, setuserInfo] = useState([])
    const [token, setToken] = useState('');
    const [first_name, setFirstName] = useState(null);
    const [upcomingAppointment, setUpcomingAppointment] = useState(null)
    const [last3Appointments, setlast3Appointments] = useState([])

    useEffect(()=>{
     setFirstName(sessionStorage.getItem('first_name'))
     const abortController = new AbortController()

     const access_token = sessionStorage.getItem("access_token")
     setToken(access_token)
     const appointments = JSON.parse(sessionStorage.getItem("appointment_history"))
     const revered_appointments = appointments.reverse()
     if(revered_appointments.length > 0)
     {
          revered_appointments.forEach((appointment, index) => {
               if(appointment.state == "Upcoming")
               {
                    setUpcomingAppointment(appointment)
               }
          })
          setlast3Appointments(revered_appointments.slice(0, 3))
     }

     user_info(access_token, (data) => {
         setuserInfo(JSON.parse(data));
         sessionStorage.setItem("user", data)
       });
     return () => {
         abortController.abort()
         // stop the query by aborting on the AbortController on unmount
       }

   }, [])

     const toggleNavigation = useState(false)

     const useToggleNavigation = useCallback( () => {
          let toggle = document.querySelector('.sideBarContainer')
          toggle.classList.toggle('openSideBar')
          // console.log(toggleNavigation[0], toggle)
     })

     const bookAppointment = useCallback(() => {
          history.push('/user/book-appointment')
     })
     return (
          <div className="user-dashboard-container">
               <div className="homepage-header">
                    <p className="date">{new Date().toDateString()}</p>
                    <div className="flex-between">
                         <p>Hi <span>{first_name ?? userInfo.first_name}</span></p>
                         <img className="profile-avater mr-25" alt='avatar' src={avater} />
                    </div>
               </div>
               <div className="homepage-section-containers">
                    <div >
                         <h4>Your Upcoming appointment (s)</h4>
                              {  upcomingAppointment != null ?
                                   <div>
                                        <div className="upcoming-session-card">
                                             <div className="upcoming-session-card-header">
                                                  <h3>{upcomingAppointment.purpose } therapy session</h3>
                                             </div>
                                             <div className="upcoming-session-card-body">
                                                  <p>Time: {upcomingAppointment.time + ' ' +upcomingAppointment.meetingTime}</p>
                                                  <p>Platform: {upcomingAppointment.platform}</p>
                                                  <p>Link: <a target="_blank" href={upcomingAppointment.meeting_url}>Link is embededd here</a></p>
                                                  <p>Attending physician: {upcomingAppointment.therapist_name}</p>
                                                  <p>Session requirements: Privacy, mic, and earpiece</p>
                                             </div>
                                         </div>
                                         <button className="solid-button">Book an appointment</button>
                                    </div> :
                                   <div className="empty-upcoming-wrapper">
                                        <p>You do not have Upcoming schedule, Click the button to make an appointment</p>
                                        <div>
                                             <button onClick={bookAppointment} className="solid-button">Book an appointment</button>
                                        </div>
                                   </div>
                              }
                    </div>
               </div>
               <div className="overflow-x-wrapper homepage-section-containers">
                    <div className="flex-between">
                         <h4>Appointment history</h4>
                         {    last3Appointments.length > 2 ?
                              <NavLink to="/user/my-appointments" className="anchorTag">Show all</NavLink> : ''
                         }
                    </div>
                    <div className="appointment-history-container">
                         {    last3Appointments.length > 0 ?
                              last3Appointments.map( (appointment) => {
                                   return <div className="appointment-history-card" key={appointment.password}>
                                        <div className="appointment-history-text-wrapper">
                                             <p>{appointment.time + '  ' + appointment.meetingTime}</p>
                                             <h4>Therapist: {appointment.therapist_name}</h4>
                                             <p>Platform: {appointment.platform}</p>
                                             <p>Therapy type: { appointment.purpose.toUpperCase()} </p>
                                             <p>Therapy timeslot: { appointment.duration} </p>
                                        </div>
                                        <img src={summary} className="appointment-history-card-image" />
                                   </div>
                              }) :
                              <div className="empty-upcoming-wrapper">
                                   <p>You do not have appointment history yet, Click the button to make an appointment</p>
                                   <div>
                                        <button onClick={bookAppointment} className="solid-button">Book an appointment</button>
                                   </div>
                              </div>
                         }
                    </div>
               </div>
               <div className="homepage-section-containers">
                    <div className="flex-between">
                         <h4>Possible appointment types</h4>
                         // <NavLink to="" className="anchorTag">Explore all</NavLink>
                    </div>
                    <div className="appointment-card-container">
                         <div className="appointment-type-card">
                              <div className="appointment-card-text-wrapper">
                                   <p>Single Therapy</p>
                                   <p>Virtual | Physical</p>
                              </div>
                         </div>
                         <div className="appointment-type-card">
                              <div className="appointment-card-text-wrapper">
                                   <p>Couple's Therapy</p>
                                   <p>Virtual | Physical</p>
                              </div>
                         </div>
                         <div className="appointment-type-card">
                              <div className="appointment-card-text-wrapper">
                                   <p>Family Therapy</p>
                                   <p>Virtual | Physical</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default HomePage;
