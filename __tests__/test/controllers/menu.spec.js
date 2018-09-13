import request from 'supertest';
import { expect } from 'chai';
import menuCredential from '../../faker/menuFaker';
import server from '../../../server/server';
import { User } from '../../../server/models';
import {
  mondayMenus, invalidIdToken, hashPassword, generateToken,
  insertMenuSeed,
} from '../../seed/testSeeds';

let userToken = '';
let catererToken = '';

describe('Meal endpoint', () => {
  before(async () => {
    const generatedUser = await User.create({
      firstname: 'fola',
      lastname: 'jimi',
      email: 'folajimi@gmail.com',
      role: 'user',
      password: hashPassword('password123'),
    });
    userToken = generateToken(generatedUser.id, 'user');

    const generateCaterer = await User.create({
      id: 72,
      firstname: 'mrbiggy',
      lastname: 'bigs',
      email: 'mrbigs@gmail.com',
      role: 'caterer',
      password: hashPassword('password123'),
    });
    catererToken = generateToken(generateCaterer.id, 'caterer');
    await mondayMenus();
    await insertMenuSeed();
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

    it('returns a 201 status when a menu is successfully created', (done) => {
      request(server)
        .post('/api/v1/menu')
        .set('Authorization', catererToken)
        .send(menuCredential.mondayMenu)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          if (error) done(error);
          done();
        });
    });

    it('returns a 409, when a menu exist for that day', (done) => {
      request(server)
        .post('/api/v1/menu')
        .set('Authorization', catererToken)
        .send(menuCredential.mondayMenu)
        .end((error, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('meal already exist for that day');
          if (error) done(error);
          done();
        });
    });

    it('returns a 500, if there is an invalid token ID', (done) => {
      request(server)
        .post('/api/v1/menu')
        .set('Authorization', invalidIdToken)
        .send(menuCredential.mondayMenu)
        .end((error, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('something went wrong');
          if (error) done(error);
          done();
        });
    });

    it('returns a 404, if a menu has not been created for a day', (done) => {
      request(server)
        .get('/api/v1/menu?date=2018-02-17')
        .set('Authorization', userToken)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.include('no menu for that day');
          if (error) done(error);
          done();
        });
    });

    it('returns all menu for a day', (done) => {
      request(server)
        .get('/api/v1/menu?date=2018-10-17')
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

