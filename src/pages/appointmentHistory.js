import React, {useCallback, useState, useEffect} from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import summary from './../public/notepad-optimized.jpg';

function AppointmentHistoryPage()
{
     const history = useHistory();
     const [allAppointments, setAllAppointments] = useState([])

     useEffect(()=>{
          const appointments = JSON.parse(sessionStorage.getItem("appointment_history"))
          setAllAppointments(appointments.reverse())
    }, [])

    const bookAppointment = useCallback(() => {
         history.push('/user/book-appointment')
    })

     return (
          <div className="appointment-history-wrapper">
               <header className="">
                    <NavLink to="/user/dashboard" className="anchorTag">&#x2190;</NavLink>
                    <h2>Your appointment history</h2>
               </header>
               <section>
                    {    allAppointments.length > 0 ?
                         allAppointments.map( (appointment) => {
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
               </section>
          </div>
     );
}

export default AppointmentHistoryPage;
