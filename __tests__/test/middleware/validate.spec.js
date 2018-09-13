import request from 'supertest';
import { expect } from 'chai';
import userCredential from '../../faker/userfaker';
import orderCredential from '../../faker/orderFaker';
import server from '../../../server/server';
import { kunleToken } from '../../seed/testSeeds';

describe('Middleware Test Suite', () => {

  it('should return error if email is invalid', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredential.invalidEmail)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errorMessage[0]).to.include('Your email address is invalid. Please enter a valid address');
        if (error) done(error);
        done();
      });
  });
  
  it('should return error if meal Id is invalid, when updating an order', (done) => {
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
  })

  it('should return error if order quantity is invalid, when updating an order', (done) => {
    request(server)
      .put('/api/v1/orders/1')
      .set('Authorization', kunleToken)
      .send(orderCredential.inValidMealId)
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.include('Your order quantity is invalid, quantity must be a number');
        if (error) done(error);
        done();
      });
  })
})