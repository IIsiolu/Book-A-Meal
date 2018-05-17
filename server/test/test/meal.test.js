import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import testData from '../faker/mealFaker';
import { validToken, adminToken } from '../../test/test/user.test';

const { expect } = chai;

describe('Book-a-meal MEAL Test', () => {
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
  it('should return an error if the token is not present when adding a meal', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(testData.newMeal)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });


  it('should return error if token is not vaild when adding new MEAL', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(testData.newMeal)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });


  it('should return error if login user is not an admin when adding new MEAL', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(testData.newMeal2)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });


  it('should return error if login is admin and MEAL name is empty', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(testData.newMeal1)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('input meal name');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login is admin and description is empty', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(testData.newMeal3)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('input meal description');
        if (error) done(error);
        done();
      });
  });

  it(
    'should save MEAL to database if login is ' +
      'admin and and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/meals')
        .send(testData.newMeal4)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.result)
            .to.include('success');
          if (error) done(error);
          done();
        });
    },
  );

  it(
    `should save MEAL5 to database if login is 
    admin and and body is filed correctly`,
    (done) => {
      request(server)
        .post('/api/v1/meals')
        .send(testData.newMeal5)
        .set('Authorization', adminToken.token)
        .end((error, res) => { 
          expect(201);
          expect(res.body.result)
            .to.include('success');
          if (error) done(error);
          done();
        });
    },
  );
  it('should fail to return all the MEALS in database, if user is not an admin', (done) => {
    request(server)
      .get('/api/v1/meals')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });

  it('should return all the MEALS in database, if user an admin', (done) => {
    request(server)
      .get('/api/v1/meals')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.result).to.include('success');
        if (error) done(error);
        done();
      });
  });


  it('should return error if login user is not an admin when updating MEAL', (done) => {
    request(server)
      .put('/api/v1/meals/1')
      .send(testData.newMeal6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(401);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });
  it('should return error if no token', (done) => {
    request(server)
      .put('/api/v1/meals/1')
      .send(testData.newMeal6)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });
  it('should return error if MEAL ID is incorrect', (done) => {
    request(server)
      .put('/api/v1/meals/xx')
      .send(testData.newMeal6)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(404);
        expect(res.body.message).to.include('No meal with that ID');
        if (error) done(error);
        done();
      });
  });
  it('should should Update a MEAL when Token is correct', (done) => {
    request(server)
      .put('/api/v1/meals/2')
      .send(testData.newMeal6)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(404);
        expect(res.body.result).to.include('updated');
        if (error) done(error);
        done();
      });
  });


  it('should return error if login user is not an admin when deleting MEAL', (done) => {
    request(server)
      .delete('/api/v1/meals/1')
      .send(testData.newMeal6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(401);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });
  it('should return error if admin inputs invalid id for meal when deleting', (done) => {
    request(server)
      .delete('/api/v1/meals/xx')
      .set('Authorization', adminToken.token)
      .end((error) => {
        expect(404);
        if (error) done(error);
        done();
      });
  });
  it('should Authenticated user should delete a meal', (done) => {
    request(server)
      .delete('/api/v1/meals/1')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('meal successfully deleted!');
        if (error) done(error);
        done();
      });
  });
});

