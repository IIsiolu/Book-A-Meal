import React from 'react';
import PropTypes from 'prop-types';

const MenuCard = ({ meal, addMealToOrder }) => (
  <div className="mealoption-container">
      <img className="food-img" src={meal.image} alt="my food" />
      <div className="meal-info">
        <h3>{meal.name} (#{meal.price})</h3>
        <p>{meal.description}</p>
      </div>
      <div>
        <button onClick={() => addMealToOrder(meal)} className="order-now" > <i id="f-awe" className="far fa-plus fa-2x"></i></button>
      </div>
    </div>
);
MenuCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
};
export default MenuCard;
