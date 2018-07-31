import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup, signupState, logout } from '../../actions';
import { TopNav } from '../common'

class Profile extends Component {

  componentDidUpdate(){
    if(this.props.isSuccess === true) {
      swal("Admin Created",
       'Admin has been created successfully' , "success");
      this.props.signupState(false);
    }
  }

  submit = (data) => (
    this.props.signup(data, this.props.history)
   )

  render() {
    return (
      <div className='admin-form-container'>
        <TopNav logout={this.props.logout} />
        <div className="form-con-bg">
          <div className="form-nav">
            <Link className="main-m-nav" to="/adminSignup">Create Caterer</Link>
            <Link className="" to="/menu">Set Menu</Link>
            <Link className="" to="/meal">Meal Options</Link>
            <Link className="" to="/">Dashboard</Link>
          </div>
          <div className="form-info-con">
            <div className="form-info-title">
              <h2>Edit profile</h2>
            </div>
            <div className="form-info-body">
              
            
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  error: state.user.error,
  loading: state.user.loading,
  isSuccess: state.user.signedUp,
  role: state.user.user.role
});
// mapstate for states, dispatch functions
export default connect(mapStateToProps, { signup,
   signupState, logout })(Profile);