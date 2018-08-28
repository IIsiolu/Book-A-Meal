export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATEONLY,
    },
    mealId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mealId',
      set(arr) {
        arr = arr || [];
        this.setDataValue('mealId', arr.join(', '));
      },
      get() {
        const arr = this.getDataValue('mealId');
        if (arr) {
          return arr.split(',').map(key => parseInt(key, 10));
        }
        return [];
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
  Menu.associate = (models) => {
    Menu.belongsTo(models.Meal, {
      foreignKey: 'mealId',
    });
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    // associations can be defined here
  };
  return Menu;
};
