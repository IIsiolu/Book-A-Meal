import request from 'supertest';
import chai from 'chai';
import server from '../../Server';
// import { User } from '../../models';
import testData from '../faker/userfaker';

const { expect } = chai;
const testUser = {};
const validToken = {};

describe('Book-a-Meal User Test', () => {
  it('loads the api home page', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err)
          {done(err);}
        done();
      });
  });

  it('return error if email field is empty on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(testData.wronginfo)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('invalid email address');
        if (error) done(error);
        done();
      });
  });

  it('return error if password field is empty on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(testData.wronginfo1)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

  it('return error if password field is less thab six character on signup', (done) => {
    request(server).post('/api/v1/auth/signup')
      .send(testData.wronginfos)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

  it('return error if email field is empty on signin', (done) => {
    request(server).post('/api/v1/auth/login')
      .send(testData.loginerror1)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('invalid email address');
        if (error) done(error);
        done();
      });
  });

  it('return error if password field is empty on signin', (done) => {
    request(server).post('/api/v1/auth/login')
      .send(testData.loginerror2)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank');
        if (error) done(error);
        done();
      });
  });

  it('creates a new user', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(testData.singupUser1)
      .expect(201)
      .end((err, res) => {
        testUser.user = res.body.message;
        expect(testUser.user).to.have.property('firstname');
        expect(testUser.user).to.have.property('lastname');
        expect(testUser.user).to.have.property('email');
        expect(res.body.message.email).to.equal(testData.singupUser1.email);
        expect(res.body.message.firstname).to.equal(testData.singupUser1.firstname);
        if (err) return done(err);
        done();
      });
  });

  it('trown error if email already exisit in database', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(testData.singupUser1)
      .expect(409)
      .end((err, res) => {
        expect(res.body.message).to.equal('User already exist');
        if (err) return done(err);
        done();
      });
  });

  it('creates user with name and email', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(testData.singupUser)
      .expect(201)
      .end((err, res) => {
        testUser.user2 = res.body.message;
        expect(testUser.user2).to.have.property('firstname');
        expect(testUser.user2).to.have.property('email');
        expect(res.body.message.email).to.equal(testData.singupUser.email);
        expect(res.body.message.firstname).to.equal(testData.singupUser.firstname);
        if (err) return done(err);
        done();
      });
  });

  it('user cant login if the password is not correct', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(testData.loginUser1)
      .expect(409)
      .end((err, res) => {
        expect(res.body.message).to.equal('Email or password is incorrect');
        if (err) return done(err);
        done();
      });
  });

  it('user cant login if the email is not correct.', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(testData.loginUser3)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('Email or password incorrect');
        if (err) return done(err);
        done();
      });
  });

  it('user login Successfully with correct details', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(testData.loginUser2)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal(`Welcome ${testData.singupUser1.firstname}`);
        if (err) return done(err);
        done();
      });
  });

  it('return a token when user successful signin', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .send(testData.loginUser2)
      .expect(200)
      .end((err, res) => {
        validToken.token = res.body.token;
        expect(validToken.token);
        expect(res.body.message).to.equal(`Welcome ${testData.singupUser1.firstname}`);
        if (err) return done(err);
        done();
      });
  });


});
