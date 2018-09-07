export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input delivery address',
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input User Id',
        },
        isInt: {
          args: true,
          msg: 'userId must be a valid number',
        },
      },
    },
  }, {});
  Order.associate = (models) => {
    Order.belongsToMany(models.Meal, {
      through: 'OrderMeal', foreignKey: 'orderId', otherKey: 'mealId',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    // associations can be defined here
  };
  return Order;
};
