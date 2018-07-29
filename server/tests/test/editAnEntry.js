import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING EDIT AN ENTRY ENDPOINT', () => {
  describe('put /entries/<id>', () => {
    it('should edit a SINGLE entry on /entries/<id> PUT', (done) => {
      const entry = {
        userId: 1,
        entrytitle: 'The evil ones',
        entrycontent: 'The eldest son, born with a heart as black as charcoal',
      };
      chai.request(app)
        .put('/api/v1/entries/1')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.entry.should.be.a('array');
          response.body.should.have.property('message').eql('successfully edited');
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
    it('should return an error message when entry Id doesnt exist', (done) => {
      chai.request(app)
        .put('/api/v1/entries/50')
        .end((error, response) => {
          response.should.have.status(404);
          expect(response).to.be.an('object');
          response.body.should.have.property('success').eql(false);
          response.body.should.have.property('message').eql('Entry not found');
          done();
        });
    });
  });
});
