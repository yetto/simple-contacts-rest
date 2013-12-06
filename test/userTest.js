const
  supertest = require("supertest"),
  should = require("should"),
  dom = 'http://localhost:8080',
  server = supertest.agent(dom),
  password = require('../controllers/passwords.js');

/*

  Normal user test

  1.- should POST a NEW users
  2.- should POST credentials and login in successfully
  3.- should GET a token verified
  4.- should PUT updated user info
  5.- should POST a NEW contact for a user
  6.- should GET AUTH USER data
  7.- should GET all AUTH USER contacts
  8.- should GET an AUTH USER contact information
  9.- should DELETE user contact
  10.- should DELETE himself

*/

let
  userID = null,
  contactID = null,
  token = null;

// ON//OFF
if (true) {

  /*
   *  1.- should POST a NEW users
   */
  it("should POST a NEW users", function(done) {
    server
      .post('/REST/users/')
      .set({
        "x-access-token": token
      })
      .send({
        name: "Wylie Wade",
        username: "Rosanne2",
        email: "rosanne2@gmail.com",
        password: "EUZ78MMR7GR",
        admin: false,
        location: "22.48643, 114.92551",
        _contacts: [{
          name: 'Denise Bradley',
          contact_id: "57d869a17160689f6be9cdbe",
        }]
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(201);
        res.body.name.should.equal('Wylie Wade');
        password.compare(res.body.password, 'EUZ78MMR7GR', function(err, isPasswordMatch) {
          isPasswordMatch.should.equal(true);
        });
        userID = res.body._id;
        done();
      });
  });

  /*
   *  2.- should POST credentials and login in successfully
   */
  it("should POST login in credentials successfully", function(done) {
    server
      .post('/app/authenticate')
      .set({
        "x-access-token": token
      })
      .send({
        email: "rosanne2@gmail.com",
        password: "EUZ78MMR7GR",
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.message.should.equal('Token is valid for 24hrs');
        res.body.token.should.be.a.String();
        token = res.body.token;
        done();
      });
  });

  /*
   *  3.- should GET a token verified
   */
  it("should GET a token verified", function(done) {
    server
      .get('/app/verify')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  4.- should PUT updated user info
   */
  it("should PUT updated user info, userID: " + userID, function(done) {
    server
      .put('/REST/user/')
      .set({
        "x-access-token": token
      })
      .send({
        name: "Wylie Wade Wonka",
        username: "Rosanne2Wonka",
        email: "rosanne2@gmail.com",
        location: "22.0000, 114.0000"
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        console.log(userID);
        res.status.should.equal(200);
        res.body.name.should.equal('Wylie Wade Wonka');
        res.body.username.should.equal('Rosanne2Wonka');
        res.body.location.should.equal("22.0000, 114.0000");
        res.body._id.should.equal(userID);
        done();
      });
  });

  /*
   *  5.- should POST a NEW contact for a user
   */
  it("should POST a NEW contact for a user", function(done) {
    server
      .post('/REST/user/contacts/')
      .set({
        "x-access-token": token
      })
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
        res.status.should.equal(201);
        res.body.name.should.equal('Denise Bradley');
        contactID = res.body._id;
        done();
      });
  });


  /*
   *  6.- should GET AUTH USER data
   */
  it("should GET all AUTH USER data", function(done) {
    server
      .get('/REST/user/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  7.- should GET all AUTH USER contacts
   */
  it("should GET all AUTH USER contacts", function(done) {
    server
      .get('/REST/user/contacts/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  8.- should GET an AUTH USER contact information
   */
  it("should GET an AUTH USER contact information", function(done) {
    server
      .get('/REST/user/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  9.- should DELETE user contact
   */
  it("should DELETE user contact", function(done) {
    server
      .delete('/REST/user/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(204);
        done();
      });
  });

  /*
   *  10.- should DELETE himself
   */
  it("should DELETE user", function(done) {
    server
      .delete('/REST/user/')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(204);
        done();
      });
  });

} // END ON//OFF