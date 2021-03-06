import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description react functional component
 * @function MealCard
 * @param {object} menu
 * @param {object} removeMeal
 * @returns {JSX} jsx
 */
const MenuItems = ({ menu, removeMeal }) => (
  <div className="orderItem men-i-c">
    <div className="order-mealInfo">
      <div className="order-img">
        <img src={menu.image} alt="menu item" />
      </div>
      <div className="order-img">{menu.name}</div>
      <i
        onClick={() => removeMeal(menu.id)}
        className="fa fa-trash delete-orItem mous remove-menu"
      />
    </div>
  </div>
);

MenuItems.propTypes = {
  removeMeal: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

export default MenuItems;
