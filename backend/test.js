import { assert, expect } from "chai";

import * as chai from "chai";
import app from "./index.js";
//import chaiHttp from "chai-http";

//chai.use(chaiHttp);

// if you need to access `request`
import { request } from "chai-http";

describe("Patient list API", () => {
  it("should return Patient list", (done) => {
    request
      .execute(app)
      .get("/api/patients")
      .end((err, res) => {
        expect(err).to.be.null;
        assert.isTrue(Array.isArray(res), 'data should be an array');
        done();
      });
  });

  describe('API Tests', () => {
    // Test POST request
    it('POST request to get create a new patient', (done) => {
      const payload = {
        "name": "Mickie",
        "age": 32,
        "gender": "Female",
        "address": "937 progress ave",
        "zipCode": "M1G 3T8",
        "profilePicture": "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"
    }
      chai.request(server)
        .post('/api/patients')
        .send(payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  
    // Test PUT request
    it('should send a PUT request and update the patient value', (done) => {
      const payload = {
        "name": "Minnie",
        "age": 32,
        "gender": "Female",
        "address": "937 progress ave",
        "zipCode": "M1G 3T8",
        "profilePicture": "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"
    }
      chai.request(server)
        .put('/api/patients')
        .send(payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});





