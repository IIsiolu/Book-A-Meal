import request from 'supertest';
import { expect } from 'chai';
import userCredential from '../../faker/userfaker';
import orderCredential from '../../faker/orderFaker';
import menuCredentials from '../../faker/menuFaker';
import server from '../../../server/server';
import { kunleToken, donaldKitchenToken } from '../../seed/testSeeds';

describe('Middleware Test Suite', () => {
  it('should return error if email is invalid', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredential.invalidEmail)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errorMessage[0]).to.include('Your email address is' +
        ' invalid. Please enter a valid address');
        if (error) done(error);
        done();
      });
  });

  it(
    'should return error if meal Id is invalid, when updating an order',
    (done) => {
      request(server)
        .put('/api/v1/orders/x')
        .set('Authorization', kunleToken)
        .send(orderCredential.inValidMealId)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.include('mealId must be a number');
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return error if order quantity is invalid, when updating an order',
    (done) => {
      request(server)
        .put('/api/v1/orders/1')
        .set('Authorization', kunleToken)
        .send(orderCredential.inValidMealId)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.include('Your order quantity is invalid,'
          +
        ' quantity must be a number');
          if (error) done(error);
          done();
        });
    },
  );

  it('should return error if meal order is not an array', (done) => {
    request(server)
      .post('/api/v1/orders')
      .set('Authorization', kunleToken)
      .send(orderCredential.invalidOrder)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('meals must be an array of orders');
        if (error) done(error);
        done();
      });
  });

  it(`should return error if meal Id and quantity is invalid,
   when requesting for an order`, (done) => {
    request(server)
      .post('/api/v1/orders')
      .set('Authorization', kunleToken)
      .send(orderCredential.nikeOrder)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('Meal Id and quantity must be' +
        ' an Integer');
        if (error) done(error);
        done();
      });
  });

  it('should return error if an order is empty', (done) => {
    request(server)
      .post('/api/v1/orders')
      .set('Authorization', kunleToken)
      .send(orderCredential.emptyOrder)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('Order input Errors');
        expect(res.body.errorMessage[0]).to.include('input meal Orders');
        if (error) done(error);
        done();
      });
  });

  it('should throw an error with invalid menu date', (done) => {
    request(server)
      .get('/api/v1/menu/?date=20-19-2018')
      .set('Authorization', kunleToken)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.include('invalid date input');
        if (error) done(error);
        done();
      });
  });

  it('should return a 400 status message if date input is not valid when' +
  ' creating a menu', (done) => {
    request(server)
      .post('/api/v1/menu')
      .set('Authorization', donaldKitchenToken)
      .send(menuCredentials.invalidMenuDate)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.include('invalid date input');
        if (error) done(error);
        done();
      });
  });

  it(
    'should return a 400 status message if meal is empty when creating a menu',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .set('Authorization', donaldKitchenToken)
        .send(menuCredentials.septemberMenu)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('meal cannot be empty');
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return a 400 status message if meal Id is not an array of number',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .set('Authorization', donaldKitchenToken)
        .send(menuCredentials.invalidMealId)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('mealId must be an array' +
          ' of number');
          if (error) done(error);
          done();
        });
    },
  );
});

