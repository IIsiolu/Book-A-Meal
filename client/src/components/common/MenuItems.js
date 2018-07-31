import React from 'react';

const MenuItems = ({ menu, removeMeal }) => (
  <div className='orderItem men-i-c'>
    <div className="order-mealInfo">
      <div className="order-img">
        <img src={menu.image} alt="menu item" />
      </div>
      <div className='order-img'>{menu.name}</div>
      <i onClick={() => removeMeal(menu.id) } className="fa fa-trash delete-orItem mous"></i>
      {/* <button >remove</button> */}
    </div>
  </div>
);
export default MenuItems;

