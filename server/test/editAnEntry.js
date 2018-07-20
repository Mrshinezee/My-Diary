import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING EDIT AN ENTRY ENDPOINT', () => {
  describe('get /entries/<id>', () => {
    it('should edit a SINGLE entry on /entries/<id> PUT', (done) => {
      const entry = {
        id: 4,
        Title: 'The evil ones',
        entry: 'The eldest son, born with a heart as black as charcoal',
      };
      chai.request(app)
        .put('/api/v1/entries/2')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.result.should.be.a('array');
          response.body.should.have.property('success').eql('successfully edited');
          done();
        });
    });
  });
});
