export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATE
    }
  }, {});
  Menu.associate = (models) => {
    Menu.belongsTo(models.Meal, {
      foreignKey: 'mealName'
    });
    // associations can be defined here
  };
  return Menu;
}; 