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

  it("should POST a NEW users", function(done) {
    server
      .post('/REST/users/')
      .send({
        name: "Wylie Wade",
        username: "Rosanne2",
        email: "rosanne2@gmail.com",
        password: "EUZ78MMR7GR",
        admin: false,
        location: "22.48643, 114.92551",
        _contacts: [
            {
              name : 'Denise Bradley',
              contact_id : "57d869a17160689f6be9cdbe",
              type : 'contact'
            }
          ]
      })
      .expect("Content-type", /json/)
      .expect(201)
      .end(function(err, res) {
        res.status.should.equal(201);
        res.body.name.should.equal('Wylie Wade');
        uid = res.body._id;
        done();
      });
  });

  it("should POST a NEW contact for a user", function(done) {
    server
      .post('/REST/users/' + uid + '/contacts/')
      .send({
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "email": [
          "dbradley0@etsy.com"
        ]
      })
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should POST a new AUTH USER contact", function(done) {
    server
      .post('/REST/user/contacts/')
      .send({
        "name": "Denise Pit",
        "nickname": "dbradley1",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "email": [
          "dbradleypit0@etsy.com"
        ]
      })
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