import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING CREATE AN ENTRY ENDPOINT', () => {
  let toker = '';
  describe('post /entries', () => {
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
          const { token } = response.body;
          toker = token;
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
    it('should create a SINGLE entry on /entries/ POST ', (done) => {
      const entry = {
        userId: 1,
        entrytitle: 'change',
        entrycontent: 'To which direction',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('authorization', `Bearer ${toker}`)
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          expect(response.body.entry).to.be.an('array');
          response.body.should.have.property('message').eql('Entry Successfully created');
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
    it('should return a message if entry is omitted', (done) => {
      const Incompleteentrycontent = {
        userId: 3,
        entrytitle: 'To which direction',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('authorization', `Bearer ${toker}`)
        .send(Incompleteentrycontent)
        .end((error, response) => {
          response.should.have.status(404);
          expect(response.body.errors).to.be.an('object');
          done();
        });
    });
  });
});
