

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    mealName: {
      type: Sequelize.STRING,
      references: {
        model: 'Meals',
        key: 'name'
      },
      userId: {
        type: Sequelize.INTEGER,
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Orders')
};
