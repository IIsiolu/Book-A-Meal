import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignupForm } from '../forms';
import { signup, signupState, logout } from '../../actions';
import { TopNav } from '../common'

class AdminSignUp extends Component {

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
            <Link className="main-m-nav" to="/adminSignup">Create Admin</Link>
            <Link className="" to="/menu">Set Menu</Link>
            <Link className="" to="/meal">Meal Options</Link>
            <Link className="" to="/">Dashboard</Link>
          </div>
          <div className="form-info-con">
            <div className="form-info-title">
              <h2>Create A Caterer</h2>
            </div>
            <div className="form-info-body">
              <h1 className="form-info-h">Required Fields</h1>
              <SignupForm submit = {this.submit}
               role={this.props.role} {...this.props} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

AdminSignUp.propTypes = {
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
   signupState, logout })(AdminSignUp);
