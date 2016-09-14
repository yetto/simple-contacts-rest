const
  supertest = require("supertest"),
  should = require("should"),
  dom = 'http://localhost:8080',
  server = supertest.agent(dom)
;

let
  uid = '57d866317160689f6be9cd5a',
  cid = '57d869a17160689f6be9cdbe'
;

describe("Contacts app rest enpoints unit test", function() {

  it("should GET all users", function(done) {
    server
      .get('/REST/users/')
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.should.be.an.Array();
        done();
      });
  });

  it("should GET user info", function(done) {
    server
      .get('/REST/users/' + uid + '/')
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body._id.should.equal(uid);
        done();
      });
  });

  it("should GET all contacts for a user", function(done) {
    server
      .get('/REST/users/' + uid + '/contacts/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should GET information from a user contact", function(done) {
    server
      .get('/REST/users/'+uid+'/contacts/'+cid+'/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should GET all AUTH USER data", function(done) {
    server
      .get('/REST/user/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should GET all AUTH USER contacts", function(done) {
    server
      .get('/REST/user/contacts/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should GET an AUTH USER contact information", function(done) {
    server
      .get('/REST/user/contacts/'+uid+'/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

});



/* POST EXAMPLE

/*
    TEST Contact
    http://nnm.box/REST/contacts/57d869a17160689f6be9cdbe

{
  "_id": "57d869a17160689f6be9cdbe",
  "name": "Denise Bradley",
  "nickname": "dbradley0",
  "company": "Trudeo",
  "job_title": "Recruiter",
  "address": "2 Onsgard Street",
  "birthday": "2/1/1985",
  "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
  "email": [
    "dbradley0@etsy.com"
  ],
  _users: [
    username : "Rosanne",
    user_id : "57d866317160689f6be9cd5a",
    type : "user"
  ]
}


    TEST User
    http://nnm.box/REST/users/57d866317160689f6be9cd5a

{
  _id: "57d866317160689f6be9cd5a",
  name: "Wylie Wade",
  username: "Rosanne",
  password: "EUZ78MMR7GR",
  admin: false,
  location: "22.48643, 114.92551",
  _contacts: [
      {
        name : 'Denise Bradley',
        contact_id : "57d869a17160689f6be9cdbe".
        type : 'contact'
      }
    ]
}

*/