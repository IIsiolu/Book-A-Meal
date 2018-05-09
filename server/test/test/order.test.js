import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import testData from '../faker/orderFaker';
import { validToken, adminToken } from '../../test/test/user.test';

const { expect } = chai;

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
      .send(testData.newOrder)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });


  it('should return error if token is not vaild when making ORDER', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('Authentication failed');
        if (error) done(error);
        done();
      });
  });

  it('should return 403 if login is User and mealId is empty', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder3)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal Id');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user quantity is empty', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder4)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal quantity');
        if (error) done(error);
        done();
      });
  });

  it(
    'should save Order to database if login is ' +
      'user and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder5)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.result)
            .to.include('success');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'should return 201 if login is ' +
    'user and body is filled correctly',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder5)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.result)
            .to.include('success');
          if (error) done(error);
          done();
        });
    }
  );
  it('should fail to return all the ORDER in database, if user is not valid', (done) => {
    request(server)
      .get('/api/v1/orders')
      .set('Authorization', 'fjhFJfvuiuivwov')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });

  it('should return all the ORDERs in database, if user is an admin', (done) => {
    request(server)
      .get('/api/v1/orders')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.result).to.include('success');
        if (error) done(error);
        done();
      });
  });

  it('should return 403 if no token', (done) => {
    request(server)
      .get('/api/v1/orders/')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });
  it('should return error if ORDER route is incorrect', (done) => {
    request(server)
      .get('/api/v1/order')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(404);
        if (error) done(error);
        done();
      });
  });
//   it('should Update a MEAL when Token is correct', (done) => {
//     request(server)
//       .put('/api/v1/meals/2')
//       .send(testData.newMeal6)
//       .set('Authorization', adminToken.token)
//       .end((error, res) => {
//         expect(404);
//         expect(res.body.result).to.include('updated');
//         if (error) done(error);
//         done();
//       });
//   });


//   it('return error if login user is not an admin when deleting MEAL', (done) => {
//     request(server)
//       .delete('/api/v1/meals/1')
//       .send(testData.newMeal6)
//       .set('Authorization', validToken.token)
//       .end((error, res) => {
//         expect(401);
//         expect(res.body.message).to.include('You have to be an admin');
//         if (error) done(error);
//         done();
//       });
//   });
//   it('return error if admin inputs invalid id for meal when deleting', (done) => {
//     request(server)
//       .delete('/api/v1/meals/xx')
//       .set('Authorization', adminToken.token)
//       .end((error, res) => {
//         expect(404);
//         if (error) done(error);
//         done();
//       });
//   });
//   it('Authenticated user should delete a meal', (done) => {
//     request(server)
//       .delete('/api/v1/meals/1')
//       .set('Authorization', adminToken.token)
//       .end((error, res) => {
//         expect(200);
//         expect(res.body.message).to.include('meal successfully deleted!');
//         if (error) done(error);
//         done();
//       });
//   });

});

