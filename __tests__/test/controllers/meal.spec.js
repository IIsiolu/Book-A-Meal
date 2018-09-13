import request from 'supertest';
import { expect } from 'chai';
import mealCredential from '../../faker/mealFaker';
import server from '../../../server/server';
import { User } from '../../../server/models';
import {
  insertMealSeed, invalidIdToken, generateToken,
  hashPassword,
} from '../../seed/testSeeds';

let adminToken = '';
describe('Meal endpoint', () => {
  before(async () => {
    const generatedUser = await User.create({
      firstname: 'domino',
      lastname: 'pizza',
      email: 'dominopizza@gmail.com',
      role: 'caterer',
      password: hashPassword('password123'),
    });
    adminToken = generateToken(generatedUser.id, 'caterer');
    await insertMealSeed();
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

    it('should post a valid meal and return a 201', (done) => {
      request(server)
        .post('/api/v1/meals')
        .set('Authorization', adminToken)
        .send(mealCredential.amala)
        .end((error, res) => {
          expect(res.status).to.equal(201);

          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('returns 409 if meal already exist', (done) => {
      request(server)
        .post('/api/v1/meals')
        .set('Authorization', adminToken)
        .send(mealCredential.amala)
        .end((error, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('Meal name already exist');
          if (error) done(error);
          done();
        });
    });

    it('returns 500 if meal has an invalid Id', (done) => {
      request(server)
        .post('/api/v1/meals')
        .set('Authorization', invalidIdToken)
        .send(mealCredential.wrongMeal)
        .end((error, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('failed to create meal');
          if (error) done(error);
          done();
        });
    });

    it('should get a caterer meal', (done) => {
      request(server)
        .get('/api/v1/meals/caterer')
        .set('Authorization', adminToken)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('given a caterer with invalid Id, it should return a 500', (done) => {
      request(server)
        .get('/api/v1/meals/caterer')
        .set('Authorization', invalidIdToken)
        .end((error, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('unexpected error');
          if (error) done(error);
          done();
        });
    });

    it('returns a 404 when a caterer tries to edit a meal not found', (done) => {
      request(server)
        .put('/api/v1/meals/60')
        .set('Authorization', adminToken)
        .send(mealCredential.caramel_edit)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('No meal with that ID');
          if (error) done(error);
          done();
        });
    });

    it('deletes a meal', (done) => {
      request(server)
        .delete('/api/v1/meals/300')
        .set('Authorization', adminToken)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.include('meal successfully deleted!');
          if (error) done(error);
          done();
        });
    });

    it('returns 404 if the meal is not found', (done) => {
      request(server)
        .delete('/api/v1/meals/4000')
        .set('Authorization', adminToken)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('There is no meal with that id!!');
          if (error) done(error);
          done();
        });
    });
  });
});

