import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { TopNav, MealCard, MenuItems } from '../common/';
import InlineError from '../messages/inlineError';
import { addToMenu, fetchMeals, removeMeal, createMenu,
   logout, changeMErrorState, changeMSuccessState,
    clearMenu } from '../../actions';

/**
 * Menu Page
 * @class MenuPage
 * @constructor
 */
class MenuPage extends Component {
  constructor(){
    super();
    this.state={
      date: '',
      isOpened: false,
    }
  }

  /**
   * React life cycle
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'caterer' || role === 'super-admin')) {
      this.props.history.push('/');
    }
  }

  /**
   * React life cycle to fetch meal on component mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.fetchMeals(this.props.role);
  }
  
  /**
   * React life cycle
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    if(this.props.success) {
      this.props.changeMSuccessState(false);
      this.openMenuSlider();
      this.props.clearMenu();
    }
  }

  // opens menu
  openMenuSlider = () => (
    this.setState({
      isOpened: !this.state.isOpened
    })
  )

  // display no menu if meal is empty
  renderNoMeal = () => (
    <div className="no-meal">
      <h1>No meals Yet</h1> 
    </div>
  );

  // event change for date
  onChange = (event) => ( 
    this.setState({
      date: { ...this.state.date, [event.target.name]: event.target.value }
    })
  )

  // function to create Menu for today
  submit = () => {
    this.props.createMenu(this.props.menus, this.state.date.date)
  }

  // sweet alert
  // alert = () => (
  //   swal("Menu Created", "Your menu has been created successfully!", "success")
  // )

  // ate button
  dateBtn = () => (
    <div className="date-btn">
      <div className="input-date">
        <h4>Menu Date</h4>
        <input name='date' onChange={this.onChange} type="date" />
      </div>
      
      <button className="create-m-btn" 
      onClick={() => this.submit()}>Create Menu</button>
    </div>
  )

  // add menu to menu slider
  addedMenus = (meal) => {
    if(this.props.menus.length){
      let alreadyExist = this.props.menus.some((item) => meal.id === item.id);
      return (
        alreadyExist? '' : this.props.addToMenu(meal)
      )
    }else{
      return this.props.addToMenu(meal)
    }
  }

  /**
   * Selected menu for the day
   * @function selectedMenu
   * @returns {jsx} jsx
   */
  selectedMenu = () => this.props.menus.length ?
   (this.props.menus.map((menu, key) => 
   <MenuItems removeMeal={this.props.removeMeal} 
   menu={menu} key={key} /> )) : (this.renderNoMeal())

  //  menu slider
  menuSlider = () =>
    (
    <div className = "drawer-layout">
      <div className={this.state.isOpened ?
         "sidebar-container is-up": "sidebar-container is-down"}>
        <div onClick={this.openMenuSlider} className="order-header">
          <h1><span className="meal-notific">{this.props.menus.length}</span>
           {this.props.menus.length>1 ? 'Meals' : 'Meal'} Selected</h1>
          {this.state.isOpened ? <i className="fa fa-chevron-down"></i> :
           <i className="fa fa-chevron-up"></i>}
        </div>
        <div className="set-menu-content">
          {this.selectedMenu()}
          {this.props.menus.length ? this.dateBtn() : '' }
          {this.props.createdMenuError && <div className="center-text">
              <InlineError text={this.props.createdMenuError} />
            </div>}
        </div>
      </div>
    </div>
    )

  //  handles pagination click events
  handlePageChange = ({selected}) => {
    const page = selected + 1;
    localStorage.setItem('currentMenuPage', page);
    const currentPage = localStorage.getItem('currentMenuPage');
    this.props.fetchMeals(this.props.role, currentPage);
  }

  /**
   * @description renders pagination button
   * @method renderPagination
   * @returns {JSX} jsx
   */
  renderPagination = () => (
    <ReactPaginate 
      previousLabel={<i className="fa fa-chevron-left" />}
      nextLabel={<i className="fa fa-chevron-right" />}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      pageCount={this.props.pageCount}
      initialPage={this.props.page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageChange}
      disableInitialCallback
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  )

  // meal cards
  mealCards = () => this.props.allMeals.length ? (this.props.allMeals.length ? 
    (this.props.allMeals.map((meal, key) =>
     <MealCard addedMenus={this.addedMenus} menus={this.props.menus} meal={meal} key={key} /> ))
    :(this.renderNoMeal())) : (this.renderNoMeal());

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <div className = "main-container">
          <div className = "menupage-meals">
            {this.mealCards()}
          </div>
          {this.props.allMeals.length && this.renderPagination()}
          {this.props.menus.length>0 && this.menuSlider()}
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // fetchedMeals: PropTypes.bool.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  addToMenu: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  removeMeal: PropTypes.func.isRequired
};

const mapstatetoProps = ({ user, meals, menu }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  allMeals: meals.meals,
  menus: menu.menus,
  isError: menu.isError,
  success: menu.created,
  createdMenuError: menu.createMenuError,
  page: meals.pagination.page,
  pageCount: meals.pagination.pageCount,
  pageSize: meals.pagination.pageSize,
  totalCount: meals.pagination.totalCount,
});

export default connect(mapstatetoProps, { addToMenu, fetchMeals,
   removeMeal, createMenu, logout, changeMErrorState,
    changeMSuccessState, clearMenu })(MenuPage);
