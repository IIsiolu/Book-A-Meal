import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description react functional component
 * @function MealCard
 * @param {object} meal
 * @param {object} addedMenus
 * @returns {JSX} jsx
 */
const MealCard = ({ meal, addedMenus, menus }) => (
  <div className="m-c-container">
    <div className="m-c-imgcontainer">
      <img src={meal.image} alt="my food" />
    </div>
    <div className="meal-input-info meal-card-style">
      <div className="meal-name-price">
        <h3>{meal.name}</h3>
        <h3>&#8358;{meal.price}</h3>
      </div>
      <p>{meal.description}</p>
    </div>
    <div className="add-menu">
      <button className="capitalize" onClick={() => addedMenus(meal)} > {menus.some((item) => meal.id === item.id) === true ? 'added to menu' : 'add to menu'}  </button>
    </div>
  </div>
);

MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addedMenus: PropTypes.func.isRequired,
};

export default MealCard;
