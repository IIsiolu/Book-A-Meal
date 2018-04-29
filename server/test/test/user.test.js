import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import { User } from '../../models';
import testData from '../faker/userfaker';

const { expect } = chai;
const testUser = {};

describe('Book-a-Meal User Test', () => {
  it('loads the api home page', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err)
          done(err);
        done();
      });
  });

  it('return error if email field is empty on signup', (done) => {
    request(server).post('/api/v1/users/signup')
      .send(testData.wronginfo)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('invalid email address');
        if (error) done(error);
        done();
      });
  });

  it('return error if password field is empty on signup', (done) => {
    request(server).post('/api/v1/users/signup')
      .send(testData.wronginfo1)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

  it('return error if password field is less thab six character on signup', (done) => {
    request(server).post('/api/v1/users/signup')
      .send(testData.wronginfos)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('Password Cannot be Blank cant be less than six Charaters!');
        if (error) done(error);
        done();
      });
  });

});
