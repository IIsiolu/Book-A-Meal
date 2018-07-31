import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TopNav, MealCard, MenuItems } from '../common/';
import { addToMenu, fetchMeals, removeMeal, createMenu } from '../../actions';


class MenuPage extends Component {
  constructor(){
    super();
    this.state={
      date: '',
      isOpened: false,
    }
  }
  componentWillMount() {
    const { role } = this.props;
    if (role !== 'admin') {
      console.log('Going back because phemmy is a smart boy');
      this.props.history.push('/login');
    }
    // this.props.fetchMeals;
  }
  componentDidMount() {
    this.props.fetchMeals();
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  openMenu = () => (
    this.setState({
      isOpened: !this.state.isOpened
    })
  )
  noMeal = () => (
    <div>
      <h1>No meals Yet</h1> 
    </div>
  );
  onChange = (e) => ( 
    this.setState({
      date: { ...this.state.date, [e.target.name]: e.target.value }
    })
  )
  submit = () => {
    // console.log(this.state.date)
    this.props.createMenu(this.props.menus, this.state.date.date)
  }
  dateBtn = () => (
    <div>
      <input name='date' onChange={this.onChange} type="date" />
      <button onClick={() => this.submit()}>Create Menu</button>
    </div>
  )
  addedMenus = (meal) => {
    if(this.props.menus.length){
      let alreadyExist = this.props.menus.some((item) => meal.id === item.id);
      console.log(this.props.menus.some((item) => meal.id == item.id))
      return (
        alreadyExist? '' : this.props.addToMenu(meal)
      )
    }else{
      console.log(meal)
      return this.props.addToMenu(meal)
    }
    
  }

  render() {
    let {menus} = this.props
    const myMeals = this.props.fetchedMeals ? (this.props.allMeals.length ? 
      (this.props.allMeals.map((meal, key) => <MealCard addedMenus={this.addedMenus} meal={meal} key={key} /> ))
      :(this.noMeal())) : (this.noMeal());
    const myMenus = menus.length ? (menus.map((menu, key) => <MenuItems removeMeal={this.props.removeMeal} menu={menu} key={key} /> )) : (this.noMeal())
    return (
      <div>
        <TopNav />
        <div className = "main-container">
          <div className = "menupage-meals">
            {myMeals}
          </div>
          {
            this.props.menus.length? 
            <div className = "drawer-layout">
            <div className={this.state.isOpened ? "sidebar-container is-up": "sidebar-container is-down"}>
              <div onClick={this.openMenu} className="order-header">
                <h1><span className="meal-notific">{this.props.menus.length}</span> {this.props.menus.length>1 ? 'Meals' : 'Meal'} Selected</h1>
                {this.state.isOpened ? <i className="fa fa-chevron-down"></i>: <i className="fa fa-chevron-up"></i>}
              </div>
              
              <div className="set-menu-content">
                {myMenus}
                {this.props.menus.length ? this.dateBtn() : '' }
              </div>
            </div>
          </div> : ''
          }
          
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchedMeals: PropTypes.bool.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  addToMenu: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  removeMeal: PropTypes.func.isRequired
};

const mapstatetoProps = ({ user, fetchMeals, menu }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  allMeals: fetchMeals.meals,
  fetchedMeals: fetchMeals.success,
  menus: menu.menus
});
export default connect(mapstatetoProps, { addToMenu, fetchMeals, removeMeal, createMenu })(MenuPage);
