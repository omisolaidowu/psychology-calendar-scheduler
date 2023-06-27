import React, { useEffect, useState, useRef } from 'react';
import usersdata from '../fetch-data/get.users.data';

import update_admin from '../fetch-data/update.to.admin';
import {NavLink} from 'react-router-dom'

import user_info from "../fetch-data/user.info";

const SuperAdminComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currCellEmail, setcurrCellEmail] = useState('')
  const [currCellAdminStatus, setCurrCellAdminStatus] = useState('')
  const [updateResponse, setUpdateResponse] = useState('')

  const [userInfo, setuserInfo] = useState([])
const [token, setToken] = useState('');
 
  const [editedUserData, setEditedUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    is_admin: '',
    is_super_admin:'',
  });

  const [isupdated, setIsUpdated] = useState(true)

  const [isConfirmed, setIsConfirmed] = useState(false)


  useEffect(() => {
    // Fetch the list of users from the backend or any data source
    // and update the 'users' state variable
    usersdata(setUsers);

    const access_token = sessionStorage.getItem("access_token")
        setToken(access_token)

        user_info(access_token, (data) => {
            setuserInfo(JSON.parse(data));
          });
    
  }, [!isupdated]);

//   console.log(users.filter(user=>user.Email))

//   console.log(users.data.filter(user => user.emai))


  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (user, cellEmail) => {

    setcurrCellEmail(cellEmail)

    console.log(cellEmail);



    setSelectedUser(user);
    setShowConfirmation(false);
    setEditedUserData({
      email: user.Email,
      firstName: user.First_name,
      lastName: user.Last_name,
      is_admin: user.is_admin,
      is_super: user.is_super_admin
    });
  };

  const handleSaveEdit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmEdit = () => {
    
    update_admin(currCellAdminStatus, currCellEmail, setIsUpdated, setUpdateResponse)

    setIsConfirmed(true)
    
    setSelectedUser(null);
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setShowConfirmation(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(event.target.value)
    setCurrCellAdminStatus(event.target.value)
    setEditedUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredUsers = users.filter(
    user =>
      user.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.First_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="super-admin-container">
      
      <NavLink to="/" className="home-nav"><h1>Psyche Mega Therapy</h1></NavLink>

            <div>{!token? 
          <div className="landing-container">
            <div className="buttons-container">
              <NavLink to="/login-page" className="button login-button">
                Login
              </NavLink>
              <NavLink to="/#" className="button register-button">
                Register
              </NavLink>
            </div>
          </div>:
      
        <div className="dropdown">
            <button className="dropbtn fa fa-caret-down">{userInfo.first_name}</button>
                <div className="dropdown-content">
                    <NavLink to="/book-a-meeting">Book a Meeting</NavLink>
                    <NavLink to="/logout">Service Quotes</NavLink>
                    <NavLink to="/logout" className="button login-button">Logout</NavLink>
                </div>
                
        </div>
        }
        </div>



      
      {
      isupdated ? <span>{updateResponse}</span>
      : <div className="schedule-spin"></div>
      }
      <input
        type="text"
        placeholder="Search by name, email"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="search-input"
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Is-Admin</th>
            <th>Is-Super-Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.Email}</td>
              <td>{user.First_name}</td>
              <td>{user.Last_name}</td>
              <td>
                {user.is_admin}
                {selectedUser && selectedUser.Email === user.Email ? (
                  <select
                    name="Is-Admin"
                    onChange={handleInputChange}
                    disabled={showConfirmation}
                  >
                    <option value={user.is_admin}>{user.is_admin}</option>
                    {user.is_admin ==="True"? <option value="False">False</option>:
                    user.is_admin ==="False"? <option value="True">True</option>:""}
                    
                  </select>
                ) : (
                  user.status
                )}
              </td>

              <td>
                {user.is_super_admin}
                {selectedUser && selectedUser.Email === user.Email ? (
                  <select
                    name="Is-Admin"
                    onChange={handleInputChange}
                    disabled={showConfirmation}
                  >
                    <option value="admin">{user.is_super_admin}</option>
                    
                    {user.is_super_admin ==="True"? <option value="admin">False</option>:
                    user.is_super_admin ==="True"? <option value="admin">True</option>:""}
                    
                  </select>
                ) : (
                  user.status
                )}
              </td>
              <td>
                {selectedUser && selectedUser.id === user.id ? (
                  <div className="actions-btns">
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditClick(user, user.Email)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <div className="confirm-edit-popup">
          <div className="popup-content">
            <h3>Are you sure you want to edit?</h3>
            <button onClick={handleConfirmEdit}>Confirm</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminComponent;
