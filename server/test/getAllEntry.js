import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING GET ALL ENTRY ENDPOINT', () => {
  describe('get /entries', () => {
    it('should list ALL entry on /entries GET ', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .end((error, response) => {
          response.should.have.status(201);
          response.body.result.should.be.a('array');
          response.body.should.have.property('success').eql('success');
          done();
        });
    });
    // it('should return an error message', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/entries')
    //     .end((error, response) => {
    //       response.should.have.status(404);
    //       response.body.should.have.property('message');
    //       response.body.message.should.eql('No Entry Available');
    //       done();
    //     });
    // });
  });
});
