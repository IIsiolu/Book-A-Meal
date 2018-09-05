import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import mealDetails from '../faker/mealFaker';
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
  it('should return 403 when adding a meal without a token', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(mealDetails.newMeal)
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
      .send(mealDetails.newMeal)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });


  it('should return 403 if logged in user tries to add a meal', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(mealDetails.newMeal2)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });


  it('should return 400 if user is a caterer and MEAL name is empty', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(mealDetails.newMeal1)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal name');
        if (error) done(error);
        done();
      });
  });

  it('should return 400 if login is caterer and description is empty', (done) => {
    request(server)
      .post('/api/v1/meals')
      .send(mealDetails.newMeal3)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal description');
        if (error) done(error);
        done();
      });
  });

  it(
    `should save MEAL to database if login is 
    caterer and and body is filed correctly`,
    (done) => {
      request(server)
        .post('/api/v1/meals')
        .send(mealDetails.newMeal2)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    },
  );

  it(
    `should save MEAL to database if login is 
    caterer and and body is filed correctly`,
    (done) => {
      request(server)
        .post('/api/v1/meals')
        .send(mealDetails.newMeal4)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>', res.body);
          expect(201);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    },
  );

  it('should fail to return all the MEALS in database, if user is not a caterer', (done) => {
    request(server)
      .get('/api/v1/meals')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });

  it('should return all the MEALS in database, if user a caterer', (done) => {
    request(server)
      .get('/api/v1/meals')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.success);
        if (error) done(error);
        done();
      });
  });

  it('should return all the MEALS for a caterer', (done) => {
    request(server)
      .get('/api/v1/meals/caterer')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.meals);
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user is not a caterer when updating MEAL', (done) => {
    request(server)
      .put('/api/v1/meals/1')
      .send(mealDetails.newMeal6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });

  it('should return error if token is not present when updating a meal', (done) => {
    request(server)
      .put('/api/v1/meals/1')
      .send(mealDetails.newMeal6)
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
      .send(mealDetails.newMeal6)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(404);
        expect(res.body.message).to.include('No meal with that ID');
        if (error) done(error);
        done();
      });
  });
  
  it('should Update a MEAL when Token is present and user is a caterer', (done) => {
    request(server)
      .put('/api/v1/meals/1')
      .send(mealDetails.newMeal6)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('meal updated successfully');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user is not a caterer when deleting MEAL', (done) => {
    request(server)
      .delete('/api/v1/meals/1')
      .send(mealDetails.newMeal6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });

  it('should return error if caterer inputs invalid meal ID', (done) => {
    request(server)
      .delete('/api/v1/meals/xx')
      .set('Authorization', adminToken.token)
      .end((error) => {
        expect(404);
        if (error) done(error);
        done();
      });
  });

  it('should delete a meal when authenticated user is a caterer', (done) => {
    request(server)
      .delete('/api/v1/meals/2')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('meal successfully deleted!');
        if (error) done(error);
        done();
      });
  });
});

