export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input meal name',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input meal price',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
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
  }, { paranoid: true });
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Order, {
      through: 'OrderMeal',
      foreignKey: 'mealId',
      otherKey: 'orderId',
      onDelete: 'CASCADE',
    });
    Meal.hasMany(models.Menu, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  };
  return Meal;
};
