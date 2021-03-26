import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";




const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }


  return (
      <div className="col-md-12">
          <div className="card card-container">
              <div>

                  <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                          type="text"
                          className="form-control"
                          name="username2"
                          defaultValue={currentUser.username}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                          type="text"
                          className="form-control"
                          name="email2"
                          defaultValue={currentUser.email}
                      />
                  </div>
                  <strong>Token Key:</strong>
                  <p>
                      {currentUser.token?.substring(0, 20)} ...{" "}
                      {currentUser.token?.substr(currentUser.token?.length - 20)}
                  </p>
                  <strong>Authorities:</strong>
                  <ul>
                      {currentUser.roles}
                      {/*Array.prototype.slice.call(currentUser?.roles).map((role, index) => <li key={index}>{role}</li>)}*/}
                  </ul>

              </div>
          </div>
      </div>
   );
};


export default Profile;
