import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING GET AN ENTRY ENDPOINT', () => {
  describe('get /entries/<id>', () => {
    it('should list a SINGLE entry on /entries/<id> GET ', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('success');
          response.body.should.have.property('entry');
          response.body.success.should.eql(true);
          response.body.entry.should.be.a('array');
          done();
        });
    });
    it('should return an error message', (done) => {
      chai.request(app)
        .get('/api/v1/entries/100')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('success').eql(false);
          response.body.should.have.property('message').eql('Entry not found');
          done();
        });
    });
  });
});
