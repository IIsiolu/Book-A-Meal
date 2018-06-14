import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../static/images/gbeans.jpg';

const LandingPage = () => (
    <div className="container">
            <div className="top-nav">
                <h2 className="logo">Book-A-Meal</h2>
                <div className="right-nav">
                    <h2 className="nav-text"> <a href="#">About Us</a></h2>
                    <h2 className="nav-text"> <Link to="/login">Login</Link></h2>
                    <h2 className="nav-text"> <Link to="/signup">SignUp</Link></h2>
                </div>
            </div>
            <div className="coverContainer">
                <img className="coverImg" src={ img } />
            </div>
            <div className="content content-index">
                <div className="info">
                    <div className="top-content">
                        <h1 className="top-content-header">Booking a meal is what we love</h1>
                        <p className="top-content-header">___________________________</p>
                        <p className="topP"> Donec elementum erat libero, ultricies molestie justo hendrerit vel. Nullam venenatis orci sit amet volutpat porttitor,</p>                    </div>
                    <div className="bottom-content">
                        <Link to="/login"><button className="loginBtn"> Log In</button></Link>
                        <Link to="/signup"><button className="loginBtn"> Sign Up</button></Link>
                    </div>
                </div>
                <div className="later">
                    <a href="home.html">i will create an account later</a>
                </div>
            </div>
        </div>
);
export default LandingPage;
