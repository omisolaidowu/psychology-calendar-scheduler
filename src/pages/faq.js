import React from 'react';
import { NavLink } from 'react-router-dom';

function FaqPage()
{
     return (
          <div className="user-profile-page ">
               <header>
                    <NavLink to="/user/dashboard" className="anchorTag">&#x2190;</NavLink>
                    <div >
                         <h1>FAQ</h1>
                    </div>
               </header>
               <section className="user-dashboard-container faq-page-overall-wrapper">
                    <div className="faq-headline-wrapper">
                         <h1>Frequently Asked Questions</h1>
                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                    <div className="faq-content-container">
                         <h4>Payment</h4>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>

                         <h4>Payment</h4>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>

                         <h4>Payment</h4>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                         <details>
                              <summary>This is the way to go about a FAQ header</summary>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                         </details>
                    </div>
               </section>
          </div>
     );
}

export default FaqPage;
