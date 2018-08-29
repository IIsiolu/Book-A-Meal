import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function MenuCard
 * @param {addMealToOrder} addMealToOrder - function to add meal to order
 * @param {meal} meal - meal object
 * @param {isOverlayOpened} isOverlayOpened - bool
 * @returns {JSX} jsx
 */
const MenuCard = ({ addMealToOrder, meal, isOverlayOpened, placedOrders }) =>
  (
    <div className="mealoption-container">
      <div className="cardt">
        <img className="food-img" src={meal.image} alt="my food" />
        <div
          onClick={() => isOverlayOpened(true, meal.id)}
          className="meal-overlay mous"
        >
          <h2 className="f-detail">Food Details</h2>
        </div>
      </div>
      <div className="meal-info">
        <h3 onClick={() => isOverlayOpened(true, meal.id)}>{meal.name}</h3>
        <hr />
      </div>
      <div className="buy">
        <span className="price"><sup>&#8358;</sup>{meal.price}</span>
        <button
          onClick={() => addMealToOrder(meal)}
          className="order-now mous capitalize"
        >{placedOrders.some((item) => meal.id === item.mealId) === true ?
           'added to cart' : 'add to cart'}
        </button>
      </div>
    </div>
  );

MenuCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
  isOverlayOpened: PropTypes.func.isRequired,
  placedOrders: PropTypes.object.isRequired,
};

export default MenuCard;
