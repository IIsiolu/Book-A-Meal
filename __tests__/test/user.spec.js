import request from 'supertest';
import { expect } from 'chai';
import userCredential from '../faker/userfaker';
import server from '../../server/server';
import { sequelize, Meal, User, Order, OrderMeal } from '../../server/models';
import {
  insertMealSeed, invalidIdToken,
  insertTestUser, donaldKitchenToken, yummyKitchenToken,
} from '../seed/testSeeds';

const donaldKitchen = donaldKitchenToken;

describe('User endpoint', () => {
  before(async () => {
    insertTestUser();
  });

  describe('Book-a-meal uUser Test', () => {
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

    it('should return a 201 when a user is created', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(userCredential.johndo)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.include('user created successfully');
          if (error) done(error);
          done();
        });
    });

    it('returns 409 if email already exist', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(userCredential.johndo)
        .end((error, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('User already exist');
          if (error) done(error);
          done();
        });
    });

    it('returns 200 if user login is successful', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(userCredential.walex)

        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.include('Welcome');
          if (error) done(error);
          done();
        });
    });

    it('returns 401 if email or password is incorrect when a user tries to login', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(userCredential.loginWalex)

        .end((error, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('Email or password is incorrect');
          if (error) done(error);
          done();
        });
    });

    it('returns a 404 status message for non-existing user', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send(userCredential.wronginfo)

        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('User does not exist');
          if (error) done(error);
          done();
        });
    });
  });
});
