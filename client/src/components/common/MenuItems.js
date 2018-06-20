import React from 'react';

const MenuItems = ({ menu, removeMeal }) => (
  <div className='menuItems'>
    <div>{menu.name}</div>
    <button onClick={() => removeMeal(menu.id) }>remove</button>
  </div>
);
export default MenuItems;
 