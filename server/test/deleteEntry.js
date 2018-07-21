import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING DELETE AN ENTRY ENDPOINT', () => {
  describe('delete api/v1/entries/<id>', () => {
    it('should delete a SINGLE entry on /entries/<id> DELETE', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/5')
        .end((error, response) => {
          response.should.have.status(201);
          response.body.result.should.be.a('array');
          response.body.should.have.property('success').eql('successfully deleted');
          done();
        });
    });
  });
});
