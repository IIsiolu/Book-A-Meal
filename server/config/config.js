module.exports =
{
  development: {
    username: 'adekunleoluwafemi',
    password: 'phemonick',
    database: 'book_a_meal',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    // logging: false,
  },
  test: {
    username: 'adekunleoluwafemi',
    password: 'phemonick',
    database: 'book_a_meal_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
