import React from 'react';
import { Link } from 'react-router-dom';
// import { FoodForkDrinkIcon } from 'mdi-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Footer } from '../common/';
import food1 from '../../static/images/food1.jpg';
import food2 from '../../static/images/food2.jpg';
import food3 from '../../static/images/food3.jpg';
import food4 from '../../static/images/food4.jpg';

const LandingPage = ({ isAuthenticated, logout }) => (
    <div className="container">
            <div className="top-nav landing-nav">
                <h2 className="logo">Book-A-Meal</h2>

                {
                  isAuthenticated ? (
                    <div className="right-nav">
                      <Link className="nav-text" to="/home">Menu</Link>
                      {/* <Link className="nav-text" to="/signup">Logout</Link> */}
                      <h5 className="nav-text-h" onClick={logout}>Log-out</h5>
                    </div>
                  ) :
                  (
                  <div className="right-nav">
                      <Link className="nav-text" to="/login">Login</Link>
                      <Link className="nav-text" to="/signup">signup</Link>
                  </div>
                  )
                }
            </div>
            <div className="coverContainer">

              <div className="top-content">
                <div className="top-text">
                  <h1 className="h-title">
                    <span>W</span>
                    <span>e</span>
                    <span>l</span>
                    <span>c</span>
                    <span>o</span>
                    <span>m</span>
                    <span>e</span>
                  </h1>
                  <h1>COOK WHAT ?</h1>
                  <p>why not order a home made meal</p>
                </div>
              </div>

            </div>
            <div className="welcome">
              <div className="welcome-content">
                <h1 className="best">WE ARE THE BEST!</h1>
                <p>We exclusively use sun ripened whole grains to provide you with a source of power, stamina and health! Spoil yourself with our breads natural flavor! We use only the finest quality ingredients providing your body with important fiber and nutrients.
                   For people who suffer from allergies we offer a delicious range of wheat and yeast free products.</p>
              </div>
            </div>
            {/* <hr /> */}
            <div className="popular">
              <h1 className="titles">What Customers Love</h1>
              <div className="ourFoods">
                <div className="food-E">
                  <Link to="/">
                    <img className="foodies" src={food1} alt="foodies img" />
                    <div className="food-E-overlay"></div>
                    <div className="foodies-info">
                      <h1>Dubesi</h1>
                      <p>Enjoy your food. This is the part where you get to eat your food while </p>
                      <h3>Mondays</h3>
                    </div>
                  </Link>
                </div>
                <div className="food-E">
                  <Link to="/">
                    <img className="foodies" src={food2} alt="foodies img" />
                    <div className="food-E-overlay"></div>
                    <div className="foodies-info">
                      <h1>Wheat</h1>
                      <p>Enjoy your food. This is the part where you get to eat your food while </p>
                      <h3>Wednessday</h3>
                    </div>
                  </Link>
                </div>
                <div className="food-E">
                  <Link to="/">
                    <img className="foodies" src={food3} alt="foodies img" />
                    <div className="food-E-overlay"></div>
                    <div className="foodies-info">
                      <h1>Eba</h1>
                      <p>Enjoy your food. This is the part where you get to eat your food while </p>
                      <h3>Fridays</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="offer">
              <h1 className="titles">Booking a meal is easy as 1, 2, 3 ...</h1>
              <p>Enjoy your food prepared by professional cooks specially for you.</p>
              <div className="services">
                <div className="service1 service-card">
                  <h3><i className="fa fa-calendar"></i> Menu</h3>
                  <p>We have delicious sets of foods prepared by professional cooks,
                    For each day of the week</p>
                </div>
                <div className="service2 service-card">
                  <h3><i className="fa fa-check-square"></i> Select</h3>
                  <p>Take a good look at the menu, click whatever you want to eat and
                    drink, and head to the checkout.</p>
                </div>
                <div className="service3 service-card">
                <h3><i className="fa fa-grin-beam-sweat"></i> Enjoy</h3>
                  <p>Enjoy your food. This is the part where you get to eat your food
                     while basking in the warm glow of time not spent cooking.</p>
                </div>
              </div>
              <Link className="menu-btn" to='/home'>Order Now </Link>
            </div>
            <div className="testimonials">
              <div className="testimonials-content">
                <h2>Testimonials</h2>
                <div className="testimonial-collection">
                  <div className="test-item">
                    <p>“ Ceplicaboserde miuas nerafae kertyerauas vitaesa eniptaiad esertyatya
                    nemo volernatur aut oditaut. Suspendisse potenti. Sed fermentum, libero eget euismod
                    convallis, justo lectus egestas dui, eu tempor lectus risus a dolor. Suspendisse tempor quam
                    sapien molestie nec...” </p>
                    <h4>Oluwa Mark,</h4>
                    <h4>Client</h4>
                  </div>
                  <div className="test-item">
                    <p>“ Ceplicaboserde miuas nerafae kertyerauas vitaesa eniptaiad esertyatya
                    nemo volernatur aut oditaut. Suspendisse potenti. Sed fermentum, libero eget euismod
                    convallis, justo lectus egestas dui, eu tempor lectus risus a dolor. Suspendisse tempor quam
                    sapien molestie nec...” </p>
                    <h4>Oluwa Mark,</h4>
                    <h4>Client</h4>
                  </div>
                  <div className="test-item">
                    <p>“ Ceplicaboserde miuas nerafae kertyerauas vitaesa eniptaiad esertyatya
                    nemo volernatur aut oditaut. Suspendisse potenti. Sed fermentum, libero eget euismod
                    convallis, justo lectus egestas dui, eu tempor lectus risus a dolor. Suspendisse tempor quam
                    sapien molestie nec...” </p>
                    <h4>Oluwa Mark,</h4>
                    <h4>Client</h4>
                  </div>

                </div>

              </div>
            </div>
            <div className="intro">
              <div className="intro-content">
                <div className="intro-best">
                  <img className="intro-img" src={food4} alt="foodies img" />
                  <div className="intro-info">
                    <h1>How we choose a menu</h1>
                    <h5>Donec euismod imperdiet feugiat. Vivamus non interdum eros. Cum sociis natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Morbi tristique ut lacus et scelerisque.</h5>
                    <p>Suspendisse potenti. Sed fermentum, libero eget euismod convallis, justo lectus egestas dui,
                      eu tempor lectus risus a dolor. Suspendisse tempor quam purus, sit amet feugiat sapien molestie
                      nec. Sed aliquam, justo ut pharetra dapibus, leo risus iaculis nulla, ut sagittis nunc diam lobortis metus. Nulla pulvinar odio vitae nisl dignissim, id rutrum lorem molestie. Maecenas euismod hendrerit risus, ut congue arcu tincidunt sed. Nullam at ipsum vel ante interdum lobortis. Etiam quis ultricies enim, in venenatis sapien. Phasellus interdum
                      consectetur enim, venenatis eleifend urna sed nulla id magna placerat hendrerit.</p>
                      <Link className="menu-btn" to='/home'>Menu For Today </Link>
                  </div>
                </div>

              </div>
            </div>
            <Footer />
    </div>
);
const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(LandingPage);
