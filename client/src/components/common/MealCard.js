import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';

const MealCard = ({ meal, addedMenus }) => (
  <div className="m-c-container">
      <div className="m-c-imgcontainer">
        <img src={meal.image} alt="my food" />
      </div>
      <div className="meal-input-info meal-card-style">
        <div className="meal-name-price">
          <h3>{meal.name}</h3>
          <h3>${meal.price}</h3>
        </div>
        <p>{meal.description}</p>
      </div>
      <div className='add-menu'>
        <button onClick={() => addedMenus(meal)} > Add To Menu </button>
      </div>
  </div>
);
MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addedMenus: PropTypes.func.isRequired,
};
export default MealCard;
