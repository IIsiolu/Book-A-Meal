import jwt from 'jwt-decode';

const io = require('socket.io-client/dist/socket.io');

const user = localStorage.getItem('myUserT');

const decode = user && jwt(user);

export default (_this) => {
  const socket = io.connect('http://localhost:7000');
  socket.on('connect', () => {
    socket.emit('private room', decode.id, (cb) => {
    });
  });

  socket.on('meal ordered', (order) => {
    _this.props.orderHistory(_this.props.role);
    _this.showToast();
    
  });

  socket.on('order notification', (order) => {
    _this.showToast();
  });

  /**
   * @param {*} catererId
   * @param {*} order
   * @returns {void} void
   */
  function orderMeal(catererId, order) {
    socket.emit('private room', catererId, (cb) => {
      socket.emit('user order', { ...order, catererId });
    });
  }

  /**
   * @param {*} userId
   * @param {*} order
   * @returns {void}
   */
  function role() {
    return decode.role;
  }

  function modifyOrder(order) {
    socket.emit('private room', order.userId, (cb) => {
      socket.emit('order confirmation', order);
    });
  }

  return {
    orderMeal,
    modifyOrder,
    role,
  };
};
