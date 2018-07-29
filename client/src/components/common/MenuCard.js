import React from 'react';
import PropTypes from 'prop-types';

const MenuCard = ({ addMealToOrder, meal, isOverlayOpened }) => {
  console.log(meal);
  return(
    <div className="mealoption-container">
      <div className="cardt">
        <img className="food-img" src={meal.image} alt="my food" />
        <div className="meal-overlay">
          <h2 onClick={() => isOverlayOpened(true, meal.id)} className="f-detail">Food Details</h2>
        </div>
      </div>
      <div className="meal-info">
        <h3 onClick={() => isOverlayOpened(true, meal.id)}>{meal.name}</h3>
        <hr />
        {/* <p>{meal.description}</p> */}
      </div>
      <div className='buy'>
        <span className='price'><sup>$</sup>{meal.price}</span>
        <button onClick={() => addMealToOrder(meal)} className="order-now" > Add to Cart </button>
      </div>
    </div>
  )
}
MenuCard.propTypes = {
  meal: PropTypes.object.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
  isOverlayOpened: PropTypes.func.isRequired,
};
export default MenuCard;
