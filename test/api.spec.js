const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://bpdts-test-app-v2.herokuapp.com/";

chai.use(chaiHttp);
chai.should();

describe("API Tests", () => {
    it("should Get all the users", (done) => {
        chai.request(baseUrl)
            .get("/users")
            .end((err, response)=> {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(1000);
                done();
            });
    });

    it("should Get users by id", (done) => {
        const userId = 1;
        chai.request(baseUrl)
            .get("/user/" + userId)
            .end((err, response)=> {
                let bodyObj = response.body;
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('first_name');
                response.body.should.have.property('last_name');
                response.body.should.have.property('email');
                response.body.should.have.property('ip_address');
                response.body.should.have.property('latitude');
                response.body.should.have.property('longitude');
                response.body.should.have.property('city');
                expect(bodyObj.first_name).to.equal("Maurise");
                expect(bodyObj.city).to.equal("Kax");
                done();
            });
    });

    it("should Get user by id", (done) => {
        const city = "Kax";
        chai.request(baseUrl)
            .get("/city/" + city + "/users")
            .end((err, response)=> {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(2);
                done();
            });
    });
});
