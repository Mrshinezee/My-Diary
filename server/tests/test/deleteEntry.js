import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('TESTING DELETE AN ENTRY ENDPOINT', () => {
  let toker = '';
  describe('delete api/v1/entries/<id>', () => {
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
    it('should delete a SINGLE entry on /entries/<id> DELETE', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/1')
        .set('authorization', `Bearer ${toker}`)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.result.should.be.a('array');
          response.body.should.have.property('success').eql(true);
          response.body.should.have.property('message').eql('successfully deleted');
          done();
        });
    });
    it('should return an error message when entry Id doesnt exist', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/50')
        .set('authorization', `Bearer ${toker}`)
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
