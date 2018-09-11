import request from 'supertest';
import { expect } from 'chai';
import orderCredential from '../faker/orderFaker';
import server from '../../server/server';
import { User } from '../../server/models';
import {
  insertOrderSeed, mondayMeal, generateToken,
  insertOrderMeal, hashPassword,
} from '../seed/testSeeds';

let catererToken = '';
let userToken = '';

describe('Order endpoint', () => {
  before(async () => {
    const generatedUser = await User.create({
      firstname: 'godisgood',
      lastname: 'pizza',
      email: 'godisgood@gmail.com',
      role: 'user',
      password: hashPassword('password123'),
    });
    userToken = generateToken(generatedUser.id, 'user');
    const generateCaterer = await User.create({
      id: 20,
      firstname: 'andelacatering',
      lastname: 'pizza',
      email: 'andelacatering@gmail.com',
      role: 'caterer',
      password: hashPassword('password123'),
    });
    catererToken = generateToken(generateCaterer.id, 'caterer');

    await mondayMeal();
    await insertOrderSeed();
    await insertOrderMeal();
  });

  describe('Book-a-meal Order Test', () => {
    it('should load the api home page', (done) => {
      request(server)
        .get('/api/v1/')
        .expect(200)
        .end((err) => {
          if (err) {
            done(err);
          }
          done();
        });
    });

    it('should return error if token is not present when making order', (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(orderCredential.newOrder)
        .end((error, res) => {
          expect(403);
          expect(res.body.message).to.include('You need to sign up or login');
          if (error) done(error);
          done();
        });
    });

    it('should post a valid order and return a 201', (done) => {
      request(server)
        .post('/api/v1/orders')
        .set('Authorization', userToken)
        .send(orderCredential.bisi_order)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('should return a 404 status for a meal that does not exist', (done) => {
      request(server)
        .post('/api/v1/orders')
        .set('Authorization', userToken)
        .send(orderCredential.wrongMeal)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('That meal does not exist');
          if (error) done(error);
          done();
        });
    });

    it('returns a 200 if a meal update is successful ', (done) => {
      request(server)
        .put('/api/v1/orders/1')
        .set('Authorization', userToken)
        .send(orderCredential.bisi_meal_update)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('returns a 401 when a customer tries to modify a cancelled meal', (done) => {
      request(server)
        .put('/api/v1/orders/3')
        .set('Authorization', userToken)
        .send(orderCredential.bisi_meal_update)
        .end((error, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('order cannot be modified');
          if (error) done(error);
          done();
        });
    });

    it('should return a 400 when status is not a valid input', (done) => {
      request(server)
        .put('/api/v1/orders/2')
        .set('Authorization', userToken)
        .send(orderCredential.wrongStatus)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('cannot modify order, insert a valid input');
          if (error) done(error);
          done();
        });
    });

    it('given non-existing order id, it returns a 404 status', (done) => {
      request(server)
        .put('/api/v1/orders/500')
        .set('Authorization', userToken)
        .send(orderCredential.bisi_meal_update)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('No order exist with that Id');
          if (error) done(error);
          done();
        });
    });

    it('given a caterer, it returns caterer order history', (done) => {
      request(server)
        .get('/api/v1/orders/catererOrders')
        .set('Authorization', catererToken)
        .end((error, res) => {
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('given an authenticated user, it returns the user order history', (done) => {
      request(server)
        .get('/api/v1/orders/userOrder')
        .set('Authorization', userToken)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });
  });
});

