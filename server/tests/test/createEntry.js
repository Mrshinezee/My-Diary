import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING CREATE AN ENTRY ENDPOINT', () => {
  describe('post /entries', () => {
    it('should create a SINGLE entry on /entries/ POST ', (done) => {
      const entry = {
        userId: 1,
        entrytitle: 'change',
        entrycontent: 'To which direction',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          expect(response.body.entry).to.be.an('object');
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
        .send(Incompleteentrycontent)
        .end((error, response) => {
          response.should.have.status(404);
          expect(response.body.errors).to.be.an('object');
          done();
        });
    });
  });
});
