import express from 'express';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import { userRouter, mealRouter, menuRouter, orderRouter } from './routes';

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

// Instance of the express app
const app = express();
export default app;
// Request logger
app.use(morgan('dev'));

// Parsing body data
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/api/v1', userRouter);
app.use('/api/v1', mealRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Book a Meal',
  });
});
app.get('*', (req, res) => {
  res.status(404).send({
    message: 'That url does not exist on this server',
  });
});
app.post('*', (req, res) => {
  res.status(404).send({
    message: 'That url does not exist on this server',
  });
});
app.delete('*', (req, res) => {
  res.status(404).send({
    message: 'That url does not exist on this server',
  });
});
app.put('*', (req, res) => {
  res.status(404).send({
    message: 'That url does not exist on this server',
  });
});

const port = process.env.PORT || 7000;

app.listen(port);

console.log(`Find me on http://localhost:${port}`);
