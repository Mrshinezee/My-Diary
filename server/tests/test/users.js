import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING CREATE A USER ENDPOINT', () => {
  describe('post /auth/signup', () => {
    it('Should return a success message for a successful registration ', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        email: 'shinezee@gmail.com',
        password: 'shine1234',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          expect(response.body.data).to.be.an('object');
          expect(response).to.have.status(201);
          response.body.should.have.property('message');
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
    it('Should return account already existing with this email address ', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        email: 'shinezee@gmail.com',
        password: 'shine1234',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          expect(response).to.be.an('object');
          expect(response).to.have.status(409);
          response.body.should.have.property('message');
          response.body.should.have.property('success').eql(false);
          done();
        });
    });
    it('should return a message if any field is omitted', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        password: 'shine1234',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          done();
        });
    });
    it('should return an error message if email is not vlaid', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        password: 'shine1234',
        email: 'shinezee',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          response.body.errors.email.should.eql('please provide a valid email address');
          done();
        });
    });
    it('should return an error message if lastName is less than 2 charaters', (done) => {
      const user1 = {
        firstName: 'shinezee54@gmail.com',
        lastName: 'z',
        password: 'shine1234',
        email: 'shinezee',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          response.body.errors.lastName.should.eql('Your lastName should be greater than 2 charaters');
          done();
        });
    });
    it('should return an error message if lastName is empty', (done) => {
      const user1 = {
        firstName: 'shinezee54@gmail.com',
        lastName: '  ',
        password: 'shine1234',
        email: 'shinezee',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          response.body.errors.lastName.should.eql('Your lastName cannot be empty');
          done();
        });
    });
    it('should return an error message if password is less than 6 charaters', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        password: 'shi',
        email: 'shinezee54@gmail.com',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          response.body.errors.password.should.eql('Your Password length should be greater 6 charaters');
          done();
        });
    });
    it('should return an error message if password is empty', (done) => {
      const user1 = {
        firstName: 'shine',
        lastName: 'zee',
        password: '   ',
        email: 'shinezee54@gmail.com',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user1)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          expect(response.body.errors).to.be.an('object');
          response.body.errors.password.should.eql('Your password cannot be empty');
          done();
        });
    });
  });
});
describe('TESTING ENDPOINT FOR USER LOGIN', () => {
  describe('post /auth/login', () => {
    it('Should return a success message for a successful login ', (done) => {
      const user1 = {
        email: 'shinezee@gmail.com',
        password: 'shine1234',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user1)
        .end((error, response) => {
          expect(response.body.user).to.be.an('array');
          expect(response).to.have.status(200);
          response.body.should.have.property('message');
          response.body.should.have.property('token');
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
    it('Should return a error message for a unsuccessful login ', (done) => {
      const user1 = {
        email: 'shizee@gmail.com',
        password: 'shine1234',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user1)
        .end((error, response) => {
          expect(response).to.be.an('object');
          expect(response).to.have.status(400);
          response.body.should.have.property('message');
          response.body.should.have.property('success').eql(false);
          done();
        });
    });
  });
});
