import request from 'supertest';
import chai from 'chai';
import server from '../../server';
// import { User } from '../../models';
import userCredentials from '../faker/userfaker';

const { expect } = chai;
const testUser = {};
const testAdmin = {};
const validToken = {};
const adminToken = {};

describe('Book-a-Meal User Test', () => {
  it('should loads the api home page', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err) { done(err); }
        done();
      });
  });

  it('should return error if email field is empty on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(userCredentials.wronginfo)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('invalid email address');
        if (error) done(error);
        done();
      });
  });

  it('should return error if password field is empty on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(userCredentials.wronginfo1)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

  it('should return error if password field is less thab six character on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(userCredentials.wronginfos)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

  it('should return error if email field is empty on signin', (done) => {
    request(server).post('/api/v1/auth/login')
      .send(userCredentials.loginerror1)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('invalid email address');
        if (error) done(error);
        done();
      });
  });

  it('should return error if password field is empty on signin', (done) => {
    request(server).post('/api/v1/auth/login')
      .send(userCredentials.loginerror2)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank');
        if (error) done(error);
        done();
      });
  });

  it('should create a new user', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(userCredentials.singupUser1)
      .expect(201)
      .end((err, res) => {
        testUser.user = res.body;
        expect(testUser.user).to.have.property('token');
        expect(res.body.message).to.include('user created successfully');
        if (err) return done(err);
        done();
      });
  });

  it('should throw an error if email already exisit in database', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(userCredentials.singupUser1)
      .expect(409)
      .end((err, res) => {
        expect(res.body.message).to.equal('User already exist');
        if (err) return done(err);
        done();
      });
  });

  it('should creates user with credentials', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(userCredentials.singupUser)
      .expect(201)
      .end((err, res) => {
        testUser.user2 = res.body;
        expect(testUser.user2).to.have.property('token');
        if (err) return done(err);
        done();
      });
  });

  it('should not login a user with incorrect password', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials.loginUser1)
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).to.equal('Email or password is incorrect');
        if (err) return done(err);
        done();
      });
  });

  it(' should not login a user with email that does not exist', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials.loginUser3)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('User does not exist');
        if (err) return done(err);
        done();
      });
  });

  it('user login Successfully with correct details', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials.loginUser2)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal(`Welcome ${userCredentials.singupUser1.firstname}`);
        if (err) return done(err);
        done();
      });
  });

  it('should return a token when user successful signin', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials.loginUser2)
      .expect(200)
      .end((err, res) => {
        validToken.token = res.body.token;
        expect(validToken.token);
        expect(res.body.message).to.equal(`Welcome ${userCredentials.singupUser1.firstname}`);
        if (err) return done(err);
        done();
      });
  });

  it('should create a new caterer', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(userCredentials.adminsignup)
      .expect(201)
      .end((err, res) => {
        testAdmin.user = res.body;
        expect(testAdmin.user).to.have.property('token');
        expect(res.body.success).to.equal(true);
        if (err) return done(err);
        done();
      });
  });
  it('should return a token when admin successful signin', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials.adminLogin)
      .expect(200)
      .end((err, res) => {
        adminToken.token = res.body.token;
        expect(adminToken.token);
        expect(res.body.message).to.equal(`Welcome ${userCredentials.adminsignup.firstname}`);
        if (err) return done(err);
        done();
      });
  });
});

export { validToken, adminToken };
