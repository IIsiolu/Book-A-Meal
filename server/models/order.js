export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId'
    });
    Order.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    // associations can be defined here
  };
  return Order;
};