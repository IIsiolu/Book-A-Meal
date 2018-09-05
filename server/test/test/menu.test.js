import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import testData from '../faker/menuFaker';
import { validToken, adminToken } from '../../test/test/user.test';

const { expect } = chai;

describe('Book-a-meal MENU Test', () => {
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
  it('should return error if token is not present when adding Menu', (done) => {
    request(server)
      .post('/api/v1/menu')
      .send(testData.newMenu)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });

  it('should return error if token is not vaild when adding new MENU', (done) => {
    request(server)
      .post('/api/v1/menu')
      .send(testData.newMenu)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user is not a caterer when adding new MENU', (done) => {
    request(server)
      .post('/api/v1/menu')
      .send(testData.newMenu2)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be a caterer');
        if (error) done(error);
        done();
      });
  });

  it('should return 403 if login is admin and menuId is empty', (done) => {
    request(server)
      .post('/api/v1/menu')
      .send(testData.newMenu3)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('input menu Id');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user is a caterer and date is empty', (done) => {
    request(server)
      .post('/api/v1/menu')
      .send(testData.newMenu4)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input menu date');
        if (error) done(error);
        done();
      });
  });

  it(
    'should save MENU to database if login is ' +
      'caterer and and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .send(testData.newMenu5)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.success);
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return 201 if login is ' +
    'caterer and and body is filled correctly',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .send(testData.newMenu6)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.success);
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return 409 if login is ' +
    'caterer and and body is filled correctly',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .send(testData.newMenu6)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(409);
          expect(res.body.success).to.be.false;
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return 400 if login is ' +
    'admin and menu is not an array',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .send(testData.newMenu7)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(400);
          expect(res.body.message)
            .to.include('Input must be an array');
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return 400 if login is ' +
    'admin and menu contains incorrect data input',
    (done) => {
      request(server)
        .post('/api/v1/menu')
        .send(testData.newMenu8)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(400);
          expect(res.body.message)
            .to.include('Array input must be integer');
          if (error) done(error);
          done();
        });
    },
  );

  it('should fail to return all the MENU in database, if user is not valid', (done) => {
    request(server)
      .get('/api/v1/menu')
      .set('Authorization', 'fjhFJfvuiuivwov')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('Authentication failed');
        if (error) done(error);
        done();
      });
  });

  it('should return all the MENU in database, if user is a caterer', (done) => {
    request(server)
      .get('/api/v1/menu?date=2018-01-01')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(200);
        expect(res.body.success);
        if (error) done(error);
        done();
      });
  });

  it('should return 403 if no token', (done) => {
    request(server)
      .get('/api/v1/menu/')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });

  it('should return error if MENU date is incorrect', (done) => {
    request(server)
      .get('/api/v1/menu?date=2001-100-100')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.message).to.include('invalid date input');
        if (error) done(error);
        done();
      });
  });

  it('should return error if MENU date is not in db', (done) => {
    request(server)
      .get('/api/v1/menu?date=1993-10-11')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(404);
        expect(res.body.message).to.include('no menu for that day');
        if (error) done(error);
        done();
      });
  });
});
