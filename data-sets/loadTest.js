const
  fs = require('fs'),
  supertest = require("supertest"),
  should = require("should"),
  dom = 'http://localhost:8080',
  server = supertest.agent(dom),
  password = require('../controllers/passwords.js'),
  users = require("./users.json"),
  contacts = require("./contacts.json");

/*
  CONF
  http://nnm.box/REST/users/57d866317160689f6be9cd5a
*/
let
  userID = null,
  contactID = null,
  token = null,
  responseCollection = [],
  testU = {}
  testC = {};

/*
* Load test
* 100,000 records benchmark
*/
for (let user of users) {
  // create user
  user.name += Date.now();
  user.email = user.name+Date.now()+"@dateDotNow.com";
  newUser(user,contacts);
}

/*
        __        __     ___  ___  __  ___
  |    /  \  /\  |  \     |  |__  /__`  |
  |___ \__/ /~~\ |__/     |  |___ .__/  |

  100,000 records

  1.- should POST a NEW user
  1a.- should POST credentials and login in successfully
  2.- should POST 1000 new contacts

  # Repeat 100 times

*/

function newUser(user,contacts) {

  /*
   *  1.- should POST a NEW user
   */
  it("1.- (newUser) NEW user: "+user.name, function(done) {
    server
      .post('/REST/users/')
      .send(user)
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        console.log('   - ',res.status);
        userID = res.body._id;
        done();
      });
  });

  /*
   *  1a.- should POST credentials and login in successfully
   */
  it("1a.- (newUser) POST login in credentials successfully", function(done) {
    server
      .post('/app/authenticate')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        console.log('   - ',res.status);
        token = res.body.token;
        done();
      });
  });

  for (let contact of contacts) {

    /*
     *  2.- should POST 1000 new contacts
     */
    it("2.- (insertContact) POST NEW contact "+contact.name+" for: "+token, function(done) {
      server
        .post('/REST/user/contacts/')
        .set({"x-access-token": token})
        .send(contact)
        .expect(404)
        .end(function(err, res) {
          console.log('   - ',res.status);
          contactID = res.body._id || null;
          done();
        });
    });

  }


} // END newUser


function insertContact(contact,token){

} // END newUser