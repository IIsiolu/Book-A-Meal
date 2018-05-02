export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Meal.associate = (models) => {
    Meal.hasMany(models.Order, {
      foreignKey: 'mealName'
    });
    Meal.hasMany(models.Menu, {
      foreignKey: 'mealName'
    });
    // associations can be defined here
  };
  return Meal;
};