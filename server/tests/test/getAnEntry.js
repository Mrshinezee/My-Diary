import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING GET AN ENTRY ENDPOINT', () => {
  let toker = '';
  describe('get /entries/<id>', () => {
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
    it('should list a SINGLE entry on /entries/<id> GET ', (done) => {
      chai.request(app)
        .get('/api/v1/entry/1')
        .set('authorization', `Bearer ${toker}`)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('success');
          response.body.should.have.property('entry');
          response.body.success.should.eql(true);
          response.body.entry.should.be.a('array');
          done();
        });
    });
    it('should return an error message', (done) => {
      chai.request(app)
        .get('/api/v1/entry/100')
        .set('authorization', `Bearer ${toker}`)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          response.body.should.have.property('message').eql('Entry not found');
          done();
        });
    });
  });
});
