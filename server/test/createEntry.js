import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING CREATE AN ENTRY ENDPOINT', () => {
  describe('post /entries', () => {
    it('should create a SINGLE entry on /entries/ POST ', (done) => {
      const entry = {
        id: 4,
        Title: 'The evil ones',
        entry: 'The eldest son, born with a heart as black as charcoal',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.result.should.be.a('array');
          response.body.should.have.property('success').eql('entry created successfully');
          done();
        });
    });
    it('should return a message if entry is omitted', (done) => {
      const Incompleteentry = {
        id: 4,
        Title: 'The evil ones',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .send(Incompleteentry)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.errors.entry.should.eql('please provide entry');
          done();
        });
    });
  });
});
