import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealOptions extends Component {
  edit = (bool, id) => (
    this.props.edit(bool, id)
  )
  render() {
    const data = this.props.meal;
    return (
      <div className="mealoption-container">
        <img className="food-img" src={data.image} alt="my food" />
        <div className="meal-info">
          <h3>{data.name} (#{data.price})</h3>
          <p>{data.description}</p>
        </div>
        <div>
          <button onClick={() => this.props.isModalOpened(true, data.id)} id="myBtn2" className="order-now" > <i id="f-awe" className="fa fa-edit fa-2x"></i></button>
          <button onClick={() => this.props.deleteMeal(data.id)} className="order-now"> <i id="f-awe" className="fa fa-trash fa-2x"></i></button>
        </div>
      </div>
    );
  }
}

MealOptions.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default MealOptions;
