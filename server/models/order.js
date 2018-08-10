export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input your quantity',
        },
        isInt: {
          args: true,
          msg: 'quantity must be a valid number'
        },
      },
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input meal Id',
        },
        isInt: {
          args: true,
          msg: 'mealId must be a valid number'
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
          msg: 'userId must be a valid number'
        },
      },
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
