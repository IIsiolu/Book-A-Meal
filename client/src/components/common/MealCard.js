import React from 'react';
import PropTypes from 'prop-types';

const MealCard = ({ meal, addedMenus }) => (
  <div className="mealoption-container">
      <img className="food-img" src={meal.image} alt="my food" />
      <div className="meal-info">
        <h3>{meal.name} (#{meal.price})</h3>
        <p>{meal.description}</p>
      </div>
      <div>
        <button onClick={() => addedMenus(meal)} className="order-now" > <i id="f-awe" className="far fa-plus fa-2x"></i></button>
      </div>
    </div>
);
MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addedMenus: PropTypes.func.isRequired,
};
export default MealCard;
