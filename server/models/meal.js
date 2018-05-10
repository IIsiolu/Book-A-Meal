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
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input meal price',
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Meal.associate = (models) => {
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId'
    });
    Meal.hasMany(models.Menu, {
      foreignKey: 'mealId'
    });
    // associations can be defined here
  };
  return Meal;
};
