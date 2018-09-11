import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'password must be at least 6 characters',
        },
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        notEmpty: {
          args: true,
          msg: 'input your quantity',
        },
        isIn: {
          args: [['caterer', 'user', 'super-admin']],
          msg: "Must be a 'caterer' or 'user'",
        },
      },
    },
  }, {
  });
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  };
  return User;
};
