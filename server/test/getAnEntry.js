import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING GET AN ENTRY ENDPOINT', () => {
  describe('get /entries/<id>', () => {
    it('should list a SINGLE entry on /entries/<id> GET ', (done) => {
      chai.request(app)
        .get('/api/v1/entries/1')
        .end((error, response) => {
          response.should.have.status(201);
          expect(response.body.result.Title).to.equal('The two solider sons');
          response.body.should.have.property('success');
          response.body.should.have.property('result');
          response.body.success.should.eql('success');
          response.body.result.should.be.a('object');
          response.body.should.have.property('success').eql('success');
          response.body.result.should.have.property('Title');
          response.body.result.should.have.property('entry');
          response.body.result.should.have.property('id');
          response.body.result.Title.should.equal('The two solider sons');
          response.body.result.entry.should.equal('The eldest son in a family of three boys, Aricles had no desire to be a soldier');
          done();
        });
    });
    // it('should return an error message', (done) => {
    //   chai.request(app)
    //     .get('/entries/6')
    //     .end((error, response) => {
    //       console.log(response.body);
    //       response.should.have.status(404);
    //       response.body.should.have.property('message');
    //       response.body.message.should.eql('Entry was not found');
    //       done();
    //     });
    // });
  });
});
