

module.exports = (sequelize, DataTypes) => {
  const OrderMeal = sequelize.define('OrderMeal', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
          msg: 'mealId must be a valid number',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        notEmpty: {
          args: true,
          msg: 'input meal status',
        },
        isIn: {
          args: [['pending', 'cancelled', 'delivered']],
          msg: "status must be 'pending', 'cancelled', 'delivered'",
        },
      },
    },
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
          msg: 'quantity must be a valid number',
        },
      },
    },

  }, {});
  OrderMeal.associate = function (models) {
    // associations can be defined here
  };
  return OrderMeal;
};
