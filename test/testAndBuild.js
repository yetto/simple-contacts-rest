/*-------------------------------------------------------------------
### End-points for app management ###################################
---------------------------------------------------------------------
get     users/                      Get all users
-post                                Create new user
---------------------------------------------------------------------
get     users/:id                   Get user info
-put                                 Update user info
-delete                              Terminate user
---------------------------------------------------------------------
get     users/:id/contacts          Get contact info
post                                Create new contact for user
---------------------------------------------------------------------
get     users/:userID/contacts/:contactID    Get info from user contact
put                                 Update contact info from user
delete                              Delete contact from user
---------------------------------------------------------------------
### End-points for authenticated users ##############################
---------------------------------------------------------------------
get     user/                       User info
put                                 Update user info
---------------------------------------------------------------------
get     user/contacts/              List of all user contacts
post                                Creates new contact
---------------------------------------------------------------------
get     user/contacts/:id/          Get contact details
put                                 Update contact
delete                              Delete contact
---------------------------------------------------------------------
get     user/frequent/              Get frequent contacts
get     user/group/                 Get contacts by group
post    user/import/                Accepts csv
get     user/export/                Offers csv download
---------------------------------------------------------------------
### API Params ######################################################
---------------------------------------------------------------------
?page=
?per-page=
?order-by=name|added
--------------------------------------------------------------------*/

const
  supertest     = require("supertest"),
  should        = require("should"),
  dom           = 'http://localhost:8080',
  server        = supertest.agent(dom),
  password       = require('../controllers/passwords.js')
;

let
  userID = '',
  contactID = '57d869a17160689f6be9cdbe'
;

// console.log('userID','57d866317160689f6be9cd5a','contactID','57d869a17160689f6be9cdbe');
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
            }
          ]
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(201);
        res.body.name.should.equal('Wylie Wade');
        password.compare(res.body.password,'EUZ78MMR7GR',function(err,isPasswordMatch){
          isPasswordMatch.should.equal(true);
        });
        userID = res.body._id;
        done();
      });
  });




  it("should PUT updated user info", function(done) {
    server
      .put('/REST/users/' + userID)
      .send({
        name: "new name",
        username: "new username",
        email: "rosanne2@gmail.com",
        password: "new password",
        admin: true,
        location: "22.0000, 114.0000"
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(200);
        res.body.name.should.equal('new name');
        password.compare(res.body.password,'new password',function(err,isPasswordMatch){
          isPasswordMatch.should.equal(true);
        });
        done();
      });
  });




  it("should POST a NEW contact for a user", function(done) {
    server
      .post('/REST/users/' + userID + '/contacts/')
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




  it("should DELETE that user contact", function(done) {
    server
      .delete('/REST/users/'+userID+'/contacts/'+contactID+'/')
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(204);
        done();
      });
  });




  it("should DELETE user", function(done) {
    server
      .delete('/REST/users/' + userID + '/')
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        res.status.should.equal(204);
        done();
      });
  });


});

/* INACTIVE TEST

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



*/



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
      }
    ]
}

*/